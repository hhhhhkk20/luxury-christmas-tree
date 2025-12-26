import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import {
  generateTargetPosition,
  generateChaosPosition,
  smoothStep
} from '../utils/stateMachine'

interface OrnamentData {
  type: 'gift' | 'ball' | 'light'
  chaosPosition: [number, number, number]
  targetPosition: [number, number, number]
  color: THREE.Color
  weight: number // 物理权重
}

interface OrnamentsProps {
  progress: number
}

export function Ornaments({ progress }: OrnamentsProps) {
  const giftMeshRef = useRef<THREE.InstancedMesh>(null)
  const ballMeshRef = useRef<THREE.InstancedMesh>(null)
  const lightMeshRef = useRef<THREE.InstancedMesh>(null)

  // 生成装饰物数据
  const ornaments = useMemo(() => {
    const data: OrnamentData[] = []
    
    // 礼物盒（重）- 20个
    for (let i = 0; i < 20; i++) {
      data.push({
        type: 'gift',
        chaosPosition: generateChaosPosition(15),
        targetPosition: generateTargetPosition(i, 100, 7, 2.5),
        color: new THREE.Color().setHSL(Math.random(), 0.8, 0.5),
        weight: 1.0
      })
    }

    // 彩球（轻）- 50个
    for (let i = 0; i < 50; i++) {
      data.push({
        type: 'ball',
        chaosPosition: generateChaosPosition(15),
        targetPosition: generateTargetPosition(i + 20, 100, 7.5, 2.8),
        color: new THREE.Color().setHSL(Math.random(), 0.9, 0.6),
        weight: 0.5
      })
    }

    // 灯光（极轻）- 30个
    for (let i = 0; i < 30; i++) {
      data.push({
        type: 'light',
        chaosPosition: generateChaosPosition(15),
        targetPosition: generateTargetPosition(i + 70, 100, 8, 3),
        color: new THREE.Color(1, 0.9, 0.7), // 金色
        weight: 0.1
      })
    }

    return data
  }, [])

  // 创建几何体和材质
  const { giftGeometry, ballGeometry, lightGeometry } = useMemo(() => {
    const giftGeo = new THREE.BoxGeometry(0.3, 0.3, 0.3)
    const ballGeo = new THREE.SphereGeometry(0.15, 16, 16)
    const lightGeo = new THREE.SphereGeometry(0.08, 8, 8)

    return {
      giftGeometry: giftGeo,
      ballGeometry: ballGeo,
      lightGeometry: lightGeo
    }
  }, [])

  const { giftMaterial, ballMaterial, lightMaterial } = useMemo(() => {
    const giftMat = new THREE.MeshStandardMaterial({
      metalness: 0.3,
      roughness: 0.4
    })

    const ballMat = new THREE.MeshStandardMaterial({
      metalness: 0.8,
      roughness: 0.2,
      emissive: new THREE.Color(0x000000),
      emissiveIntensity: 0
    })

    const lightMat = new THREE.MeshStandardMaterial({
      emissive: new THREE.Color(0xffd700),
      emissiveIntensity: 2,
      color: new THREE.Color(0xffd700)
    })

    return {
      giftMaterial: giftMat,
      ballMaterial: ballMat,
      lightMaterial: lightMat
    }
  }, [])

  // 初始化实例矩阵
  useEffect(() => {
    const giftOrnaments = ornaments.filter((o) => o.type === 'gift')
    const ballOrnaments = ornaments.filter((o) => o.type === 'ball')
    const lightOrnaments = ornaments.filter((o) => o.type === 'light')

    const matrix = new THREE.Matrix4()

    // 设置礼物盒
    if (giftMeshRef.current) {
      giftOrnaments.forEach((ornament, i) => {
        const pos = ornament.chaosPosition
        matrix.setPosition(pos[0], pos[1], pos[2])
        giftMeshRef.current!.setMatrixAt(i, matrix)
        giftMeshRef.current!.setColorAt(i, ornament.color)
      })
      giftMeshRef.current.instanceMatrix.needsUpdate = true
      if (giftMeshRef.current.instanceColor) {
        giftMeshRef.current.instanceColor.needsUpdate = true
      }
    }

    // 设置彩球
    if (ballMeshRef.current) {
      ballOrnaments.forEach((ornament, i) => {
        const pos = ornament.chaosPosition
        matrix.setPosition(pos[0], pos[1], pos[2])
        ballMeshRef.current!.setMatrixAt(i, matrix)
        ballMeshRef.current!.setColorAt(i, ornament.color)
      })
      ballMeshRef.current.instanceMatrix.needsUpdate = true
      if (ballMeshRef.current.instanceColor) {
        ballMeshRef.current.instanceColor.needsUpdate = true
      }
    }

    // 设置灯光
    if (lightMeshRef.current) {
      lightOrnaments.forEach((ornament, i) => {
        const pos = ornament.chaosPosition
        matrix.setPosition(pos[0], pos[1], pos[2])
        lightMeshRef.current!.setMatrixAt(i, matrix)
      })
      lightMeshRef.current.instanceMatrix.needsUpdate = true
    }
  }, [ornaments])

  // 动画循环
  useFrame(() => {
    const smoothProgress = smoothStep(progress)
    const matrix = new THREE.Matrix4()

    const giftOrnaments = ornaments.filter((o) => o.type === 'gift')
    const ballOrnaments = ornaments.filter((o) => o.type === 'ball')
    const lightOrnaments = ornaments.filter((o) => o.type === 'light')

    // 更新礼物盒位置
    if (giftMeshRef.current) {
      giftOrnaments.forEach((ornament, i) => {
        const chaos = ornament.chaosPosition
        const target = ornament.targetPosition
        
        const x = chaos[0] + (target[0] - chaos[0]) * smoothProgress
        const y = chaos[1] + (target[1] - chaos[1]) * smoothProgress
        const z = chaos[2] + (target[2] - chaos[2]) * smoothProgress

        matrix.setPosition(x, y, z)
        giftMeshRef.current!.setMatrixAt(i, matrix)
      })
      giftMeshRef.current.instanceMatrix.needsUpdate = true
    }

    // 更新彩球位置
    if (ballMeshRef.current) {
      ballOrnaments.forEach((ornament, i) => {
        const chaos = ornament.chaosPosition
        const target = ornament.targetPosition
        
        const x = chaos[0] + (target[0] - chaos[0]) * smoothProgress
        const y = chaos[1] + (target[1] - chaos[1]) * smoothProgress
        const z = chaos[2] + (target[2] - chaos[2]) * smoothProgress

        matrix.setPosition(x, y, z)
        ballMeshRef.current!.setMatrixAt(i, matrix)
      })
      ballMeshRef.current.instanceMatrix.needsUpdate = true
    }

    // 更新灯光位置和发光强度
    if (lightMeshRef.current && lightMaterial) {
      lightOrnaments.forEach((ornament, i) => {
        const chaos = ornament.chaosPosition
        const target = ornament.targetPosition
        
        const x = chaos[0] + (target[0] - chaos[0]) * smoothProgress
        const y = chaos[1] + (target[1] - chaos[1]) * smoothProgress
        const z = chaos[2] + (target[2] - chaos[2]) * smoothProgress

        matrix.setPosition(x, y, z)
        lightMeshRef.current!.setMatrixAt(i, matrix)
      })
      lightMeshRef.current.instanceMatrix.needsUpdate = true
      
      // 根据进度调整发光强度
      lightMaterial.emissiveIntensity = smoothProgress * 2
    }
  })

  return (
    <group>
      <instancedMesh
        ref={giftMeshRef}
        args={[giftGeometry, giftMaterial, 20]}
        castShadow
        receiveShadow
      />
      <instancedMesh
        ref={ballMeshRef}
        args={[ballGeometry, ballMaterial, 50]}
        castShadow
        receiveShadow
      />
      <instancedMesh
        ref={lightMeshRef}
        args={[lightGeometry, lightMaterial, 30]}
      />
    </group>
  )
}

