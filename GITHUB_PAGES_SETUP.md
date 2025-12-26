# 🌐 GitHub Pages 部署完整指南

## 📋 前置条件

1. ✅ 代码已推送到 GitHub 仓库
2. ✅ 仓库已创建（如果还没有，访问 https://github.com/new）

## 🚀 部署步骤

### 方法 1: 使用 GitHub Actions（推荐，自动化）

#### 步骤 1: 启用 GitHub Pages

1. 访问你的仓库：`https://github.com/hhhhhkk20/luxury-christmas-tree`
2. 点击 **Settings**（设置）
3. 在左侧菜单找到 **Pages**（页面）
4. 在 **Source**（源）部分：
   - 选择 **GitHub Actions**
   - 不要选择 "Deploy from a branch"
5. 保存设置

#### 步骤 2: 推送代码触发部署

代码已经包含了 GitHub Actions 工作流配置（`.github/workflows/deploy.yml`），只需推送代码即可：

```bash
# 如果还没有推送代码
git push -u origin main

# 如果代码已推送，可以手动触发
# 在 GitHub 仓库页面：Actions -> Deploy to GitHub Pages -> Run workflow
```

#### 步骤 3: 查看部署状态

1. 在仓库页面点击 **Actions** 标签
2. 查看 "Deploy to GitHub Pages" 工作流
3. 等待部署完成（通常 2-5 分钟）
4. 部署成功后，访问地址会显示在 Actions 页面

#### 步骤 4: 访问你的网站

部署成功后，你的网站地址将是：
```
https://hhhhhkk20.github.io/luxury-christmas-tree/
```

---

### 方法 2: 手动部署（备选）

如果 GitHub Actions 不可用，可以使用手动方式：

#### 步骤 1: 构建项目

```bash
# 安装依赖
npm install

# 构建项目
npm run build
```

#### 步骤 2: 创建 gh-pages 分支

```bash
# 进入 dist 目录
cd dist

# 初始化 git（如果还没有）
git init

# 添加所有文件
git add .

# 提交
git commit -m "Deploy to GitHub Pages"

# 创建并切换到 gh-pages 分支
git checkout -b gh-pages

# 添加远程仓库
git remote add origin https://github.com/hhhhhkk20/luxury-christmas-tree.git

# 推送 gh-pages 分支
git push -u origin gh-pages --force
```

#### 步骤 3: 配置 GitHub Pages

1. 访问仓库 Settings -> Pages
2. Source 选择：**Deploy from a branch**
3. Branch 选择：`gh-pages`，文件夹选择 `/ (root)`
4. 点击 Save

---

## 🔧 配置说明

### Vite 配置

项目已配置支持 GitHub Pages：
- `base: '/luxury-christmas-tree/'` - 适配 GitHub Pages 路径
- 构建时会自动使用正确的 base 路径

### GitHub Actions 工作流

工作流文件：`.github/workflows/deploy.yml`

工作流程：
1. 检出代码
2. 安装 Node.js 和依赖
3. 构建项目
4. 部署到 GitHub Pages

---

## ✅ 验证部署

部署成功后，你应该能够：

1. 访问网站：`https://hhhhhkk20.github.io/luxury-christmas-tree/`
2. 看到 3D 圣诞树界面
3. 允许摄像头权限后，可以使用手势控制

---

## 🐛 常见问题

### 问题 1: 404 错误

**原因**：base 路径配置不正确

**解决**：
- 检查 `vite.config.ts` 中的 `base` 配置
- 确保与仓库名称匹配

### 问题 2: 资源加载失败

**原因**：路径问题

**解决**：
- 确保所有资源使用相对路径
- 检查浏览器控制台的错误信息

### 问题 3: 摄像头无法使用

**原因**：GitHub Pages 使用 HTTPS，但可能需要用户授权

**解决**：
- 确保在 HTTPS 环境下访问
- 浏览器会提示授权摄像头权限

### 问题 4: 部署失败

**检查**：
1. Actions 标签页查看错误日志
2. 确保 `package.json` 中的构建脚本正确
3. 检查 Node.js 版本兼容性

---

## 🔄 更新网站

每次推送代码到 `main` 分支，GitHub Actions 会自动重新部署：

```bash
# 修改代码后
git add .
git commit -m "更新内容"
git push origin main
```

等待几分钟，网站会自动更新！

---

## 📝 自定义域名（可选）

如果你想使用自定义域名：

1. 在仓库 Settings -> Pages -> Custom domain 添加域名
2. 在域名 DNS 设置中添加 CNAME 记录指向 `hhhhhkk20.github.io`
3. 更新 `vite.config.ts` 中的 `base` 为 `/`

---

## 🎉 完成！

部署成功后，你的豪华互动圣诞树就可以在线访问了！

**网站地址**：`https://hhhhhkk20.github.io/luxury-christmas-tree/`

享受你的 3D 互动体验吧！🎄✨

