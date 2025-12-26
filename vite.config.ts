import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages 部署路径
// 如果是用户仓库：/仓库名/
// 如果是组织仓库或自定义域名：/
const base = process.env.GITHUB_PAGES === 'true' ? '/luxury-christmas-tree/' : '/'

export default defineConfig({
  base,
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
          'tfjs-vendor': ['@tensorflow/tfjs', '@tensorflow-models/hand-pose-detection']
        }
      }
    }
  }
})

