# 豪华互动圣诞树 (Grand Luxury Interactive Christmas Tree)

一个基于 React 19、TypeScript 和 Three.js (R3F) 的高保真 3D Web 应用。

## 特性

- 🎄 **双状态系统**：CHAOS（混沌散落）和 FORMED（聚合成树）之间的动态变形
- 🎯 **双坐标系统**：所有元素在混沌位置和目标位置之间平滑插值
- 🌲 **针叶系统**：使用 THREE.Points 和自定义 ShaderMaterial 渲染大量粒子
- 🎁 **装饰物系统**：使用 InstancedMesh 优化的礼物盒、彩球和灯光
- 📸 **拍立得照片装饰**：动态分布的拍立得风格照片
- ✋ **手势识别**：通过摄像头检测手势，控制树的形态和视角
- ✨ **电影级后期处理**：Bloom 效果营造金色光晕

## 技术栈

- React 19
- TypeScript
- React Three Fiber
- Drei
- Postprocessing
- Tailwind CSS
- TensorFlow.js (手势识别)

## 安装

```bash
npm install
```

## 开发

```bash
npm run dev
```

## 使用说明

1. 应用启动后，会请求摄像头权限
2. 张开手掌：树会散落成混沌状态
3. 握拳/闭合手掌：树会聚合成形
4. 移动手部：可以调整摄像机视角

## 视觉风格

- 主色调：深祖母绿 (#0d4f3c) 和高光金色 (#d4af37)
- 背景：疯狂动物城风格的 HDRI 环境
- 效果：电影级 Bloom 辉光

