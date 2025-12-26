#!/bin/bash

echo "🚀 准备推送到 GitHub..."
echo ""

# 检查是否已配置远程仓库
if git remote get-url origin &> /dev/null; then
    echo "✅ 已配置远程仓库: $(git remote get-url origin)"
    read -p "是否使用现有远程仓库? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        git remote remove origin
    else
        echo "📤 推送到 GitHub..."
        git push -u origin main
        exit 0
    fi
fi

# 获取 GitHub 信息
echo "请输入 GitHub 信息："
read -p "GitHub 用户名: " GITHUB_USER
read -p "仓库名称 (默认: luxury-christmas-tree): " REPO_NAME
REPO_NAME=${REPO_NAME:-luxury-christmas-tree}

echo ""
echo "选择认证方式："
echo "1) HTTPS (需要 Personal Access Token)"
echo "2) SSH (需要配置 SSH key)"
read -p "请选择 (1/2): " AUTH_METHOD

if [ "$AUTH_METHOD" = "1" ]; then
    REMOTE_URL="https://github.com/${GITHUB_USER}/${REPO_NAME}.git"
    echo ""
    echo "⚠️  使用 HTTPS 方式，推送时可能需要输入 Personal Access Token"
    echo "   如果还没有 Token，请访问: https://github.com/settings/tokens"
else
    REMOTE_URL="git@github.com:${GITHUB_USER}/${REPO_NAME}.git"
    echo ""
    echo "⚠️  使用 SSH 方式，请确保已配置 SSH key"
fi

# 添加远程仓库
echo ""
echo "📝 添加远程仓库..."
git remote add origin "$REMOTE_URL"

# 确保分支名为 main
git branch -M main

# 推送代码
echo ""
echo "📤 推送到 GitHub..."
echo "   如果提示输入密码，请使用 Personal Access Token (HTTPS) 或确保 SSH key 已配置"
echo ""

if git push -u origin main; then
    echo ""
    echo "✅ 成功推送到 GitHub!"
    echo ""
    echo "🌐 仓库地址: https://github.com/${GITHUB_USER}/${REPO_NAME}"
    echo ""
    echo "📋 下一步："
    echo "   1. 访问 https://vercel.com 或 https://netlify.com 部署"
    echo "   2. 导入 GitHub 仓库即可自动部署"
else
    echo ""
    echo "❌ 推送失败"
    echo ""
    echo "可能的原因："
    echo "   1. 仓库尚未在 GitHub 上创建，请先访问 https://github.com/new 创建"
    echo "   2. 认证失败，请检查 Token 或 SSH key"
    echo "   3. 网络问题"
    echo ""
    echo "手动创建仓库后，可以运行："
    echo "   git push -u origin main"
fi

