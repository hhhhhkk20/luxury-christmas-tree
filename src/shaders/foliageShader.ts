import * as THREE from 'three'

export const foliageVertexShader = `
  attribute vec3 position;
  attribute vec3 chaosPosition;
  attribute vec3 targetPosition;
  attribute float size;
  attribute vec3 color;
  
  uniform float progress;
  uniform float time;
  
  varying vec3 vColor;
  varying float vOpacity;
  
  void main() {
    // 在混沌位置和目标位置之间插值
    vec3 currentPos = mix(chaosPosition, targetPosition, progress);
    
    // 添加轻微的摆动效果
    float sway = sin(time * 0.5 + position.x * 0.1) * 0.1;
    currentPos.x += sway;
    currentPos.z += sway * 0.5;
    
    vec4 mvPosition = modelViewMatrix * vec4(currentPos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    
    // 根据距离调整大小
    float distance = length(mvPosition.xyz);
    gl_PointSize = size * (300.0 / distance);
    
    vColor = color;
    vOpacity = 1.0 - (distance / 50.0);
  }
`

export const foliageFragmentShader = `
  uniform float time;
  
  varying vec3 vColor;
  varying float vOpacity;
  
  void main() {
    vec2 uv = gl_PointCoord;
    
    // 创建圆形粒子
    float dist = distance(uv, vec2(0.5));
    float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
    
    // 添加内部高光
    float highlight = 1.0 - dist * 2.0;
    highlight = max(0.0, highlight);
    
    vec3 finalColor = vColor + vec3(highlight * 0.3);
    
    gl_FragColor = vec4(finalColor, alpha * vOpacity);
  }
`

export function createFoliageMaterial(progress: number, time: number): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    uniforms: {
      progress: { value: progress },
      time: { value: time }
    },
    vertexShader: foliageVertexShader,
    fragmentShader: foliageFragmentShader,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  })
}

