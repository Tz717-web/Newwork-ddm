#!/bin/bash

# Demo Button 组件启动脚本
# 用于快速启动命令执行服务器和示例应用

echo "🚀 Demo Button 组件启动脚本"
echo "=================================="

# 检查 Node.js 是否安装
if ! command -v node &> /dev/null; then
    echo "❌ 错误: 未找到 Node.js，请先安装 Node.js"
    exit 1
fi

echo "✅ Node.js 版本: $(node --version)"

# 检查 npm 是否安装
if ! command -v npm &> /dev/null; then
    echo "❌ 错误: 未找到 npm"
    exit 1
fi

echo "✅ npm 版本: $(npm --version)"

# 安装服务器依赖
echo ""
echo "📦 安装服务器依赖..."
npm install express cors

if [ $? -eq 0 ]; then
    echo "✅ 服务器依赖安装成功"
else
    echo "❌ 服务器依赖安装失败"
    exit 1
fi

# 启动命令执行服务器
echo ""
echo "🔧 启动命令执行服务器..."
echo "服务器地址: http://localhost:3001"
echo "API 端点:"
echo "  - POST /api/execute-command"
echo "  - GET  /api/health"
echo "  - GET  /api/project-info"
echo ""
echo "按 Ctrl+C 停止服务器"
echo "=================================="

node command-server.js