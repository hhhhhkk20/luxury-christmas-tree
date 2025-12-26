# 🚀 GitHub 仓库设置步骤

## 步骤 1: 创建 GitHub 仓库

请访问以下链接创建新仓库：

👉 **https://github.com/new**

### 填写信息：
- **Repository name**: `luxury-christmas-tree`
- **Description** (可选): `豪华互动圣诞树 - 3D Web 应用`
- **Visibility**: 选择 Public 或 Private
- ⚠️ **重要**: 不要勾选以下选项：
  - ❌ Add a README file
  - ❌ Add .gitignore
  - ❌ Choose a license

3. 点击 **"Create repository"** 按钮

## 步骤 2: 推送代码

创建仓库后，在终端运行：

```bash
cd /Users/yc/Music/tree
git push -u origin main
```

如果提示输入用户名和密码：
- **Username**: `hhhhhkk20`
- **Password**: 使用 Personal Access Token（不是 GitHub 密码）

### 如何创建 Personal Access Token：

1. 访问：https://github.com/settings/tokens
2. 点击 "Generate new token" → "Generate new token (classic)"
3. 填写信息：
   - Note: `luxury-christmas-tree`
   - Expiration: 选择合适的时间
   - Scopes: 勾选 `repo` 权限
4. 点击 "Generate token"
5. 复制生成的 token（只显示一次！）
6. 推送时，密码处粘贴这个 token

## 步骤 3: 验证

推送成功后，访问：
👉 **https://github.com/hhhhhkk20/luxury-christmas-tree**

## 步骤 4: 部署到在线平台

### Vercel（推荐）

1. 访问：https://vercel.com
2. 使用 GitHub 登录
3. 点击 "Add New Project"
4. 选择 `luxury-christmas-tree` 仓库
5. 点击 "Deploy"
6. 等待部署完成，获得在线地址！

### Netlify

1. 访问：https://netlify.com
2. 使用 GitHub 登录
3. 点击 "Add new site" → "Import an existing project"
4. 选择 `luxury-christmas-tree` 仓库
5. 构建设置：
   - Build command: `npm run build`
   - Publish directory: `dist`
6. 点击 "Deploy site"

---

**当前状态**：
- ✅ 本地代码已提交
- ✅ 远程仓库已配置：`https://github.com/hhhhhkk20/luxury-christmas-tree.git`
- ⏳ 等待在 GitHub 上创建仓库

创建仓库后，运行 `git push -u origin main` 即可！

