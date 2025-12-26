import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { createFoliageMaterial } from '../shaders/foliageShader'
import {
  DualPosition,
  generateTargetPosition,
  generateChaosPosition,
  smoothStep
} from '../utils/stateMachine'

interface FoliageProps {
  count: number
  progress: number
}

export function Foliage({ count, progress }: FoliageProps) {
  const pointsRef = useRef<THREE.Points>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const timeRef = useRef(0)

  // 生成双坐标系统
  const positions = useMemo(() => {
    const chaosPositions: [number, number, number][] = []
    const targetPositions: [number, number, number][] = []
    const sizes: number[] = []
    const colors: [number, number, number][] = []

    for (let i = 0; i < count; i++) {
      chaosPositions.push(generateChaosPosition(15))
      targetPositions.push(generateTargetPosition(i, count, 8, 3))
      
      // 随机大小
      sizes.push(Math.random() * 0.5 + 0.3)
      
      // 深祖母绿色，带一些变化
      const greenVariation = Math.random() * 0.2
      colors.push([
        0.05 + greenVariation,
        0.31 + greenVariation * 0.5,
        0.24 + greenVariation
      ])
    }

    return { chaosPositions, targetPositions, sizes, colors }
  }, [count])

  // 创建几何体和材质
  const { geometry, material } = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    
    // 设置属性
    geo.setAttribute('position', new THREE.Float32BufferAttribute(new Array(count * 3).fill(0), 3))
    geo.setAttribute('chaosPosition', new THREE.Float32BufferAttribute(positions.chaosPositions.flat(), 3))
    geo.setAttribute('targetPosition', new THREE.Float32BufferAttribute(positions.targetPositions.flat(), 3))
    geo.setAttribute('size', new THREE.Float32BufferAttribute(positions.sizes, 1))
    geo.setAttribute('color', new THREE.Float32BufferAttribute(positions.colors.flat(), 3))

    const mat = createFoliageMaterial(progress, 0)
    
    return { geometry: geo, material: mat }
  }, [count, positions, progress])

  // 更新材质进度
  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.progress.value = progress
    }
  }, [progress])

  // 动画循环
  useFrame((state, delta) => {
    timeRef.current += delta
    
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = timeRef.current
      materialRef.current.uniforms.progress.value = smoothStep(progress)
    }

    // 更新位置属性
    if (pointsRef.current && geometry) {
      const smoothProgress = smoothStep(progress)
      const positionAttribute = geometry.getAttribute('position') as THREE.BufferAttribute
      const chaosAttribute = geometry.getAttribute('chaosPosition') as THREE.BufferAttribute
      const targetAttribute = geometry.getAttribute('targetPosition') as THREE.BufferAttribute

      for (let i = 0; i < count; i++) {
        const chaosX = chaosAttribute.getX(i)
        const chaosY = chaosAttribute.getY(i)
        const chaosZ = chaosAttribute.getZ(i)
        
        const targetX = targetAttribute.getX(i)
        const targetY = targetAttribute.getY(i)
        const targetZ = targetAttribute.getZ(i)

        positionAttribute.setX(i, chaosX + (targetX - chaosX) * smoothProgress)
        positionAttribute.setY(i, chaosY + (targetY - chaosY) * smoothProgress)
        positionAttribute.setZ(i, chaosZ + (targetZ - chaosZ) * smoothProgress)
      }

      positionAttribute.needsUpdate = true
    }
  })

  // 设置 materialRef
  useEffect(() => {
    if (pointsRef.current) {
      materialRef.current = pointsRef.current.material as THREE.ShaderMaterial
    }
  }, [material])

  return (
    <points ref={pointsRef} geometry={geometry} material={material} />
  )
}

