import React from 'react';
import { Typography, Divider, Row, Col, Card } from 'antd';
import DemoButton from './DemoButton';

const { Title, Paragraph, Text } = Typography;

/**
 * Demo 按钮使用示例页面
 * 展示如何在应用中使用 DemoButton 组件执行终端命令
 */
const DemoButtonExample: React.FC = () => {
  return (
    <div style={{ padding: '24px', background: '#f5f5f5', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* 页面标题 */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Title level={1}>Demo 按钮组件示例</Title>
          <Paragraph type="secondary" style={{ fontSize: '16px' }}>
            演示如何在低代码项目中集成命令执行按钮
          </Paragraph>
        </div>

        {/* 基本用法 */}
        <Card style={{ marginBottom: '24px', borderRadius: '8px' }}>
          <Title level={2}>基本用法</Title>
          <Paragraph>
            最简单的用法，直接使用默认配置执行 <Text code>node demo</Text> 命令。
          </Paragraph>
          <DemoButton />
        </Card>

        {/* 高级用法 */}
        <Row gutter={[24, 24]}>
          
          {/* 自定义命令示例 */}
          <Col xs={24} lg={12}>
            <Card title="自定义命令示例" style={{ borderRadius: '8px', height: '100%' }}>
              <Paragraph>
                执行 Node.js 版本检查命令：
              </Paragraph>
              <DemoButton 
                text="检查 Node.js 版本"
                command="node --version"
                workingDirectory="d:\\AAAImport-Work\\Newwork-ddm"
              />
              <Divider />
              <Paragraph type="secondary" style={{ fontSize: '12px' }}>
                这个示例展示了如何自定义按钮文本、命令和工作目录。
              </Paragraph>
            </Card>
          </Col>

          {/* npm 命令示例 */}
          <Col xs={24} lg={12}>
            <Card title="NPM 命令示例" style={{ borderRadius: '8px', height: '100%' }}>
              <Paragraph>
                运行 npm start 启动开发服务器：
              </Paragraph>
              <DemoButton 
                text="启动开发服务器"
                command="npm start"
                workingDirectory="d:\\AAAImport-Work\\Newwork-ddm\\demo-general"
                serverUrl="http://localhost:3001"
              />
              <Divider />
              <Paragraph type="secondary" style={{ fontSize: '12px' }}>
                注意：运行 npm start 需要先安装依赖包。
              </Paragraph>
            </Card>
          </Col>

          {/* 构建命令示例 */}
          <Col xs={24} lg={12}>
            <Card title="构建命令示例" style={{ borderRadius: '8px', height: '100%' }}>
              <Paragraph>
                执行项目构建命令：
              </Paragraph>
              <DemoButton 
                text="构建项目"
                command="npm run build"
                workingDirectory="d:\\AAAImport-Work\\Newwork-ddm\\demo-general"
              />
              <Divider />
              <Paragraph type="secondary" style={{ fontSize: '12px' }}>
                构建命令通常需要较长时间执行，耐心等待。
              </Paragraph>
            </Card>
          </Col>

          {/* 多项目示例 */}
          <Col xs={24} lg={12}>
            <Card title="多项目示例" style={{ borderRadius: '8px', height: '100%' }}>
              <Paragraph>
                在不同项目中执行相同命令：
              </Paragraph>
              <DemoButton 
                text="运行其他 Demo"
                command="node demo"
                workingDirectory="d:\\AAAImport-Work\\Newwork-ddm\\demo-basic-antd"
              />
              <Divider />
              <Paragraph type="secondary" style={{ fontSize: '12px' }}>
                展示了如何在不同的工作目录中执行相同的命令。
              </Paragraph>
            </Card>
          </Col>
        </Row>

        {/* 功能说明 */}
        <Card style={{ marginTop: '24px', borderRadius: '8px' }}>
          <Title level={2}>功能特性</Title>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Title level={4}>🔧 核心功能</Title>
              <ul>
                <li>执行指定的终端命令</li>
                <li>显示命令执行结果</li>
                <li>支持自定义工作目录</li>
                <li>实时服务器状态监控</li>
              </ul>
            </Col>
            <Col xs={24} md={12}>
              <Title level={4}>🛡️ 安全特性</Title>
              <ul>
                <li>命令白名单机制</li>
                <li>服务器离线降级处理</li>
                <li>手动执行指令显示</li>
                <li>安全的命令执行环境</li>
              </ul>
            </Col>
            <Col xs={24} md={12}>
              <Title level={4}>🎨 用户体验</Title>
              <ul>
                <li>美观的界面设计</li>
                <li>加载状态提示</li>
                <li>结果复制功能</li>
                <li>终端快速打开</li>
              </ul>
            </Col>
            <Col xs={24} md={12}>
              <Title level={4}>⚙️ 技术特性</Title>
              <ul>
                <li>React + TypeScript 开发</li>
                <li>Ant Design 组件库</li>
                <li>RESTful API 设计</li>
                <li>错误处理和降级方案</li>
              </ul>
            </Col>
          </Row>
        </Card>

        {/* 使用说明 */}
        <Card style={{ marginTop: '24px', borderRadius: '8px' }}>
          <Title level={2}>快速开始</Title>
          <Paragraph>
            <Text strong>1. 安装依赖：</Text>
          </Paragraph>
          <pre style={{ background: '#f5f5f5', padding: '12px', borderRadius: '4px' }}>
{`npm install express cors`}
          </pre>
          
          <Paragraph>
            <Text strong>2. 启动命令服务器：</Text>
          </Paragraph>
          <pre style={{ background: '#f5f5f5', padding: '12px', borderRadius: '4px' }}>
{`node command-server.js`}
          </pre>
          
          <Paragraph>
            <Text strong>3. 在页面中引入组件：</Text>
          </Paragraph>
          <pre style={{ background: '#f5f5f5', padding: '12px', borderRadius: '4px' }}>
{`import DemoButton from './components/DemoButton';

<DemoButton 
  text="运行 Demo"
  command="node demo"
  workingDirectory="your-project-path"
/>`}
          </pre>
        </Card>

      </div>
    </div>
  );
};

export default DemoButtonExample;