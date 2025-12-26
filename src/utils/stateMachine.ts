export enum TreeState {
  CHAOS = 'CHAOS',
  FORMED = 'FORMED'
}

export interface DualPosition {
  chaosPosition: [number, number, number]
  targetPosition: [number, number, number]
}

/**
 * 生成圆锥形状的目标位置
 */
export function generateTargetPosition(
  index: number,
  total: number,
  height: number = 8,
  baseRadius: number = 3
): [number, number, number] {
  // 将索引映射到 0-1 范围
  const t = index / total
  
  // 高度从底部到顶部
  const y = t * height
  
  // 半径从底部到顶部递减
  const radius = baseRadius * (1 - t * 0.7)
  
  // 角度分布
  const angle = (index * 137.508) % 360 // 黄金角度分布
  const rad = (angle * Math.PI) / 180
  
  // 添加一些随机偏移使分布更自然
  const randomOffset = (Math.random() - 0.5) * 0.3
  
  const x = Math.cos(rad) * radius * (1 + randomOffset)
  const z = Math.sin(rad) * radius * (1 + randomOffset)
  
  return [x, y, z]
}

/**
 * 生成混沌状态的随机位置（球形空间）
 */
export function generateChaosPosition(
  radius: number = 15
): [number, number, number] {
  // 在球形空间内均匀分布
  const u = Math.random()
  const v = Math.random()
  const theta = 2 * Math.PI * u
  const phi = Math.acos(2 * v - 1)
  const r = radius * Math.cbrt(Math.random())
  
  const x = r * Math.sin(phi) * Math.cos(theta)
  const y = r * Math.sin(phi) * Math.sin(theta)
  const z = r * Math.cos(phi)
  
  return [x, y, z]
}

/**
 * 线性插值
 */
export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t
}

/**
 * 向量插值
 */
export function lerpVector(
  start: [number, number, number],
  end: [number, number, number],
  t: number
): [number, number, number] {
  return [
    lerp(start[0], end[0], t),
    lerp(start[1], end[1], t),
    lerp(start[2], end[2], t)
  ]
}

/**
 * 平滑过渡函数（ease-in-out）
 */
export function smoothStep(t: number): number {
  return t * t * (3 - 2 * t)
}

