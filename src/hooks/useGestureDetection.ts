import { useEffect, useRef, useState } from 'react'
import * as handPoseDetection from '@tensorflow-models/hand-pose-detection'
import '@tensorflow/tfjs-core'
import '@tensorflow/tfjs-backend-webgl'

interface GestureState {
  isHandOpen: boolean
  handPosition: { x: number; y: number } | null
}

export function useGestureDetection() {
  const [gestureState, setGestureState] = useState<GestureState>({
    isHandOpen: false,
    handPosition: null
  })
  const [isInitialized, setIsInitialized] = useState(false)
  const detectorRef = useRef<handPoseDetection.HandDetector | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const animationFrameRef = useRef<number>()

  useEffect(() => {
    let mounted = true

    async function init() {
      try {
        // 初始化摄像头
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 640, height: 480 }
        })

        if (!mounted) return

        const video = document.createElement('video')
        video.srcObject = stream
        video.autoplay = true
        video.playsInline = true
        video.muted = true
        video.style.display = 'none'
        document.body.appendChild(video)
        await video.play()
        videoRef.current = video

        // 初始化手部检测模型
        const model = handPoseDetection.SupportedModels.MediaPipeHands
        const detectorConfig: handPoseDetection.MediaPipeHandsMediaPipeModelConfig = {
          runtime: 'mediapipe',
          solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/hands',
          modelType: 'full'
        }

        const detector = await handPoseDetection.createDetector(model, detectorConfig)
        detectorRef.current = detector

        setIsInitialized(true)

        // 开始检测循环
        function detect() {
          if (!mounted || !detector || !video) return

          detector
            .estimateHands(video)
            .then((hands) => {
              if (!mounted) return

              if (hands.length > 0) {
                const hand = hands[0]
                const keypoints = hand.keypoints

                // 检测手是否张开：检查手指是否伸直
                // 使用关键点：拇指、食指、中指、无名指、小指
                const thumbTip = keypoints[4]
                const thumbMcp = keypoints[2]
                const indexTip = keypoints[8]
                const indexPip = keypoints[6]
                const middleTip = keypoints[12]
                const middlePip = keypoints[10]
                const ringTip = keypoints[16]
                const ringPip = keypoints[14]
                const pinkyTip = keypoints[20]
                const pinkyPip = keypoints[18]

                // 计算手指是否伸直（通过比较指尖和指关节的距离）
                // 对于拇指，使用不同的逻辑
                const thumbExtended = Math.abs(thumbTip.x - thumbMcp.x) > Math.abs(thumbTip.y - thumbMcp.y)
                const indexExtended = indexTip.y < indexPip.y
                const middleExtended = middleTip.y < middlePip.y
                const ringExtended = ringTip.y < ringPip.y
                const pinkyExtended = pinkyTip.y < pinkyPip.y

                const extendedCount = [
                  thumbExtended,
                  indexExtended,
                  middleExtended,
                  ringExtended,
                  pinkyExtended
                ].filter(Boolean).length

                // 至少3个手指伸直才认为是张开
                const isHandOpen = extendedCount >= 3

                // 获取手腕位置（用于控制视角）
                const wrist = keypoints[0]
                const handX = (wrist.x / video.videoWidth) * 2 - 1 // 归一化到 -1 到 1
                const handY = 1 - (wrist.y / video.videoHeight) * 2 // 归一化到 -1 到 1

                setGestureState({
                  isHandOpen,
                  handPosition: { x: handX, y: handY }
                })
              } else {
                setGestureState({
                  isHandOpen: false,
                  handPosition: null
                })
              }
            })
            .catch((err) => {
              console.error('Hand detection error:', err)
            })

          animationFrameRef.current = requestAnimationFrame(detect)
        }

        // 等待视频就绪
        video.addEventListener('loadedmetadata', () => {
          detect()
        })
      } catch (error) {
        console.error('Failed to initialize gesture detection:', error)
      }
    }

    init()

    return () => {
      mounted = false
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (videoRef.current) {
        if (videoRef.current.srcObject) {
          const stream = videoRef.current.srcObject as MediaStream
          stream.getTracks().forEach((track) => track.stop())
        }
        if (videoRef.current.parentNode) {
          videoRef.current.parentNode.removeChild(videoRef.current)
        }
      }
      if (detectorRef.current) {
        detectorRef.current.dispose()
      }
    }
  }, [])

  return {
    ...gestureState,
    isInitialized
  }
}

