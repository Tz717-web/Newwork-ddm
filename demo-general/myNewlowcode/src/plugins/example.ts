import {
  ICodeStruct,
  BuilderComponentPlugin,
  BuilderComponentPluginFactory,
  FileType,
  ChunkType,
  IContainerInfo,
  COMMON_CHUNK_NAME,
  CLASS_DEFINE_CHUNK_NAME,
  DEFAULT_LINK_AFTER,
} from '@alilc/lowcode-code-generator';

export interface PluginConfig {
  fileType: string;
}

const pluginFactory: BuilderComponentPluginFactory<PluginConfig> = (
  config?
) => {
  const cfg: PluginConfig = {
    fileType: FileType.JSX,
    ...config,
  };

  const plugin: BuilderComponentPlugin = async (pre: ICodeStruct) => {
    const next: ICodeStruct = {
      ...pre,
    };

    const ir = next.ir as IContainerInfo & {
      methodsModule?: {
        type?: 'JSModule';
        source?: string;
      };
    };

    if (ir.methodsModule?.type !== 'JSModule' || !ir.methodsModule?.source) {
      return next;
    }

    // 创建 methods.jsx
    next.chunks.push({
      type: ChunkType.STRING,
      subModule: 'methods',
      fileType: cfg.fileType,
      name: COMMON_CHUNK_NAME.CustomContent,
      content: ir.methodsModule.source,
      linkAfter: [],
    });

    // 引入对应的模块
    next.chunks.push({
      type: ChunkType.STRING,
      fileType: cfg.fileType,
      name: COMMON_CHUNK_NAME.InternalDepsImport,
      content: "import __$$methodsModule from './methods';",
      linkAfter: [...DEFAULT_LINK_AFTER[COMMON_CHUNK_NAME.InternalDepsImport]],
    });

    // 将导出的东东都放到 class 上实例方法部分
    next.chunks.push({
      type: ChunkType.STRING,
      fileType: cfg.fileType,
      name: CLASS_DEFINE_CHUNK_NAME.ConstructorContent,
      content: 'Object.assign(this, __$$methodsModule);',
      linkAfter: [
        ...DEFAULT_LINK_AFTER[CLASS_DEFINE_CHUNK_NAME.ConstructorContent],
      ],
    });

    return next;
  };

  return plugin;
};

export default pluginFactory;
