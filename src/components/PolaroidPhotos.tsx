import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import {
  generateTargetPosition,
  generateChaosPosition,
  smoothStep
} from '../utils/stateMachine'

interface PolaroidPhoto {
  chaosPosition: [number, number, number]
  targetPosition: [number, number, number]
  rotation: [number, number, number]
  imageUrl?: string
}

interface PolaroidPhotosProps {
  progress: number
  count?: number
}

export function PolaroidPhotos({ progress, count = 15 }: PolaroidPhotosProps) {
  const groupRef = useRef<THREE.Group>(null)

  // 生成拍立得照片数据
  const photos = useMemo(() => {
    const data: PolaroidPhoto[] = []
    
    for (let i = 0; i < count; i++) {
      data.push({
        chaosPosition: generateChaosPosition(15),
        targetPosition: generateTargetPosition(i, count, 7, 2.5),
        rotation: [
          (Math.random() - 0.5) * 0.5,
          (Math.random() - 0.5) * 0.5,
          (Math.random() - 0.5) * 0.3
        ],
        // 可以在这里添加实际图片 URL
        imageUrl: undefined
      })
    }

    return data
  }, [count])

  // 创建拍立得材质和几何体
  const { frameMaterial, photoMaterial } = useMemo(() => {
    const frameMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.1,
      roughness: 0.8
    })

    const photoMat = new THREE.MeshStandardMaterial({
      color: 0xcccccc,
      roughness: 0.9
    })

    return {
      frameMaterial: frameMat,
      photoMaterial: photoMat
    }
  }, [])

  // 创建拍立得几何体（带边框的矩形）
  const polaroidGeometry = useMemo(() => {
    const group = new THREE.Group()

    // 外框
    const frame = new THREE.BoxGeometry(0.4, 0.5, 0.02)
    const frameMesh = new THREE.Mesh(frame, frameMaterial)
    group.add(frameMesh)

    // 照片区域（内部）
    const photo = new THREE.BoxGeometry(0.35, 0.4, 0.015)
    const photoMesh = new THREE.Mesh(photo, photoMaterial)
    photoMesh.position.z = 0.01
    group.add(photoMesh)

    // 底部标签区域
    const label = new THREE.BoxGeometry(0.35, 0.05, 0.015)
    const labelMesh = new THREE.Mesh(label, photoMaterial)
    labelMesh.position.y = -0.225
    labelMesh.position.z = 0.01
    group.add(labelMesh)

    return group
  }, [frameMaterial, photoMaterial])

  // 动画循环
  useFrame(() => {
    const smoothProgress = smoothStep(progress)

    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        if (i < photos.length) {
          const photo = photos[i]
          const chaos = photo.chaosPosition
          const target = photo.targetPosition

          const x = chaos[0] + (target[0] - chaos[0]) * smoothProgress
          const y = chaos[1] + (target[1] - chaos[1]) * smoothProgress
          const z = chaos[2] + (target[2] - chaos[2]) * smoothProgress

          child.position.set(x, y, z)
          
          // 添加轻微的旋转动画
          const rotX = photo.rotation[0] + Math.sin(Date.now() * 0.001 + i) * 0.05
          const rotY = photo.rotation[1] + Math.cos(Date.now() * 0.001 + i) * 0.05
          const rotZ = photo.rotation[2]
          
          child.rotation.set(rotX, rotY, rotZ)
        }
      })
    }
  })

  return (
    <group ref={groupRef}>
      {photos.map((photo, i) => (
        <primitive
          key={i}
          object={polaroidGeometry.clone()}
        />
      ))}
    </group>
  )
}

