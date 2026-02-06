import * as React from 'react';
import { Button, message } from 'antd';
import { Dialog, Input } from '@alifd/next';

/**
 * 替换组件按钮
 * 功能：执行 convert-assets-final 脚本，显示成功提示后刷新页面
 */
interface ReplaceComponentsButtonProps {
    style?: React.CSSProperties;
}

const ReplaceComponentsButton: React.FC<ReplaceComponentsButtonProps> = ({ style }) => {
    const [loading, setLoading] = React.useState(false);
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
            console.log('🔄 点击了新增低代码组件按钮');
            setLoading(true);

            // 检查服务器状态
            const isServerRunning = await checkServerStatus();
            console.log('🔍 服务器状态:', isServerRunning);

            if (!isServerRunning) {
                message.error('服务器未运行，请先启动 command-server.js');
                setLoading(false);
                return;
            }

            // 显示输入框对话框
            setLoading(false);
            showInputDialog();
        } catch (error) {
            console.error('执行脚本失败:', error);
            setLoading(false);
        }
    };

    /**
     * 显示输入对话框
     */
    const showInputDialog = () => {
        let inputValue = '';

        Dialog.confirm({
            content: (
                <div style={{ backgroundColor: '#fff', padding: '20px' }}>
                    <div style={{ marginBottom: '12px' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '8px',
                            fontSize: '14px',
                            color: '#333'
                        }}>
                            请输入组件名称：
                        </label>
                        <Input
                            placeholder="例如：我的自定义组件"
                            onChange={(value: any) => inputValue = value}
                            onPressEnter={() => {
                                if (inputValue.trim()) {
                                    confirmExecuteScript(inputValue);
                                }
                            }}
                            autoFocus
                            maxLength={50}
                        />
                    </div>
                    <p style={{
                        fontSize: '12px',
                        color: '#999',
                        margin: 0
                    }}>
                        💡 提示：组件名称将用于显示在低代码编辑器中
                    </p>
                </div>
            ),
            onOk: () => {
                if (!inputValue.trim()) {
                    message.warning('请输入组件名称');
                    return false;
                }
                confirmExecuteScript(inputValue);
            },
            onCancel: () => {
                console.log('用户取消了输入');
            },
            okProps: { loading: loading },
            width: 400,
            centered: true
        });
    };

    /**
     * 确认执行脚本
     */
    const confirmExecuteScript = async (name: string) => {
        if (!name.trim()) {
            message.warning('请输入组件名称');
            return;
        }

        try {
            setLoading(true);

            // 调用服务器 API 执行脚本，传递组件名称
            const response = await fetch('http://localhost:3001/api/execute-command', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    command: `node convert-assets-final --title "${name}"`,
                    workingDirectory: 'd:\\AAAImport-Work\\Newwork-ddm\\demo-general'
                })
            });

            const result = await response.json();

            if (result.success) {
                // 显示成功弹窗
                showSuccessDialog();
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
     * 显示成功对话框
     */
    const showSuccessDialog = () => {
        Dialog.confirm({
            title: '✅ 导入成功',
            content: (
                <div style={{
                    padding: '20px 0',
                    textAlign: 'center',
                    backgroundColor: '#fff',
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
            ),
            onOk: () => {
                console.log('用户确认成功');
            },
            onCancel: () => {
                console.log('用户取消');
            },
            okText: '确定',
            cancelText: '',
            width: 400,
            centered: true
        });
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
        </div>
    );
};

export default ReplaceComponentsButton;
