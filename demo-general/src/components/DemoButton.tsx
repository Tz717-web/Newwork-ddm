import React, { useState, useEffect } from 'react';
import { Button, message, Modal, Space, Typography, Card, Input } from 'antd';
import { PlayCircleOutlined, CloudServerOutlined, InfoCircleOutlined, FolderOpenOutlined } from '@ant-design/icons';

const { Text, Paragraph } = Typography;

interface DemoButtonProps {
    /**
     * 按钮文本
     */
    text?: string;
    /**
     * 要执行的命令
     */
    command?: string;
    /**
     * 工作目录
     */
    workingDirectory?: string;
    /**
     * 服务器地址
     */
    serverUrl?: string;
}

/**
 * Demo按钮组件 - 用于在终端执行指定命令
 * @param props 组件属性
 * @returns React组件
 */
const DemoButton: React.FC<DemoButtonProps> = ({
    text = '出码',
    command = 'node bin/lowcode-code-generator.js -i ../plugin-test/example-schema-lowcode.json -o D:/locd-Demo-pro -s icejs',
    workingDirectory = 'd:\\AAAImport-Work\\Newwork-ddm\\demo-general\\src\\plugins\\lowcode-code-generator',
    serverUrl = 'http://localhost:3001'
}) => {
    const [loading, setLoading] = useState(false);
    const [output, setOutput] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [serverStatus, setServerStatus] = useState<'checking' | 'online' | 'offline'>('checking');

    /**
     * 检查服务器状态
     */
    const checkServerStatus = async () => {
        try {
            const response = await fetch(`${serverUrl}/api/health`);
            if (response.ok) {
                setServerStatus('online');
            } else {
                setServerStatus('offline');
            }
        } catch (error) {
            setServerStatus('offline');
        }
    };

    useEffect(() => {
        checkServerStatus();
        // 每30秒检查一次服务器状态
        const interval = setInterval(checkServerStatus, 30000);
        return () => clearInterval(interval);
    }, [serverUrl]);

    /**
     * 执行终端命令
     */
    const executeCommand = async () => {
        if (serverStatus === 'offline') {
            message.warning('命令执行服务器离线，显示手动执行指令');
            showManualInstructions();
            return;
        }

        setLoading(true);
        setOutput('');

        try {
            // 第一步：执行 replace-components.js 脚本
            console.log('🔄 开始执行组件替换脚本...');
            const replaceResponse = await fetch(`${serverUrl}/api/execute-command`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    command: 'node replace-components.js',
                    workingDirectory: 'd:\\AAAImport-Work\\Newwork-ddm\\demo-general'
                })
            });

            const replaceResult = await replaceResponse.json();

            if (!replaceResponse.ok || !replaceResult.success) {
                throw new Error(replaceResult.error || '组件替换脚本执行失败');
            }

            console.log('✅ 组件替换脚本执行成功');

            // 第二步：执行出码命令
            console.log('🚀 开始执行出码命令...');
            const codegenResponse = await fetch(`${serverUrl}/api/execute-command`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    command,
                    workingDirectory
                })
            });

            const codegenResult = await codegenResponse.json();

            if (codegenResponse.ok && codegenResult.success) {
                setOutput(`✅ 命令执行成功!\n\n📝 第一步 - 组件替换:\n${replaceResult.output}\n\n📄 第二步 - 出码:\n📝 执行命令: ${codegenResult.command}\n📁 工作目录: ${codegenResult.workingDirectory}\n\n📄 输出结果:\n${codegenResult.output}`);
                message.success('出码执行完成！');
                setIsModalVisible(true);
            } else {
                throw new Error(codegenResult.error || '出码命令执行失败');
            }

        } catch (error) {
            console.error('执行命令时出错:', error);
            showManualInstructions();
        } finally {
            setLoading(false);
        }
    };

    /**
     * 显示手动执行指令
     */
    const showManualInstructions = () => {
        const manualInstructions = `🔧 手动执行指令

📝 要执行的命令: ${command}
📁 工作目录: ${workingDirectory}

📋 执行步骤:
1. 打开终端/命令提示符
2. 切换到工作目录:
   cd ${workingDirectory}
3. 执行命令:
   ${command}

💡 提示: 确保已安装 Node.js 和相关依赖`;

        setOutput(manualInstructions);
        message.info('请按照提示手动执行命令');
        setIsModalVisible(true);
    };

    /**
     * 获取服务器状态显示
     */
    const getServerStatusDisplay = () => {
        switch (serverStatus) {
            case 'online':
                return <Text type="success">🟢 服务器在线</Text>;
            case 'offline':
                return <Text type="warning">🔴 服务器离线</Text>;
            case 'checking':
                return <Text type="secondary">🟡 检查中...</Text>;
        }
    };

    return (
        <>
            <Card
                style={{
                    maxWidth: 600,
                    margin: '20px auto',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
            >
                <Space direction="vertical" style={{ width: '100%' }} size="middle">
                    <div style={{ textAlign: 'center' }}>
                        <CloudServerOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
                        <Paragraph type="secondary">
                            默认出码地址D:/locd-Demo-pro
                        </Paragraph>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <Space direction="vertical" size="small">
                            <div>
                                <Text strong>服务器状态: </Text>
                                {getServerStatusDisplay()}
                            </div>
                        </Space>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <Button
                            type="primary"
                            icon={<PlayCircleOutlined />}
                            onClick={executeCommand}
                            loading={loading}
                            size="large"
                            disabled={serverStatus === 'checking'}
                            style={{
                                borderRadius: '6px',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                minWidth: '120px'
                            }}
                        >
                            {loading ? '执行中...' : text}
                        </Button>
                    </div>

                    <div style={{
                        background: '#f0f2f5',
                        padding: '12px',
                        borderRadius: '4px',
                        fontSize: '12px'
                    }}>
                        <InfoCircleOutlined />
                        <Text type="secondary" style={{ marginLeft: '8px' }}>
                            服务器离线时会显示手动执行指令
                        </Text>
                    </div>
                </Space>
            </Card>

            <Modal
                title="命令执行结果"
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={[
                    <Button key="copy" onClick={() => {
                        navigator.clipboard.writeText(output);
                        message.success('已复制到剪贴板');
                    }}>
                        复制结果
                    </Button>,
                    <Button key="terminal" onClick={() => {
                        // 在Windows中打开命令提示符
                        window.open(`cmd.exe /c "cd /d ${workingDirectory} && ${command}"`, '_blank');
                    }}>
                        在终端中打开
                    </Button>,
                    <Button key="close" type="primary" onClick={() => setIsModalVisible(false)}>
                        关闭
                    </Button>
                ]}
                width={700}
            >
                <pre style={{
                    background: '#1e1e1e',
                    color: '#d4d4d4',
                    padding: '16px',
                    borderRadius: '4px',
                    maxHeight: '500px',
                    overflow: 'auto',
                    whiteSpace: 'pre-wrap',
                    fontFamily: 'Consolas, Monaco, "Courier New", monospace',
                    fontSize: '13px'
                }}>
                    {output}
                </pre>
            </Modal>
        </>
    );
};

export default DemoButton;