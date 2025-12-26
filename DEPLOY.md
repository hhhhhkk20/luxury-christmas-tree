# 部署指南

## 推送到 GitHub

### 方法 1: 使用 GitHub CLI（推荐）

如果你已安装 GitHub CLI：

```bash
# 创建 GitHub 仓库并推送
gh repo create luxury-christmas-tree --public --source=. --remote=origin --push
```

### 方法 2: 手动创建仓库

1. 访问 [GitHub](https://github.com/new) 创建新仓库
   - 仓库名：`luxury-christmas-tree`（或你喜欢的名字）
   - 选择 Public 或 Private
   - **不要**初始化 README、.gitignore 或 license（我们已经有了）

2. 连接远程仓库并推送：

```bash
# 添加远程仓库（替换 YOUR_USERNAME 为你的 GitHub 用户名）
git remote add origin https://github.com/YOUR_USERNAME/luxury-christmas-tree.git

# 推送代码
git branch -M main
git push -u origin main
```

## 在线部署

### 选项 1: Vercel（推荐，最简单）

1. 访问 [Vercel](https://vercel.com)
2. 使用 GitHub 账号登录
3. 点击 "New Project"
4. 导入你的 GitHub 仓库
5. Vercel 会自动检测 Vite 配置
6. 点击 "Deploy" 即可

**配置说明：**
- Framework Preset: Vite
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

### 选项 2: Netlify

1. 访问 [Netlify](https://www.netlify.com)
2. 使用 GitHub 账号登录
3. 点击 "Add new site" -> "Import an existing project"
4. 选择你的 GitHub 仓库
5. 配置：
   - Build command: `npm run build`
   - Publish directory: `dist`
6. 点击 "Deploy site"

### 选项 3: GitHub Pages

1. 在项目根目录创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

2. 在 GitHub 仓库设置中启用 GitHub Pages：
   - Settings -> Pages
   - Source: GitHub Actions

## 环境变量（如需要）

如果将来需要添加环境变量，在部署平台设置：
- Vercel: Project Settings -> Environment Variables
- Netlify: Site settings -> Environment variables

## 注意事项

⚠️ **摄像头权限**：部署后需要 HTTPS 才能使用摄像头 API。Vercel 和 Netlify 默认提供 HTTPS。

⚠️ **TensorFlow.js 模型**：首次加载可能需要一些时间下载模型文件。

## 自定义域名

部署后，你可以在平台设置中添加自定义域名。

