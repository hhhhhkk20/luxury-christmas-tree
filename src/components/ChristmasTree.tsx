import { Suspense, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, PerspectiveCamera } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'
import { Foliage } from './Foliage'
import { Ornaments } from './Ornaments'
import { PolaroidPhotos } from './PolaroidPhotos'
import { TreeState } from '../utils/stateMachine'
import { useGestureDetection } from '../hooks/useGestureDetection'

interface SceneProps {
  treeState: TreeState
  handPosition: { x: number; y: number } | null
}

function Scene({ treeState, handPosition }: SceneProps) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null)
  const progressRef = useRef(1) // 初始状态为 FORMED

  // 平滑过渡进度：CHAOS = 0, FORMED = 1
  useFrame((state, delta) => {
    const targetProgress = treeState === TreeState.FORMED ? 1 : 0
    progressRef.current += (targetProgress - progressRef.current) * delta * 2 // 平滑过渡速度
  })

  // 根据手势位置调整摄像机
  useFrame(() => {
    if (handPosition && cameraRef.current) {
      const targetX = handPosition.x * 5 // 水平移动范围
      const targetY = handPosition.y * 3 // 垂直移动范围

      // 平滑插值
      cameraRef.current.position.x += (targetX - cameraRef.current.position.x) * 0.05
      cameraRef.current.position.y += (targetY + 4 - cameraRef.current.position.y) * 0.05
      cameraRef.current.lookAt(0, 2, 0)
    }
  })

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={[0, 4, 20]}
        fov={50}
      />

      {/* 环境光 */}
      <ambientLight intensity={0.3} />
      
      {/* 主光源 */}
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      {/* 金色装饰光 */}
      <pointLight
        position={[0, 5, 0]}
        intensity={2}
        color={0xffd700}
        distance={15}
      />

      {/* HDRI 环境 */}
      <Environment preset="lobby" />

      {/* 圣诞树组件 */}
      <group>
        <Foliage count={5000} progress={progressRef.current} />
        <Ornaments progress={progressRef.current} />
        <PolaroidPhotos progress={progressRef.current} count={15} />
      </group>

      {/* 地面 */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.5, 0]}
        receiveShadow
      >
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color={0x1a1a1a} roughness={0.8} />
      </mesh>

      {/* 后期处理 */}
      <EffectComposer>
        <Bloom
          intensity={1.2}
          threshold={0.8}
          luminanceSmoothing={0.9}
          luminanceThreshold={0.8}
        />
      </EffectComposer>
    </>
  )
}

export function ChristmasTree() {
  const [treeState, setTreeState] = useState<TreeState>(TreeState.FORMED)
  const { isHandOpen, handPosition, isInitialized } = useGestureDetection()

  // 根据手势状态更新树状态
  useEffect(() => {
    if (isInitialized) {
      setTreeState(isHandOpen ? TreeState.CHAOS : TreeState.FORMED)
    }
  }, [isHandOpen, isInitialized])

  return (
    <div className="w-full h-full relative">
      <Canvas
        shadows
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <Scene treeState={treeState} handPosition={handPosition} />
        </Suspense>
      </Canvas>

      {/* UI 提示 */}
      <div className="absolute top-4 left-4 text-white bg-black/50 p-4 rounded-lg backdrop-blur-sm">
        <h2 className="text-xl font-bold mb-2 text-luxury-gold">豪华互动圣诞树</h2>
        <p className="text-sm">
          状态: <span className={treeState === TreeState.CHAOS ? 'text-red-400' : 'text-green-400'}>
            {treeState === TreeState.CHAOS ? '混沌散落' : '聚合成树'}
          </span>
        </p>
        <p className="text-xs mt-2 text-gray-400">
          {isInitialized
            ? '手势检测已启用：张开手 = 散落，握拳 = 聚合'
            : '正在初始化手势检测...'}
        </p>
      </div>
    </div>
  )
}

