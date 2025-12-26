# 豪华互动圣诞树 (Grand Luxury Interactive Christmas Tree)

一个基于 React 19、TypeScript 和 Three.js (R3F) 的高保真 3D Web 应用。

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/luxury-christmas-tree)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/YOUR_USERNAME/luxury-christmas-tree)

## ✨ 特性

- 🎄 **双状态系统**：CHAOS（混沌散落）和 FORMED（聚合成树）之间的动态变形
- 🎯 **双坐标系统**：所有元素在混沌位置和目标位置之间平滑插值
- 🌲 **针叶系统**：使用 THREE.Points 和自定义 ShaderMaterial 渲染大量粒子
- 🎁 **装饰物系统**：使用 InstancedMesh 优化的礼物盒、彩球和灯光
- 📸 **拍立得照片装饰**：动态分布的拍立得风格照片
- ✋ **手势识别**：通过摄像头检测手势，控制树的形态和视角
- ✨ **电影级后期处理**：Bloom 效果营造金色光晕

## 🛠️ 技术栈

- React 19
- TypeScript
- React Three Fiber
- Drei
- Postprocessing
- Tailwind CSS
- TensorFlow.js (手势识别)

## 🚀 快速开始

### 安装

```bash
npm install
```

### 开发

```bash
npm run dev
```

### 构建

```bash
npm run build
```

### 预览

```bash
npm run preview
```

## 📖 使用说明

1. 应用启动后，会请求摄像头权限
2. **张开手掌**：树会散落成混沌状态
3. **握拳/闭合手掌**：树会聚合成形
4. **移动手部**：可以调整摄像机视角

## 🎨 视觉风格

- 主色调：深祖母绿 (#0d4f3c) 和高光金色 (#d4af37)
- 背景：疯狂动物城风格的 HDRI 环境
- 效果：电影级 Bloom 辉光

## 🌐 在线部署

### Vercel（推荐）

1. Fork 或克隆此仓库
2. 在 [Vercel](https://vercel.com) 导入项目
3. 自动部署完成！

### Netlify

1. Fork 或克隆此仓库
2. 在 [Netlify](https://www.netlify.com) 导入项目
3. 构建命令：`npm run build`
4. 发布目录：`dist`

### GitHub Pages

1. 在仓库 Settings -> Pages 中启用 GitHub Actions
2. 推送到 main 分支即可自动部署

详细部署说明请查看 [DEPLOY.md](./DEPLOY.md)

## 📝 注意事项

⚠️ **摄像头权限**：部署后需要 HTTPS 才能使用摄像头 API。Vercel 和 Netlify 默认提供 HTTPS。

⚠️ **TensorFlow.js 模型**：首次加载可能需要一些时间下载模型文件。

## 📄 许可证

MIT

## 🙏 致谢

- [React Three Fiber](https://github.com/pmndrs/react-three-fiber)
- [Drei](https://github.com/pmndrs/drei)
- [TensorFlow.js](https://www.tensorflow.org/js)

