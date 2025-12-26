#!/bin/bash

# 部署脚本 - 推送到 GitHub 并部署

echo "🚀 准备部署豪华互动圣诞树..."

# 检查是否已设置远程仓库
if ! git remote get-url origin &> /dev/null; then
    echo "❌ 未找到远程仓库"
    echo ""
    echo "请先创建 GitHub 仓库，然后运行："
    echo "  git remote add origin https://github.com/YOUR_USERNAME/luxury-christmas-tree.git"
    echo "  git branch -M main"
    echo "  git push -u origin main"
    exit 1
fi

# 检查是否有未提交的更改
if ! git diff-index --quiet HEAD --; then
    echo "⚠️  检测到未提交的更改"
    read -p "是否先提交更改? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git add .
        git commit -m "更新代码"
    fi
fi

# 推送到 GitHub
echo "📤 推送到 GitHub..."
git push origin main

if [ $? -eq 0 ]; then
    echo "✅ 代码已推送到 GitHub!"
    echo ""
    echo "🌐 现在可以在以下平台部署："
    echo "  1. Vercel: https://vercel.com/new"
    echo "  2. Netlify: https://app.netlify.com/start"
    echo "  3. GitHub Pages: 在仓库 Settings -> Pages 中启用"
else
    echo "❌ 推送失败，请检查网络连接和权限"
    exit 1
fi

