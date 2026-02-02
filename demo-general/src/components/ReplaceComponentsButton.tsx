import * as React from 'react';
import { Button, message, Modal } from 'antd';

/**
 * 替换组件按钮
 * 功能：执行 convert-assets-final 脚本，显示成功提示后刷新页面
 */
interface ReplaceComponentsButtonProps {
    style?: React.CSSProperties;
}

const ReplaceComponentsButton: React.FC<ReplaceComponentsButtonProps> = ({ style }) => {
    const [loading, setLoading] = React.useState(false);
    const [visible, setVisible] = React.useState(false);
    const [serverStatus, setServerStatus] = React.useState<'idle' | 'checking' | 'running'>('idle');

    /**
     * 检查服务器状态
     */
    const checkServerStatus = async () => {
        try {
            setServerStatus('checking');
            const response = await fetch('http://localhost:3001/api/health');
            if (response.ok) {
                setServerStatus('idle');
                return true;
            }
            return false;
        } catch (error) {
            console.error('服务器连接失败:', error);
            setServerStatus('idle');
            return false;
        }
    };

    /**
     * 执行替换组件脚本
     */
    const executeReplaceScript = async () => {
        try {
            setLoading(true);

            // 检查服务器状态
            const isServerRunning = await checkServerStatus();
            if (!isServerRunning) {
                message.error('服务器未运行，请先启动 command-server.js');
                setLoading(false);
                return;
            }

            // 调用服务器 API 执行脚本
            const response = await fetch('http://localhost:3001/api/execute-command', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    command: 'node convert-assets-final',
                    workingDirectory: 'd:\\AAAImport-Work\\Newwork-ddm\\demo-general'
                })
            });

            const result = await response.json();

            if (result.success) {
                // 显示成功弹窗
                setVisible(true);
                message.success('组件替换成功！');

                // 2秒后刷新页面
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } else {
                message.error('脚本执行失败: ' + (result.error || '未知错误'));
            }
        } catch (error) {
            console.error('执行脚本失败:', error);
        } finally {
            setLoading(false);
        }
    };

    /**
     * 关闭弹窗
     */
    const handleClose = () => {
        setVisible(false);
    };

    return (
        <div style={style}>
            <Button
                type="primary"
                loading={loading || serverStatus === 'checking'}
                onClick={executeReplaceScript}
                style={{
                    width: '100%',
                    marginBottom: '12px'
                }}
            >
                {loading ? '执行中...' : '🔄 新增低代码组件'}
            </Button>

            <Modal
                title="✅ 导入成功"
                visible={visible}
                onOk={handleClose}
                onCancel={handleClose}
                okText="确定"
                cancelText=""
                width={400}
                centered={true}
            >
                <div style={{
                    padding: '20px 0',
                    textAlign: 'center'
                }}>
                    <div style={{
                        fontSize: '48px',
                        marginBottom: '16px'
                    }}>
                        🎉
                    </div>
                    <p style={{
                        fontSize: '16px',
                        color: '#52c41a',
                        marginBottom: '8px'
                    }}>
                        组件替换成功！
                    </p>
                    <p style={{
                        fontSize: '14px',
                        color: '#666'
                    }}>
                        页面将在 2 秒后自动刷新...
                    </p>
                </div>
            </Modal>
        </div>
    );
};

export default ReplaceComponentsButton;
