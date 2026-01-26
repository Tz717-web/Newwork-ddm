import * as React from 'react';
import { IPublicEnumTransformStage, IPublicModelPluginContext } from '@alilc/lowcode-types';
import { material, project } from '@alilc/lowcode-engine';
import CodeGenerator from '@alilc/lowcode-code-generator';
import DemoButton from '../../components/DemoButton';
import asserts from '../../services/assets.json';


let exampleSchema: any = null;

export { exampleSchema };

/**
 * 唐智测试插件
 * @param ctx - 插件上下文对象，提供插件所需的各种API和工具
 * @returns 返回插件配置对象，包含exports和init方法
 */
const TangZhiTest = (ctx: IPublicModelPluginContext) => {
    return {
        // 插件对外暴露的数据和方法
        exports() {
            return {
                data: '你可以把插件的数据这样对外暴露',
                func: () => {
                    console.log('方法也是一样');
                },
            };
        },
        // 插件的初始化函数，在引擎初始化之后会立刻调用
        init() {
            // 初始化时自动更新并显示Schema
            setTimeout(() => {
                updateSchemaDisplay();
            }, 1000);


            // 你可以拿到其他插件暴露的方法和属性
            // const { data, func } = ctx.plugins.pluginA;
            // func();

            // console.log(options.name);

            // 自动更新并显示Schema的函数
            const updateSchemaDisplay = async () => {
                try {
                    const schema = project.exportSchema(IPublicEnumTransformStage.Save);
                    exampleSchema = schema;

                    // 保存到 example-schema.json 文件
                    try {
                        await fetch('http://localhost:3001/api/save-schema', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                schema,
                                filePath: 'd:\\AAAImport-Work\\Newwork-ddm\\demo-general\\src\\plugins\\plugin-test\\example-schema.json'
                            })
                        });
                    } catch (e) {
                        console.warn('保存到文件失败:', e);
                    }

                    const schemaPanel = document.getElementById('schema-output');
                    if (schemaPanel) {
                        schemaPanel.textContent = JSON.stringify(schema, null, 2);
                    }
                    ctx.logger.log('Schema显示更新成功并已保存！');
                } catch (error) {
                    console.error('更新Schema显示失败:', error);
                    ctx.logger.error('更新Schema显示失败: ' + error);
                }
            };
            // const generateCode = async () => {
            //   import { plugins } from '@alilc/lowcode-engine';

            //   const codeGenResult = plugins.codeGenerator.generateCode({
            //     solution: 'icejs',
            //     schema: await ctx.project.exportSchema(),
            //   });

            //   console.log('出码结果:', codeGenResult); // 这里就是出码结果

            // };

            // 导出Schema为JSON文件（选择保存目录）
            const exportSchema = async () => {
                try {
                    const schema = project.exportSchema(IPublicEnumTransformStage.Render);
                    const dataStr = JSON.stringify(schema, null, 2);
                    const fileName = `schema-${new Date().toISOString().split('T')[0]}.json`;

                    // 检查是否支持File System Access API
                    if ('showSaveFilePicker' in window) {
                        try {
                            // 打开保存文件对话框
                            const handle = await window.showSaveFilePicker({
                                suggestedName: fileName,
                                types: [
                                    {
                                        description: 'JSON文件',
                                        accept: { 'application/json': ['.json'] }
                                    }
                                ]
                            });

                            // 创建可写流并保存文件
                            const writable = await handle.createWritable();
                            await writable.write(dataStr);
                            await writable.close();

                            ctx.logger.log('Schema文件保存成功！');
                        } catch (err) {
                            if (err.name !== 'AbortError') {
                                // 如果用户取消或其他错误，使用传统下载方式作为备用
                                ctx.logger.log('使用备用下载方式...');
                                fallbackDownload(dataStr, fileName);
                            }
                        }
                    } else {
                        // 传统下载方式（不支持File System Access API的浏览器）
                        ctx.logger.log('浏览器不支持目录选择，使用传统下载方式...');
                        fallbackDownload(dataStr, fileName);
                    }
                } catch (error) {
                    console.error('导出Schema文件失败:', error);
                    ctx.logger.error('导出Schema文件失败: ' + error);
                }
            };

            // 传统下载备用方案
            const fallbackDownload = (dataStr: string, fileName: string) => {
                const dataBlob = new Blob([dataStr], { type: 'application/json' });
                const url = URL.createObjectURL(dataBlob);
                const link = document.createElement('a');
                link.href = url;
                link.download = fileName;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
                ctx.logger.log('Schema文件导出成功（传统方式）！');
            };

            // 清空输出的函数
            const clearOutput = () => {
                const schemaPanel = document.getElementById('schema-output');
                if (schemaPanel) {
                    schemaPanel.textContent = '';
                }
            };

            // 复制到剪贴板的函数
            const copyToClipboard = async () => {
                try {
                    const schemaPanel = document.getElementById('schema-output');
                    if (schemaPanel && schemaPanel.textContent) {
                        await navigator.clipboard.writeText(schemaPanel.textContent);
                        ctx.logger.log('Schema已复制到剪贴板！');
                        // 临时显示成功提示
                        const button = document.getElementById('copy-button');
                        if (button) {
                            const originalText = button.textContent;
                            button.textContent = '✅ 已复制';
                            setTimeout(() => {
                                button.textContent = originalText;
                            }, 1500);
                        }
                    } else {
                        ctx.logger.error('没有可复制的内容');
                    }
                } catch (error) {
                    console.error('复制失败:', error);
                    ctx.logger.error('复制失败: ' + error);
                }
            };

            // 往引擎增加面板
            ctx.skeleton.add({
                area: 'leftArea',
                name: 'TangZhiTestPane',
                type: 'PanelDock',
                props: {
                    description: 'Schema',

                },
                content: (
                    <div style={{ padding: '12px', width: '300px', height: '80vh', overflow: 'auto' }}>
                        <h3 style={{ margin: '0 0 12px 0', color: '#1890ff', fontSize: '14px' }}>
                            🛠️ 唐智测试面板
                        </h3>

                        <div style={{ marginBottom: '12px' }}>
                            {/* 三列网格布局 */}
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '6px',
                                marginBottom: '12px'
                            }}>

                                <button
                                    id="copy-button"
                                    onClick={copyToClipboard}
                                    style={{
                                        padding: '8px 6px',
                                        backgroundColor: '#52c41a',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        fontSize: '11px',
                                        whiteSpace: 'nowrap'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = '#389e0d';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = '#52c41a';
                                    }}
                                >
                                    📋 复制
                                </button>

                                <button
                                    onClick={updateSchemaDisplay}
                                    style={{
                                        padding: '8px 6px',
                                        backgroundColor: '#fa541c',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        fontSize: '11px',
                                        whiteSpace: 'nowrap'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = '#d4380d';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = '#fa541c';
                                    }}
                                >
                                    更新当前Schema
                                </button>
                            </div>

                            {/* 功能提示 */}
                            <div style={{
                                fontSize: '10px',
                                color: '#666',
                                textAlign: 'center',
                                padding: '4px',
                                backgroundColor: '#f0f0f0',
                                borderRadius: '4px'
                            }}>
                                💡 提示: 进入模块自动更新schema，点击导出选择保存目录
                            </div>
                        </div>

                        {/* 出码工具 */}
                        <div style={{ marginBottom: '12px' }} onClick={updateSchemaDisplay}>
                            <DemoButton />
                        </div>

                        <div style={{
                            border: '1px solid #d9d9d9',
                            borderRadius: '4px',
                            padding: '8px',
                            backgroundColor: '#fafafa',
                            height: '60vh',
                            overflow: 'auto'
                        }}>
                            <div style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '8px', color: '#666' }}>
                                Schema输出:
                            </div>
                            <pre
                                id="schema-output"
                                style={{
                                    fontSize: '11px',
                                    margin: '0',
                                    whiteSpace: 'pre-wrap',
                                    wordBreak: 'break-all'
                                }}
                            >
                                点击"导出当前Schema"按钮来获取项目结构...
                            </pre>
                        </div>
                    </div>
                ),
            });

            ctx.logger.log('唐智测试面板已初始化');
        },
    };
};

// 插件名，注册环境下唯一
TangZhiTest.pluginName = 'TangZhiTest';
TangZhiTest.meta = {
    // 依赖的插件（插件名数组）
    dependencies: [],
    engines: {
        lowcodeEngine: '^1.0.0', // 插件需要配合 ^1.0.0 的引擎才可运行
    },
};

export default TangZhiTest;