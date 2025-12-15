# Demo Button 组件

一个用于在 Web 界面中执行终端命令的 React 组件，专为低代码项目设计。

## ✨ 功能特性

- 🔧 **命令执行**: 在Web界面中执行指定的终端命令
- 🖥️ **服务器监控**: 实时监控命令执行服务器状态
- 🛡️ **安全机制**: 命令白名单，防止恶意命令执行
- 📱 **响应式设计**: 适配各种屏幕尺寸
- 🎨 **美观界面**: 基于 Ant Design 的现代化UI
- 🔄 **降级处理**: 服务器离线时提供手动执行指令
- 📋 **结果展示**: 支持结果复制和终端快速打开

## 📦 项目结构

```
demo-general/
├── src/
│   └── components/
│       ├── DemoButton.tsx           # 主要组件文件
│       └── DemoButtonExample.tsx    # 使用示例页面
├── command-server.js                # 后端命令执行服务器
├── server-package.json             # 服务器依赖配置
└── README.md                       # 说明文档
```

## 🚀 快速开始

### 1. 安装服务器依赖

```bash
cd d:\AAAImport-Work\Newwork-ddm\demo-general
npm install express cors
```

### 2. 启动命令执行服务器

```bash
node command-server.js
```

服务器将在 `http://localhost:3001` 启动，提供以下 API 端点：

- `POST /api/execute-command` - 执行终端命令
- `GET /api/health` - 健康检查
- `GET /api/project-info` - 项目信息

### 3. 在页面中使用组件

```tsx
import React from 'react';
import DemoButton from './components/DemoButton';

function App() {
  return (
    <div>
      <h1>我的应用</h1>
      <DemoButton 
        text="运行 Demo"
        command="node demo"
        workingDirectory="d:\\AAAImport-Work\\Newwork-ddm\\demo-general"
      />
    </div>
  );
}
```

## 📖 组件属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `text` | string | '运行 Demo' | 按钮显示文本 |
| `command` | string | 'node demo' | 要执行的终端命令 |
| `workingDirectory` | string | 项目路径 | 命令执行的工作目录 |
| `serverUrl` | string | 'http://localhost:3001' | 命令执行服务器地址 |

## 🎯 使用示例

### 基本用法

```tsx
<DemoButton />
```

### 自定义命令

```tsx
<DemoButton 
  text="检查 Node.js 版本"
  command="node --version"
  workingDirectory="d:\\AAAImport-Work\\Newwork-ddm"
/>
```

### NPM 命令

```tsx
<DemoButton 
  text="启动开发服务器"
  command="npm start"
  workingDirectory="d:\\AAAImport-Work\\Newwork-ddm\\demo-general"
  serverUrl="http://localhost:3001"
/>
```

### 项目构建

```tsx
<DemoButton 
  text="构建项目"
  command="npm run build"
  workingDirectory="d:\\AAAImport-Work\\Newwork-ddm\\demo-general"
/>
```

## 🛡️ 安全特性

### 命令白名单

服务器只允许执行预定义的安全命令：

- `node demo`
- `node --version`
- `npm start`
- `npm run build`

### 离线降级

当命令执行服务器离线时，组件会：

1. 显示服务器离线状态
2. 提供详细的手动执行指令
3. 支持一键复制命令到剪贴板
4. 支持直接打开终端执行

## 🔧 API 接口

### POST /api/execute-command

执行指定的终端命令。

**请求体：**
```json
{
  "command": "node demo",
  "workingDirectory": "d:\\AAAImport-Work\\Newwork-ddm\\demo-general"
}
```

**响应：**
```json
{
  "success": true,
  "output": "命令执行结果...",
  "command": "node demo",
  "workingDirectory": "d:\\AAAImport-Work\\Newwork-ddm\\demo-general"
}
```

### GET /api/health

检查服务器健康状态。

**响应：**
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "version": "1.0.0"
}
```

## 📱 查看示例

要查看完整的使用示例，可以访问：

1. 启动命令执行服务器：`node command-server.js`
2. 在浏览器中打开示例页面查看 `DemoButtonExample.tsx`

## 🔍 故障排除

### 服务器无法启动

1. 检查 Node.js 是否已安装
2. 确认端口 3001 未被占用
3. 检查防火墙设置

### 命令执行失败

1. 确认命令在白名单中
2. 检查工作目录是否存在
3. 验证 Node.js 和 npm 已正确安装

### 组件显示离线状态

1. 确认命令执行服务器正在运行
2. 检查 `serverUrl` 配置是否正确
3. 查看浏览器控制台是否有网络错误

## 📝 开发说明

### 技术栈

- **前端**: React 18 + TypeScript + Ant Design
- **后端**: Node.js + Express + CORS
- **样式**: CSS-in-JS + Ant Design 主题

### 扩展功能

如需添加新的安全命令，请在 `command-server.js` 中的 `allowedCommands` 数组中添加：

```javascript
const allowedCommands = [
  'node demo',
  'node --version',
  'npm start',
  'npm run build',
  'your-new-command'  // 添加新命令
];
```

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request 来改进这个组件！

## 📄 许可证

MIT License

---

**注意**: 由于浏览器安全限制，直接从前端执行终端命令是不可能的。这个组件通过后端 API 实现了安全的命令执行机制。