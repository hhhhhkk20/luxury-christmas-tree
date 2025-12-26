# 🚀 快速部署指南

## 方法 1: 使用 GitHub Web 界面（最简单）

### 步骤 1: 创建 GitHub 仓库

1. 访问 https://github.com/new
2. 填写信息：
   - Repository name: `luxury-christmas-tree`
   - 选择 Public 或 Private
   - **不要**勾选任何初始化选项（README、.gitignore、license）
3. 点击 "Create repository"

### 步骤 2: 推送代码

在终端运行以下命令（替换 `YOUR_USERNAME` 为你的 GitHub 用户名）：

```bash
cd /Users/yc/Music/tree

# 添加远程仓库
git remote add origin https://github.com/YOUR_USERNAME/luxury-christmas-tree.git

# 推送代码
git branch -M main
git push -u origin main
```

**如果使用 HTTPS 需要认证：**
- 用户名：你的 GitHub 用户名
- 密码：使用 Personal Access Token（不是密码）
- 创建 Token: https://github.com/settings/tokens
- Token 权限：至少需要 `repo` 权限

## 方法 2: 使用 GitHub CLI（如果已安装）

```bash
# 安装 GitHub CLI (如果未安装)
brew install gh

# 登录
gh auth login

# 创建仓库并推送
gh repo create luxury-christmas-tree --public --source=. --remote=origin --push
```

## 方法 3: 使用 SSH（如果已配置 SSH key）

```bash
# 添加 SSH 远程仓库（替换 YOUR_USERNAME）
git remote add origin git@github.com:YOUR_USERNAME/luxury-christmas-tree.git

# 推送
git branch -M main
git push -u origin main
```

## 🌐 部署到在线平台

### Vercel（推荐）

1. 访问 https://vercel.com
2. 使用 GitHub 登录
3. 点击 "Add New Project"
4. 导入你的仓库
5. 自动部署完成！

### Netlify

1. 访问 https://netlify.com
2. 使用 GitHub 登录
3. 点击 "Add new site" → "Import an existing project"
4. 选择仓库
5. 构建设置：
   - Build command: `npm run build`
   - Publish directory: `dist`
6. 点击 "Deploy"

### GitHub Pages

1. 仓库 Settings → Pages
2. Source: GitHub Actions
3. 自动部署

## ⚡ 一键执行脚本

运行交互式脚本：

```bash
./push-to-github.sh
```

