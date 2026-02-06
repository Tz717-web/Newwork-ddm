const fs = require('fs');
const path = require('path');

/**
 * 阿里物料低代码规范转换脚本 - 整合版（对应新增低代码功能）
 * 
 * 功能：
 * 1. 读取 xxx.json（阿里物料低代码规范的页面源码）
 * 2. 将所有小组件整合成一个整体组件
 * 3. 生成一个组件配置和一个包配置（只有一个 componentId）
 * 4. 一次性生成 xxx2.json 和 assets-local.json
 */

/**
 * 生成唯一的组件名称
 */
function generateUniqueComponentName() {
    return `Lcc${Math.random().toString(36).substring(2, 11).toLowerCase()}`;
}

/**
 * 生成唯一的组件 ID
 */
function generateUniqueComponentId() {
    return `LCC-${Math.random().toString(36).substring(2, 15).toUpperCase()}`;
}

/**
 * 从 xxx.json 生成整合后的组件配置
 */
function generateComponentConfig(xxxData, title = '测试') {
    const componentId = generateUniqueComponentId();
    const componentName = generateUniqueComponentName();

    // 生成 props 配置
    const props = [
        {
            name: "content",
            type: "field",
            title: {
                label: "文本内容"
            },
            setter: {
                componentName: "MixedSetter",
                props: {
                    setters: [
                        {
                            componentName: "StringSetter",
                            initialValue: "",
                            props: {}
                        },
                        "VariableSetter"
                    ]
                }
            },
            extraProps: {
                display: "inline"
            }
        },
        {
            name: "propName",
            type: "field",
            title: {
                label: "属性标题"
            },
            setter: {
                componentName: "MixedSetter",
                props: {
                    setters: [
                        {
                            componentName: "SlotSetter",
                            initialValue: {
                                type: "JSSlot",
                                title: "propName",
                                value: []
                            },
                            props: {}
                        },
                        "VariableSetter"
                    ]
                }
            },
            extraProps: {
                display: "block"
            }
        },
        {
            name: "fieldId",
            type: "field",
            title: "唯一标识",
            setter: {
                componentName: "StringSetter",
                props: {}
            },
            extraProps: {
                display: "block"
            }
        },
        {
            display: "accordion",
            name: "__style__",
            title: "样式设置",
            setter: "StyleSetter"
        }
    ];

    return {
        componentId: componentId,
        icon: "",
        experimental: {
            initials: [
                {
                    initial: {
                        type: "JSFunction",
                        value: "(node) => {\n                                    return `${node.componentName.charAt(0).toLowerCase() + node.componentName.substr(1)}_${Math.random()\n                                        .toString(36)\n                                        .substring(6)}`;\n                                }"
                    },
                    name: "fieldId"
                }
            ],
            callbacks: {}
        },
        configure: {
            component: {
                isContainer: false,
                rootSelector: "",
                isModal: false
            },
            props: props
        },
        title: title,
        group: '低代码组件',
        tags: "",
        reference: {
            destructuring: false,
            id: componentId,
            version: "0.1.0"
        },
        devMode: "lowcode",
        snippets: [
            {
                schema: {
                    componentName: componentName,
                    props: {
                        propName: {
                            type: "JSSlot",
                            title: "propName",
                            value: []
                        },
                        content: ""
                    }
                },
                title: title
            }
        ],
        docUrl: "",
        componentName: componentName
    };
}

/**
 * 从 xxx.json 生成整合后的包配置
 */
function generatePackageConfig(xxxData, componentId) {
    // 从 componentsTree 中提取 Page 组件
    const componentsTree = xxxData.componentsTree || [];
    let pageComponent = null;

    const findPageComponent = (node) => {
        if (!node) return false;

        if (node.componentName === 'Page') {
            pageComponent = node;
            return true;
        }

        if (node.children && Array.isArray(node.children)) {
            for (const child of node.children) {
                if (findPageComponent(child)) {
                    return true;
                }
            }
        }

        return false;
    };

    for (const tree of componentsTree) {
        if (findPageComponent(tree)) {
            break;
        }
    }

    // 从 Page 组件中提取所有直接子组件
    let rootComponents = [];
    let otherComponents = [];

    if (pageComponent && pageComponent.children && Array.isArray(pageComponent.children)) {
        // 只整合以 Lc 开头的组件
        rootComponents = pageComponent.children.filter(child =>
            child.componentName !== 'Page' &&
            child.componentName.startsWith('Lc')
        );

        // 其他组件（包括 Page）保持不变
        otherComponents = pageComponent.children.filter(child =>
            child.componentName !== 'Page' &&
            !child.componentName.startsWith('Lc')
        );
    }

    console.log(`   找到 ${rootComponents.length} 个需要整合的子组件: ${rootComponents.map(c => c.componentName).join(', ')}`);
    console.log(`   找到 ${otherComponents.length} 个保持不变的子组件: ${otherComponents.map(c => c.componentName).join(', ')}`);

    // 生成 propTypes
    const propTypes = [
        {
            defaultValue: "",
            display: "inline",
            name: "content",
            __sid: "item_l9fexhbc",
            setterProps: {},
            type: "string",
            title: "文本内容",
            setter: "StringSetter"
        },
        {
            defaultValue: "[]",
            display: "block",
            name: "propName",
            __sid: "item_lc8gifru",
            setterProps: {},
            type: "element",
            title: "属性标题",
            setter: "SlotSetter"
        }
    ];

    // 构建 schema
    const schema = {
        componentName: "Component",
        title: "",
        props: {
            style: {
                mock: {},
                type: "JSExpression",
                value: "this.props.style"
            },
            className: "component_k8e4naln",
            cls: {
                mock: {},
                type: "JSExpression",
                value: "this.props.className"
            },
            fieldId: "symbol_k8bnubw4"
        },
        state: pageComponent ? (pageComponent.state || {}) : {},
        methods: pageComponent ? (pageComponent.methods || {}) : {},
        lifeCycles: pageComponent ? (pageComponent.lifeCycles || {}) : {},
        css: pageComponent ? (pageComponent.css || "") : "",
        dataSource: pageComponent ? (pageComponent.dataSource || { list: [] }) : { list: [] },
        condition: true,
        // children 包含整合后的组件和其他保持不变的组件
        children: [...rootComponents, ...otherComponents],
        propTypes: propTypes
    };

    return {
        schema: schema,
        id: componentId,
        type: "lowcode",
        version: "0.1.0"
    };
}

/**
 * 将 xxx.json 转换为 xxx2.json 和 assets-local.json（整合版）
 */
function convertXxxToBoth(xxxJsonPath, assetsJsonPath, xxx2JsonPath, assetsLocalJsonPath, title = '测试') {
    console.log(`📖 正在读取 ${xxxJsonPath}...`);
    const xxxData = JSON.parse(fs.readFileSync(xxxJsonPath, 'utf-8'));

    console.log(`📖 正在读取 ${assetsJsonPath}...`);
    const assetsData = JSON.parse(fs.readFileSync(assetsJsonPath, 'utf-8'));

    console.log(`🔧 正在生成整合后的配置...`);
    console.log(`📝 组件名称: ${title}`);

    // 生成组件配置
    const componentConfig = generateComponentConfig(xxxData, title);
    console.log(`   生成了组件配置: ${componentConfig.componentName} (ID: ${componentConfig.componentId})`);

    // 生成包配置
    const packageConfig = generatePackageConfig(xxxData, componentConfig.componentId);
    console.log(`   生成了包配置 (ID: ${packageConfig.id})`);

    // 生成 xxx2.json（数组格式）
    const xxx2Data = [
        componentConfig,
        packageConfig
    ];

    fs.writeFileSync(xxx2JsonPath, JSON.stringify(xxx2Data, null, 4), 'utf-8');
    console.log(`✅ 已生成 ${xxx2JsonPath}`);

    // 生成 assets-local.json
    assetsData.components.push(componentConfig);
    assetsData.packages.push(packageConfig);

    // 注册到 lowCodeComponentsConfig
    if (!assetsData.extConfig.lowCodeComponentsConfig) {
        assetsData.extConfig.lowCodeComponentsConfig = {};
    }
    assetsData.extConfig.lowCodeComponentsConfig[componentConfig.componentId] = {
        "configId": Math.floor(Math.random() * 100000)
    };

    fs.writeFileSync(assetsLocalJsonPath, JSON.stringify(assetsData, null, 4), 'utf-8');
    console.log(`✅ 已生成 ${assetsLocalJsonPath}`);

    // 输出统计信息
    console.log(`\n📊 转换统计:`);
    console.log(`   - Component ID: ${componentConfig.componentId}`);
    console.log(`   - Component Name: ${componentConfig.componentName}`);
    console.log(`   - Schema Component Name: Component`);
    console.log(`   - Version: 0.1.0`);
}

/**
 * 主函数
 */
function main() {
    // 解析命令行参数
    const args = process.argv.slice(2);
    let title = '测试';

    for (let i = 0; i < args.length; i++) {
        if (args[i] === '--title' && args[i + 1]) {
            title = args[i + 1];
            break;
        }
    }

    const exampleSchemaPath = path.join(__dirname, 'src', 'plugins', 'plugin-test', 'example-schema.json');
    const assetsJsonPath = path.join(__dirname, 'src', 'services', 'assets.json');
    const xxx2JsonPath = path.join(__dirname, 'public', 'xxx2.json');
    const assetsLocalJsonPath = path.join(__dirname, 'public', 'assets-local.json');

    console.log('========================================');
    console.log('🚀 开始整合转换...');
    console.log('========================================\n');

    try {
        convertXxxToBoth(exampleSchemaPath, assetsJsonPath, xxx2JsonPath, assetsJsonPath, title);
    } catch (error) {
        console.error(`❌ 转换失败:`, error.message);
        console.error(error.stack);
    }

    console.log('');
    console.log('========================================');
    console.log('🎉 转换完成！');
    console.log('========================================');
}

// 执行主函数
if (require.main === module) {
    main();
}

module.exports = {
    convertXxxToBoth,
    generateComponentConfig,
    generatePackageConfig
};
