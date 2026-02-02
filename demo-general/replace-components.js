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

    // 解析组件名称，判断是否有子组件（如 Button.Group）
    let exportName = componentName;
    let subName = "";

    if (componentName.includes('.')) {
        const parts = componentName.split('.');
        exportName = parts[0];
        subName = parts.slice(1).join('.');
    }

    return {
        ...baseConfig,
        componentName: componentName,
        exportName: exportName,
        subName: subName
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
 * 递归替换所有 Lc 开头的组件为 Component
 * @param {Object} node - 组件节点
 */
function replaceAllLcComponents(node) {
    if (!node) return node;

    // 如果是复合组件（Lc 开头），替换为 Component
    if (node.componentName && node.componentName.startsWith('Lc')) {
        return {
            ...node,
            componentName: 'Component'
        };
    }

    // 递归处理子组件
    if (node.children && Array.isArray(node.children)) {
        return {
            ...node,
            children: node.children.map(child => replaceAllLcComponents(child))
        };
    }

    return node;
}

/**
 * 递归处理整个组件树，替换所有 Lc 开头的组件
 * @param {Array} componentsTree - 组件树
 */
function processComponentsTree(componentsTree) {
    if (!componentsTree || !Array.isArray(componentsTree)) {
        return componentsTree;
    }

    return componentsTree.map(node => replaceAllLcComponents(node));
}

/**
 * 主函数
 */
function main() {
    const exampleSchemaPath = path.join(__dirname, 'src', 'plugins', 'plugin-test', 'example-schema.json');
    const exampleSchemaLowcodePath = path.join(__dirname, 'src', 'plugins', 'plugin-test', 'example-schema-lowcode.json');
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
        let validCompositeComponents = [];
        let allSchemaChildren = [];
        const compositeComponentNames = new Set(compositeComponents.map(c => c.componentName));

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

            // 收集所有 schema 的 children，并立即替换 Lc 开头的组件为 Component
            if (schema.children && Array.isArray(schema.children)) {
                const replacedChildren = schema.children.map(child => replaceAllLcComponents(child));
                allSchemaChildren = allSchemaChildren.concat(replacedChildren);
            } else {
                const replacedSchema = replaceAllLcComponents(schema);
                allSchemaChildren.push(replacedSchema);
            }

            validCompositeComponents.push(compositeComp);
            replaced = true;
            console.log(`   ✅ 已收集 ${componentName} 的内容`);
        }

        // 替换 Page 的 children，将所有 Lc 开头的组件替换为 Component
        if (replaced && updatedSchema.componentsTree && Array.isArray(updatedSchema.componentsTree)) {
            const pageComponent = updatedSchema.componentsTree.find(
                comp => comp.componentName === 'Page'
            );

            if (pageComponent && pageComponent.children && Array.isArray(pageComponent.children)) {
                console.log(`\n📝 正在替换 Page 的 children...`);

                // 处理原有的 children，将所有 Lc 开头的组件替换为 Component
                const processedOriginalChildren = pageComponent.children.map(child => {
                    if (child.componentName && child.componentName.startsWith('Lc')) {
                        console.log(`   🔧 替换原有复合组件: ${child.componentName} -> Component`);
                        return {
                            ...child,
                            componentName: 'Component'
                        };
                    }
                    return child;
                });

                // 合并：替换的复合组件内容（已替换为 Component）+ 处理后的原有 children
                pageComponent.children = [...allSchemaChildren, ...processedOriginalChildren];
                console.log(`   ✅ 已替换为 ${allSchemaChildren.length} 个复合组件内容（已替换为 Component）+ ${processedOriginalChildren.length} 个原有子组件`);
                console.log(`   总计: ${pageComponent.children.length} 个子组件`);
            }
        }

        // 对整个 componentsTree 进行递归处理，确保所有 Lc 开头的组件都被替换为 Component
        console.log(`\n🔧 正在递归处理整个组件树，替换所有 Lc 开头的组件...`);
        updatedSchema.componentsTree = processComponentsTree(updatedSchema.componentsTree || []);
        console.log(`   ✅ 已完成递归替换`);

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

        // 不添加复合组件依赖，只添加原生组件依赖
        nativeComponents.forEach(componentName => {
            const componentConfig = generateNativeComponentConfig(componentName);
            componentsMap.push(componentConfig);
            console.log(`   ✅ 添加组件: ${componentName}`);
        });

        updatedSchema.componentsMap = componentsMap;
        console.log(`   生成了 ${componentsMap.length} 个组件配置`);

        // 写入更新后的文件到 example-schema-lowcode.json
        console.log(`\n📝 正在写入 ${exampleSchemaLowcodePath}...`);
        fs.writeFileSync(exampleSchemaLowcodePath, JSON.stringify(updatedSchema, null, 4), 'utf-8');
        console.log(`✅ 已更新 ${exampleSchemaLowcodePath}`);

        // 输出统计信息
        console.log(`\n📊 转换统计:`);
        console.log(`   - 复合组件数量: ${compositeComponents.length}`);
        console.log(`   - 有效复合组件: ${validCompositeComponents.length}`);
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
