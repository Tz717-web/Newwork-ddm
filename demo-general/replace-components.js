const fs = require('fs');
const path = require('path');

/**
 * 组件替换脚本
 * 
 * 功能：
 * 1. 从 example-schema.json 的 componentsMap 中识别复合组件（devMode: "lowCode" 且 componentName 不为 "Page"）
 * 2. 在 assets.json 的 components 中找到对应的 componentName，获取其 componentId
 * 3. 在 assets.json 的 packages 中找到 id 为该 componentId 的包，获取其 schema
 * 4. 将 example-schema.json 的 children 替换为 schema 的内容
 * 5. 识别替换后的子组件依赖，生成原生组件的 componentsMap 配置
 */

/**
 * 从 example-schema.json 中识别复合组件
 * @param {Object} exampleSchemaData - example-schema.json 数据
 * @returns {Array} - 复合组件列表
 */
function identifyCompositeComponents(exampleSchemaData) {
    if (!exampleSchemaData.componentsMap || !Array.isArray(exampleSchemaData.componentsMap)) {
        return [];
    }

    return exampleSchemaData.componentsMap.filter(comp =>
        comp.devMode === 'lowCode' &&
        comp.componentName !== 'Page'
    );
}

/**
 * 在 assets.json 中查找组件的 componentId
 * @param {Object} assetsData - assets.json 数据
 * @param {string} componentName - 组件名称
 * @returns {string|null} - componentId 或 null
 */
function findComponentId(assetsData, componentName) {
    if (!assetsData.components || !Array.isArray(assetsData.components)) {
        return null;
    }

    const component = assetsData.components.find(comp => comp.componentName === componentName);
    return component ? component.componentId : null;
}

/**
 * 在 assets.json 的 packages 中查找对应的 schema
 * @param {Object} assetsData - assets.json 数据
 * @param {string} componentId - 组件 ID
 * @returns {Object|null} - schema 对象或 null
 */
function findPackageSchema(assetsData, componentId) {
    if (!assetsData.packages || !Array.isArray(assetsData.packages)) {
        return null;
    }

    const pkg = assetsData.packages.find(p => p.id === componentId);
    return pkg ? pkg.schema : null;
}

/**
 * 生成原生组件的 componentsMap 配置
 * @param {string} componentName - 组件名称
 * @returns {Object} - 组件配置
 */
function generateNativeComponentConfig(componentName) {
    const baseConfig = {
        package: "@alifd/next",
        version: "1.25.23",
        main: "",
        destructuring: true
    };

    // 根据组件名称生成不同的配置
    if (componentName === 'Form') {
        return {
            ...baseConfig,
            componentName: 'Form',
            exportName: 'Form'
        };
    } else if (componentName === 'Form.Item') {
        return {
            ...baseConfig,
            componentName: 'Form.Item',
            exportName: 'Form',
            subName: 'Item'
        };
    } else if (componentName === 'Input') {
        return {
            ...baseConfig,
            componentName: 'Input',
            exportName: 'Input'
        };
    } else if (componentName === 'Input.Password') {
        return {
            ...baseConfig,
            componentName: 'Input.Password',
            exportName: 'Input',
            subName: 'Password'
        };
    } else if (componentName === 'Form.Submit') {
        return {
            ...baseConfig,
            componentName: 'Form.Submit',
            exportName: 'Form',
            subName: 'Submit'
        };
    } else if (componentName === 'Form.Reset') {
        return {
            ...baseConfig,
            componentName: 'Form.Reset',
            exportName: 'Form',
            subName: 'Reset'
        };
    }

    // 默认配置
    return {
        ...baseConfig,
        componentName: componentName,
        exportName: componentName
    };
}

/**
 * 递归提取所有使用的原生组件名称
 * @param {Array} componentsTree - 组件树
 * @returns {Set} - 使用的组件名称集合
 */
function extractNativeComponents(componentsTree) {
    const nativeComponents = new Set();

    function traverse(node) {
        if (!node) return;

        // 添加当前组件名称（排除 Page 和复合组件）
        if (node.componentName &&
            node.componentName !== 'Page' &&
            node.componentName !== 'Component' &&
            !node.componentName.startsWith('Lc')) {
            nativeComponents.add(node.componentName);
        }

        // 递归遍历子组件
        if (node.children && Array.isArray(node.children)) {
            node.children.forEach(child => traverse(child));
        }
    }

    componentsTree.forEach(node => traverse(node));
    return nativeComponents;
}

/**
 * 主函数
 */
function main() {
    const exampleSchemaPath = path.join(__dirname, 'src', 'plugins', 'plugin-test', 'example-schema.json');
    const assetsJsonPath = path.join(__dirname, 'src', 'services', 'assets.json');

    console.log('========================================');
    console.log('🚀 开始组件替换...');
    console.log('========================================\n');

    try {
        console.log(`📖 正在读取 ${exampleSchemaPath}...`);
        const exampleSchemaData = JSON.parse(fs.readFileSync(exampleSchemaPath, 'utf-8'));

        console.log(`📖 正在读取 ${assetsJsonPath}...`);
        const assetsData = JSON.parse(fs.readFileSync(assetsJsonPath, 'utf-8'));

        // 识别复合组件
        console.log(`🔍 正在识别复合组件...`);
        const compositeComponents = identifyCompositeComponents(exampleSchemaData);
        console.log(`   找到 ${compositeComponents.length} 个复合组件: ${compositeComponents.map(c => c.componentName).join(', ')}`);

        let updatedSchema = { ...exampleSchemaData };
        let replaced = false;

        // 处理每个复合组件
        for (const compositeComp of compositeComponents) {
            const componentName = compositeComp.componentName;
            console.log(`\n🔍 正在处理复合组件: ${componentName}`);

            // 在 assets.json 中查找 componentId
            const componentId = findComponentId(assetsData, componentName);
            if (!componentId) {
                console.log(`   ⚠️  未找到组件 ${componentName} 的 componentId，跳过`);
                continue;
            }
            console.log(`   ✅ 找到 componentId: ${componentId}`);

            // 在 packages 中查找 schema
            const schema = findPackageSchema(assetsData, componentId);
            if (!schema) {
                console.log(`   ⚠️  未找到组件 ${componentName} 的 schema，跳过`);
                continue;
            }
            console.log(`   ✅ 找到 schema`);

            // 替换 Page 的 children
            if (updatedSchema.componentsTree && Array.isArray(updatedSchema.componentsTree)) {
                const pageComponent = updatedSchema.componentsTree.find(
                    comp => comp.componentName === 'Page'
                );

                if (pageComponent) {
                    console.log(`📝 正在替换 Page 的 children...`);

                    // 使用 schema 的内容替换 children
                    // 如果 schema 有 children，使用它；否则使用整个 schema
                    if (schema.children && Array.isArray(schema.children)) {
                        pageComponent.children = schema.children;
                    } else {
                        pageComponent.children = [schema];
                    }

                    replaced = true;
                    console.log(`   ✅ 已替换为 ${componentName} 的内容`);
                }
            }
        }

        if (!replaced) {
            console.log(`\n⚠️  未进行任何替换，保留原有内容`);
        }

        // 识别并添加原生组件依赖
        console.log(`\n🔍 正在识别原生组件依赖...`);
        const nativeComponents = extractNativeComponents(updatedSchema.componentsTree || []);
        console.log(`   找到 ${nativeComponents.size} 个原生组件: ${Array.from(nativeComponents).join(', ')}`);

        // 更新 componentsMap
        console.log(`\n🔧 正在更新 componentsMap...`);
        const componentsMap = [];

        // 添加基础组件
        componentsMap.push({
            devMode: 'lowCode',
            componentName: 'Page'
        });

        // 添加复合组件
        compositeComponents.forEach(comp => {
            componentsMap.push({
                devMode: 'lowCode',
                componentName: comp.componentName
            });
        });

        // 添加原生组件依赖
        nativeComponents.forEach(componentName => {
            const componentConfig = generateNativeComponentConfig(componentName);
            componentsMap.push(componentConfig);
            console.log(`   ✅ 添加组件: ${componentName}`);
        });

        updatedSchema.componentsMap = componentsMap;
        console.log(`   生成了 ${componentsMap.length} 个组件配置`);

        // 写入更新后的文件
        console.log(`\n📝 正在写入 ${exampleSchemaPath}...`);
        fs.writeFileSync(exampleSchemaPath, JSON.stringify(updatedSchema, null, 4), 'utf-8');
        console.log(`✅ 已更新 ${exampleSchemaPath}`);

        // 输出统计信息
        console.log(`\n📊 转换统计:`);
        console.log(`   - 复合组件数量: ${compositeComponents.length}`);
        console.log(`   - 是否替换: ${replaced ? '是' : '否'}`);
        console.log(`   - 原生组件数量: ${nativeComponents.size}`);
        console.log(`   - componentsMap 总数: ${componentsMap.length}`);

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
main();
