@echo off
chcp 65001 >nul
echo 🚀 Demo Button 组件启动脚本
echo ==================================

:: 检查 Node.js 是否安装
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ 错误: 未找到 Node.js，请先安装 Node.js
    pause
    exit /b 1
)

echo ✅ Node.js 版本:
node --version

:: 检查 npm 是否安装
npm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ 错误: 未找到 npm
    pause
    exit /b 1
)

echo ✅ npm 版本:
npm --version

:: 安装服务器依赖
echo.
echo 📦 安装服务器依赖...
npm install express cors

if errorlevel 1 (
    echo ❌ 服务器依赖安装失败
    pause
    exit /b 1
) else (
    echo ✅ 服务器依赖安装成功
)

:: 启动命令执行服务器
echo.
echo 🔧 启动命令执行服务器...
echo 服务器地址: http://localhost:3001
echo API 端点:
echo   - POST /api/execute-command
echo   - GET  /api/health
echo   - GET  /api/project-info
echo.
echo 按 Ctrl+C 停止服务器
echo ==================================

node command-server.js