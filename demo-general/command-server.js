const express = require('express');
const { exec } = require('child_process');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3001;

// 中间件配置
app.use(cors());
app.use(express.json());

// 静态文件服务
app.use(express.static(path.join(__dirname, 'public')));

/**
 * 执行终端命令的API端点
 * POST /api/execute-command
 * Body: { command: string, workingDirectory?: string }
 */
app.post('/api/execute-command', (req, res) => {
  const { command, workingDirectory = process.cwd() } = req.body;

  if (!command) {
    return res.status(400).json({ error: '命令不能为空' });
  }

  // 安全检查 - 限制可执行的命令
  const allowedCommands = [
    'node demo',
    'node --version',
    'npm start',
    'npm run build',
    'npm run demo',
    'npm run dev',
    'npm test',
    'npm run test'
  ];
  // 去除命令首尾空格后进行匹配
  const cleanCommand = command.trim();
  const isAllowed = allowedCommands.some(allowed => cleanCommand.includes(allowed.trim()));

  if (!isAllowed) {
    return res.status(403).json({
      error: '不允许执行此命令',
      message: '为了安全考虑，只允许执行预定义的命令'
    });
  }

  console.log(`执行命令: ${command} (目录: ${workingDirectory})`);

  // 执行命令
  exec(command, { cwd: workingDirectory }, (error, stdout, stderr) => {
    if (error) {
      console.error('命令执行错误:', error);
      return res.status(500).json({
        error: '命令执行失败',
        message: error.message,
        stderr: stderr
      });
    }

    // 合并标准输出和错误输出
    const output = stdout || stderr || '命令执行完成，无输出';

    console.log('命令执行结果:', output);
    res.json({
      success: true,
      output: output.trim(),
      command: command,
      workingDirectory: workingDirectory
    });
  });
});

// 健康检查端点
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// 获取项目信息
app.get('/api/project-info', (req, res) => {
  res.json({
    name: 'LowCode Demo',
    description: '低代码引擎 Demo 项目',
    availableCommands: [
      'node demo',
      'node --version',
      'npm start',
      'npm run build',
      'npm run demo',
      'npm run dev',
      'npm test',
      'npm run test'
    ],
    workingDirectory: process.cwd()
  });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`命令执行服务器运行在 http://localhost:${PORT}`);
  console.log('可用端点:');
  console.log(`  POST /api/execute-command - 执行终端命令`);
  console.log(`  GET  /api/health - 健康检查`);
  console.log(`  GET  /api/project-info - 项目信息`);
});