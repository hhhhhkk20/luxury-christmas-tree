#!/bin/bash
# 推送命令模板 - 请替换 YOUR_USERNAME 为你的 GitHub 用户名

GITHUB_USER="YOUR_USERNAME"  # ⬅️ 请修改这里
REPO_NAME="luxury-christmas-tree"

echo "🚀 开始推送到 GitHub..."
echo "GitHub 用户: $GITHUB_USER"
echo "仓库名: $REPO_NAME"
echo ""

# 添加远程仓库（HTTPS 方式）
git remote add origin https://github.com/${GITHUB_USER}/${REPO_NAME}.git

# 确保分支名为 main
git branch -M main

# 推送代码
echo "📤 正在推送..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ 成功！"
    echo "🌐 仓库地址: https://github.com/${GITHUB_USER}/${REPO_NAME}"
    echo ""
    echo "📋 下一步：访问 https://vercel.com 部署项目"
else
    echo ""
    echo "❌ 推送失败"
    echo ""
    echo "可能的原因："
    echo "  1. 仓库尚未创建，请先访问 https://github.com/new 创建"
    echo "  2. 需要认证，请使用 Personal Access Token"
    echo "  3. 用户名或仓库名错误"
fi

