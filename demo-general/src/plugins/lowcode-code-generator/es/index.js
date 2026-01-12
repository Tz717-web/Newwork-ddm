var __defProp = Object.defineProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw new Error('Dynamic require of "' + x + '" is not supported');
});
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/parser/SchemaParser.ts
import changeCase2 from "change-case";

// src/types/core.ts
var FileType = /* @__PURE__ */ ((FileType2) => {
  FileType2["CSS"] = "css";
  FileType2["SCSS"] = "scss";
  FileType2["LESS"] = "less";
  FileType2["HTML"] = "html";
  FileType2["JS"] = "js";
  FileType2["MJS"] = "mjs";
  FileType2["JSX"] = "jsx";
  FileType2["TS"] = "ts";
  FileType2["MTS"] = "mts";
  FileType2["TSX"] = "tsx";
  FileType2["JSON"] = "json";
  FileType2["MD"] = "md";
  return FileType2;
})(FileType || {});
var ChunkType = /* @__PURE__ */ ((ChunkType2) => {
  ChunkType2["AST"] = "ast";
  ChunkType2["STRING"] = "string";
  ChunkType2["JSON"] = "json";
  return ChunkType2;
})(ChunkType || {});
var PluginType = /* @__PURE__ */ ((PluginType2) => {
  PluginType2["COMPONENT"] = "component";
  PluginType2["UTILS"] = "utils";
  PluginType2["I18N"] = "i18n";
  return PluginType2;
})(PluginType || {});

// src/types/deps.ts
var InternalDependencyType = /* @__PURE__ */ ((InternalDependencyType2) => {
  InternalDependencyType2["PAGE"] = "pages";
  InternalDependencyType2["BLOCK"] = "components";
  InternalDependencyType2["COMPONENT"] = "components";
  InternalDependencyType2["UTILS"] = "utils";
  return InternalDependencyType2;
})(InternalDependencyType || {});
var DependencyType = /* @__PURE__ */ ((DependencyType2) => {
  DependencyType2["External"] = "External";
  DependencyType2["Internal"] = "Internal";
  return DependencyType2;
})(DependencyType || {});

// src/types/error.ts
var CodeGeneratorError = class extends Error {
  constructor(message, detail) {
    super(message);
    this.name = this.constructor.name;
    this.detail = detail;
    Object.setPrototypeOf(this, new.target.prototype);
  }
};
var ComponentValidationError = class extends CodeGeneratorError {
};
var CompatibilityError = class extends CodeGeneratorError {
};
var PublisherError = class extends CodeGeneratorError {
};

// src/types/jsx.ts
var PIECE_TYPE = /* @__PURE__ */ ((PIECE_TYPE2) => {
  PIECE_TYPE2["BEFORE"] = "NodeCodePieceBefore";
  PIECE_TYPE2["TAG"] = "NodeCodePieceTag";
  PIECE_TYPE2["ATTR"] = "NodeCodePieceAttr";
  PIECE_TYPE2["CHILDREN"] = "NodeCodePieceChildren";
  PIECE_TYPE2["AFTER"] = "NodeCodePieceAfter";
  return PIECE_TYPE2;
})(PIECE_TYPE || {});

// src/const/index.ts
var const_exports = {};
__export(const_exports, {
  BUILTIN_SLOT_NAMES: () => BUILTIN_SLOT_NAMES,
  CLASS_DEFINE_CHUNK_NAME: () => CLASS_DEFINE_CHUNK_NAME,
  COMMON_CHUNK_NAME: () => COMMON_CHUNK_NAME,
  COMMON_SUB_MODULE_NAME: () => COMMON_SUB_MODULE_NAME,
  CONTAINER_TYPE: () => CONTAINER_TYPE,
  DEFAULT_LINK_AFTER: () => DEFAULT_LINK_AFTER,
  FILE_TYPE_FAMILY: () => FILE_TYPE_FAMILY,
  NATIVE_ELE_PKG: () => NATIVE_ELE_PKG,
  SUPPORT_SCHEMA_VERSION_LIST: () => SUPPORT_SCHEMA_VERSION_LIST,
  isBuiltinSlotName: () => isBuiltinSlotName
});

// src/const/file.ts
var FILE_TYPE_FAMILY = [["tsx" /* TSX */, "ts" /* TS */, "jsx" /* JSX */, "js" /* JS */]];

// src/const/generator.ts
var COMMON_CHUNK_NAME = {
  ExternalDepsImport: "CommonExternalDependencyImport",
  InternalDepsImport: "CommonInternalDependencyImport",
  ImportAliasDefine: "CommonImportAliasDefine",
  FileVarDefine: "CommonFileScopeVarDefine",
  FileUtilDefine: "CommonFileScopeMethodDefine",
  FileMainContent: "CommonFileMainContent",
  FileExport: "CommonFileExport",
  StyleDepsImport: "CommonStyleDepsImport",
  StyleCssContent: "CommonStyleCssContent",
  HtmlContent: "CommonHtmlContent",
  CustomContent: "CommonCustomContent"
};
var CLASS_DEFINE_CHUNK_NAME = {
  Start: "CommonClassDefineStart",
  ConstructorStart: "CommonClassDefineConstructorStart",
  ConstructorContent: "CommonClassDefineConstructorContent",
  ConstructorEnd: "CommonClassDefineConstructorEnd",
  StaticVar: "CommonClassDefineStaticVar",
  StaticMethod: "CommonClassDefineStaticMethod",
  InsVar: "CommonClassDefineInsVar",
  InsVarMethod: "CommonClassDefineInsVarMethod",
  InsMethod: "CommonClassDefineInsMethod",
  InsPrivateMethod: "CommonClassDefineInsPrivateMethod",
  End: "CommonClassDefineEnd"
};
var DEFAULT_LINK_AFTER = {
  [COMMON_CHUNK_NAME.ExternalDepsImport]: [],
  [COMMON_CHUNK_NAME.InternalDepsImport]: [COMMON_CHUNK_NAME.ExternalDepsImport],
  [COMMON_CHUNK_NAME.ImportAliasDefine]: [
    COMMON_CHUNK_NAME.ExternalDepsImport,
    COMMON_CHUNK_NAME.InternalDepsImport
  ],
  [COMMON_CHUNK_NAME.FileVarDefine]: [
    COMMON_CHUNK_NAME.ExternalDepsImport,
    COMMON_CHUNK_NAME.InternalDepsImport,
    COMMON_CHUNK_NAME.ImportAliasDefine
  ],
  [COMMON_CHUNK_NAME.FileUtilDefine]: [
    COMMON_CHUNK_NAME.ExternalDepsImport,
    COMMON_CHUNK_NAME.InternalDepsImport,
    COMMON_CHUNK_NAME.ImportAliasDefine,
    COMMON_CHUNK_NAME.FileVarDefine
  ],
  [CLASS_DEFINE_CHUNK_NAME.Start]: [
    COMMON_CHUNK_NAME.ExternalDepsImport,
    COMMON_CHUNK_NAME.InternalDepsImport,
    COMMON_CHUNK_NAME.ImportAliasDefine,
    COMMON_CHUNK_NAME.FileVarDefine,
    COMMON_CHUNK_NAME.FileUtilDefine
  ],
  [CLASS_DEFINE_CHUNK_NAME.ConstructorStart]: [
    CLASS_DEFINE_CHUNK_NAME.Start,
    CLASS_DEFINE_CHUNK_NAME.StaticVar,
    CLASS_DEFINE_CHUNK_NAME.StaticMethod,
    CLASS_DEFINE_CHUNK_NAME.InsVar,
    CLASS_DEFINE_CHUNK_NAME.InsVarMethod
  ],
  [CLASS_DEFINE_CHUNK_NAME.ConstructorContent]: [CLASS_DEFINE_CHUNK_NAME.ConstructorStart],
  [CLASS_DEFINE_CHUNK_NAME.ConstructorEnd]: [
    CLASS_DEFINE_CHUNK_NAME.ConstructorStart,
    CLASS_DEFINE_CHUNK_NAME.ConstructorContent
  ],
  [CLASS_DEFINE_CHUNK_NAME.StaticVar]: [CLASS_DEFINE_CHUNK_NAME.Start],
  [CLASS_DEFINE_CHUNK_NAME.StaticMethod]: [
    CLASS_DEFINE_CHUNK_NAME.Start,
    CLASS_DEFINE_CHUNK_NAME.StaticVar
  ],
  [CLASS_DEFINE_CHUNK_NAME.InsVar]: [
    CLASS_DEFINE_CHUNK_NAME.Start,
    CLASS_DEFINE_CHUNK_NAME.StaticVar,
    CLASS_DEFINE_CHUNK_NAME.StaticMethod
  ],
  [CLASS_DEFINE_CHUNK_NAME.InsVarMethod]: [
    CLASS_DEFINE_CHUNK_NAME.Start,
    CLASS_DEFINE_CHUNK_NAME.StaticVar,
    CLASS_DEFINE_CHUNK_NAME.StaticMethod,
    CLASS_DEFINE_CHUNK_NAME.InsVar
  ],
  [CLASS_DEFINE_CHUNK_NAME.InsMethod]: [
    CLASS_DEFINE_CHUNK_NAME.Start,
    CLASS_DEFINE_CHUNK_NAME.StaticVar,
    CLASS_DEFINE_CHUNK_NAME.StaticMethod,
    CLASS_DEFINE_CHUNK_NAME.InsVar,
    CLASS_DEFINE_CHUNK_NAME.InsVarMethod,
    CLASS_DEFINE_CHUNK_NAME.ConstructorEnd
  ],
  [CLASS_DEFINE_CHUNK_NAME.InsPrivateMethod]: [
    CLASS_DEFINE_CHUNK_NAME.Start,
    CLASS_DEFINE_CHUNK_NAME.StaticVar,
    CLASS_DEFINE_CHUNK_NAME.StaticMethod,
    CLASS_DEFINE_CHUNK_NAME.InsVar,
    CLASS_DEFINE_CHUNK_NAME.InsVarMethod,
    CLASS_DEFINE_CHUNK_NAME.InsMethod,
    CLASS_DEFINE_CHUNK_NAME.ConstructorEnd
  ],
  [CLASS_DEFINE_CHUNK_NAME.End]: [
    CLASS_DEFINE_CHUNK_NAME.Start,
    CLASS_DEFINE_CHUNK_NAME.StaticVar,
    CLASS_DEFINE_CHUNK_NAME.StaticMethod,
    CLASS_DEFINE_CHUNK_NAME.InsVar,
    CLASS_DEFINE_CHUNK_NAME.InsVarMethod,
    CLASS_DEFINE_CHUNK_NAME.InsMethod,
    CLASS_DEFINE_CHUNK_NAME.InsPrivateMethod,
    CLASS_DEFINE_CHUNK_NAME.ConstructorEnd
  ],
  [COMMON_CHUNK_NAME.FileMainContent]: [
    COMMON_CHUNK_NAME.ExternalDepsImport,
    COMMON_CHUNK_NAME.InternalDepsImport,
    COMMON_CHUNK_NAME.ImportAliasDefine,
    COMMON_CHUNK_NAME.FileVarDefine,
    COMMON_CHUNK_NAME.FileUtilDefine,
    CLASS_DEFINE_CHUNK_NAME.End
  ],
  [COMMON_CHUNK_NAME.FileExport]: [
    COMMON_CHUNK_NAME.ExternalDepsImport,
    COMMON_CHUNK_NAME.InternalDepsImport,
    COMMON_CHUNK_NAME.ImportAliasDefine,
    COMMON_CHUNK_NAME.FileVarDefine,
    COMMON_CHUNK_NAME.FileUtilDefine,
    CLASS_DEFINE_CHUNK_NAME.End,
    COMMON_CHUNK_NAME.FileMainContent
  ],
  [COMMON_CHUNK_NAME.StyleDepsImport]: [],
  [COMMON_CHUNK_NAME.StyleCssContent]: [COMMON_CHUNK_NAME.StyleDepsImport],
  [COMMON_CHUNK_NAME.HtmlContent]: []
};
var COMMON_SUB_MODULE_NAME = "index";

// src/const/index.ts
var NATIVE_ELE_PKG = "native";
var CONTAINER_TYPE = {
  COMPONENT: "Component",
  BLOCK: "Block",
  PAGE: "Page"
};
var SUPPORT_SCHEMA_VERSION_LIST = ["0.0.1", "1.0.0"];
var BUILTIN_SLOT_NAMES = [
  "pages",
  "components",
  "router",
  "entry",
  "appConfig",
  "buildConfig",
  "constants",
  "utils",
  "i18n",
  "globalStyle",
  "htmlEntry",
  "packageJSON",
  "demo"
];
var isBuiltinSlotName = function(name) {
  return BUILTIN_SLOT_NAMES.includes(name);
};

// src/utils/errors.ts
function getErrorMessage(error) {
  if (!error) {
    return null;
  }
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === "string") {
    return error;
  }
  if (typeof error === "object" && error !== null) {
    return getErrorMessage(error.message) || getErrorMessage(error.errorMessage) || getErrorMessage(error.detail);
  }
  return null;
}

// src/utils/schema.ts
var schema_exports = {};
__export(schema_exports, {
  ContainerType: () => ContainerType,
  handleSubNodes: () => handleSubNodes,
  isContainerSchema: () => isContainerSchema,
  isNpmInfo: () => isNpmInfo,
  isValidContainerType: () => isValidContainerType
});
import * as _ from "lodash";
import {
  isJSExpression,
  isJSSlot,
  isDOMText,
  isNodeSchema,
  isJSFunction
} from "@alilc/lowcode-types";

// src/utils/common.ts
var common_exports = {};
__export(common_exports, {
  camel2dash: () => camel2dash,
  camelize: () => camelize,
  generateID: () => generateID,
  getStaticExprValue: () => getStaticExprValue,
  isExternalDependency: () => isExternalDependency,
  isInternalDependency: () => isInternalDependency,
  isJSExpressionFn: () => isJSExpressionFn,
  uniqueArray: () => uniqueArray,
  upperCaseFirst: () => upperCaseFirst
});
import changeCase from "change-case";
import short from "short-uuid";
function camel2dash(input) {
  return changeCase.paramCase(input);
}
function camelize(str) {
  return changeCase.camelCase(str);
}
function generateID() {
  return short.generate();
}
function upperCaseFirst(inputValue) {
  return changeCase.upperCaseFirst(inputValue);
}
function uniqueArray(arr, by) {
  const map = {};
  arr.forEach((item) => {
    map[by(item)] = item;
  });
  const uniqueKeys = Array.from(new Set(Object.keys(map)));
  const uniqueItems = uniqueKeys.map((key) => map[key]);
  return uniqueItems;
}
function getStaticExprValue(expr) {
  return Function(`"use strict";return (${expr})`)();
}
function isJSExpressionFn(data) {
  return (data == null ? void 0 : data.type) === "JSExpression" && (data == null ? void 0 : data.extType) === "function";
}
function isInternalDependency(dependency) {
  return dependency.dependencyType === "Internal" /* Internal */;
}
function isExternalDependency(dependency) {
  return dependency.dependencyType === "External" /* External */;
}

// src/utils/schema.ts
function isContainerSchema(x) {
  return typeof x === "object" && x && typeof x.componentName === "string" && typeof x.fileName === "string";
}
function isNpmInfo(x) {
  return typeof x === "object" && x && typeof x.package === "string";
}
var noop = () => void 0;
var handleChildrenDefaultOptions = {
  rerun: false
};
var DEFAULT_MAX_DEPTH = 1e5;
function handleSubNodes(children, handlers, options) {
  var _a;
  const opt = {
    ...handleChildrenDefaultOptions,
    ...options || {}
  };
  const maxDepth = (_a = opt.maxDepth) != null ? _a : DEFAULT_MAX_DEPTH;
  if (maxDepth <= 0) {
    throw new Error("handleSubNodes maxDepth reached");
  }
  if (Array.isArray(children)) {
    const list = children;
    return list.map((child) => handleSubNodes(child, handlers, { ...opt, maxDepth: maxDepth - 1 })).reduce((p, c) => p.concat(c), []);
  }
  let result;
  const childrenRes = [];
  if (children === null || children === void 0) {
    return [];
  } else if (isDOMText(children)) {
    const handler = handlers.string || noop;
    result = handler(children);
  } else if (isJSExpression(children)) {
    const handler = handlers.expression || noop;
    result = handler(children);
  } else if (isJSSlot(children)) {
    return handleSubNodes(children.value, handlers, { ...opt, maxDepth: maxDepth - 1 });
  } else if (isNodeSchema(children)) {
    const handler = handlers.node || noop;
    const child = children;
    result = handler(child);
    if (child.children) {
      const childRes = handleSubNodes(child.children, handlers, opt);
      childrenRes.push(...childRes);
    }
    if (child.props) {
      if (Array.isArray(child.props)) {
        child.props.forEach(({ value }) => {
          const childRes = handleCompositeValueInProps(value);
          childrenRes.push(...childRes);
        });
      } else {
        Object.values(child.props).forEach((value) => {
          const childRes = handleCompositeValueInProps(value);
          childrenRes.push(...childRes);
        });
      }
    }
  } else {
    throw new CodeGeneratorError("handleSubNodes got invalid NodeData", children);
  }
  if (result !== void 0) {
    childrenRes.unshift(result);
  }
  return childrenRes;
  function handleCompositeValueInProps(value) {
    if (isJSSlot(value)) {
      return handleSubNodes(value.value, handlers, { ...opt, maxDepth: maxDepth - 1 });
    }
    if (Array.isArray(value)) {
      return _.flatMap(value, (v) => handleCompositeValueInProps(v));
    }
    if (!isJSExpression(value) && !isJSExpressionFn(value) && !isJSFunction(value) && typeof value === "object" && value !== null) {
      return _.flatMap(Object.values(value), (v) => handleCompositeValueInProps(v));
    }
    return [];
  }
}
function isValidContainerType(schema) {
  return [
    "Page",
    "Component",
    "Block"
  ].includes(schema.componentName);
}
var ContainerType = /* @__PURE__ */ ((ContainerType2) => {
  ContainerType2["Page"] = "Page";
  ContainerType2["Component"] = "Component";
  ContainerType2["Block"] = "Block";
  return ContainerType2;
})(ContainerType || {});

// src/analyzer/componentAnalyzer.ts
var componentAnalyzer = (container) => {
  let hasRefAttr = false;
  const nodeValidator = (n) => {
    if (n.props) {
      const props = n.props;
      if (props.ref) {
        hasRefAttr = true;
      }
    }
  };
  nodeValidator(container);
  if (!hasRefAttr && container.children) {
    handleSubNodes(
      container.children,
      {
        node: nodeValidator
      },
      {
        rerun: true
      }
    );
  }
  return {
    isUsingRef: hasRefAttr
  };
};

// src/utils/validate.ts
var validate_exports = {};
__export(validate_exports, {
  ensureValidClassName: () => ensureValidClassName,
  isValidComponentName: () => isValidComponentName,
  isValidIdentifier: () => isValidIdentifier
});
var isValidIdentifier = (name) => {
  return /^[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*$/.test(name);
};
var isValidComponentName = (name) => {
  return /^[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF.]*$/.test(name);
};
var ensureValidClassName = (name) => {
  if (!isValidIdentifier(name)) {
    return `$${name.replace(/[^_$a-zA-Z0-9]/g, "")}`;
  }
  return name;
};

// src/parser/SchemaParser.ts
var defaultContainer = {
  containerType: "Component",
  componentName: "Component",
  moduleName: "Index",
  fileName: "Index",
  css: "",
  props: {}
};
function getRootComponentName(typeName, maps) {
  if (maps[typeName]) {
    const rec = maps[typeName];
    if (rec.destructuring) {
      return rec.componentName || typeName;
    }
    const peerName = Object.keys(maps).find((depName) => {
      const depInfo = maps[depName];
      return depName !== typeName && !depInfo.destructuring && depInfo.package === rec.package && depInfo.version === rec.version && depInfo.main === rec.main && depInfo.exportName === rec.exportName && depInfo.subName === rec.subName;
    });
    return peerName || typeName;
  }
  return typeName;
}
function processChildren(schema) {
  if (schema.props) {
    if (Array.isArray(schema.props)) {
    } else {
      const nodeProps = schema.props;
      if (nodeProps.children) {
        if (!schema.children) {
          schema.children = nodeProps.children;
        } else {
          let _children = [];
          if (Array.isArray(schema.children)) {
            _children = _children.concat(schema.children);
          } else {
            _children.push(schema.children);
          }
          if (Array.isArray(nodeProps.children)) {
            _children = _children.concat(nodeProps.children);
          } else {
            _children.push(nodeProps.children);
          }
          schema.children = _children;
        }
        delete nodeProps.children;
      }
    }
  }
}
function getInternalDep(internalDeps, depName) {
  const dep = internalDeps[depName];
  return dep && dep.type !== "pages" /* PAGE */ ? dep : null;
}
var SchemaParser = class {
  validate(schema) {
    if (SUPPORT_SCHEMA_VERSION_LIST.indexOf(schema.version) < 0) {
      throw new CompatibilityError(`Not support schema with version [${schema.version}]`);
    }
    return true;
  }
  parse(schemaSrc) {
    const compDeps = {};
    const internalDeps = {};
    let utilsDeps = [];
    const schema = this.decodeSchema(schemaSrc);
    schema.componentsMap.forEach((info) => {
      var _a, _b;
      if (info.componentName) {
        compDeps[info.componentName] = {
          ...info,
          dependencyType: "External" /* External */,
          componentName: info.componentName,
          exportName: (_a = info.exportName) != null ? _a : info.componentName,
          version: info.version || "*",
          destructuring: (_b = info.destructuring) != null ? _b : false
        };
      }
    });
    let containers;
    if (schema.componentsTree.length > 0) {
      const firstRoot = schema.componentsTree[0];
      if (!firstRoot.fileName && !isValidContainerType(firstRoot)) {
        const container = {
          ...firstRoot,
          ...defaultContainer,
          props: firstRoot.props || defaultContainer.props,
          css: firstRoot.css || defaultContainer.css,
          moduleName: firstRoot.moduleName || defaultContainer.moduleName,
          children: schema.componentsTree
        };
        containers = [container];
      } else {
        containers = schema.componentsTree.map((n) => {
          const subRoot = n;
          const container = {
            ...subRoot,
            componentName: getRootComponentName(subRoot.componentName, compDeps),
            containerType: subRoot.componentName,
            moduleName: ensureValidClassName(subRoot.componentName === "Component" /* Component */ ? subRoot.fileName : changeCase2.pascalCase(subRoot.fileName))
          };
          return container;
        });
      }
    } else {
      throw new CodeGeneratorError("Can't find anything to generate.");
    }
    containers = containers.map((con) => ({
      ...con,
      analyzeResult: componentAnalyzer(con)
    }));
    containers.forEach((container) => {
      let type;
      switch (container.containerType) {
        case "Page":
          type = "pages" /* PAGE */;
          break;
        case "Block":
          type = "components" /* BLOCK */;
          break;
        default:
          type = "components" /* COMPONENT */;
          break;
      }
      const dep = {
        type,
        moduleName: container.moduleName,
        destructuring: false,
        exportName: container.moduleName,
        dependencyType: "Internal" /* Internal */
      };
      internalDeps[dep.moduleName] = dep;
    });
    const containersDeps = [].concat(...containers.map((c) => c.deps || []));
    containers.forEach((container) => {
      if (container.children) {
        handleSubNodes(
          container.children,
          {
            node: (i) => processChildren(i)
          },
          {
            rerun: true
          }
        );
      }
    });
    containers.forEach((container) => {
      const depNames = this.getComponentNames(container);
      container.deps = uniqueArray(depNames, (i) => i).map((depName) => getInternalDep(internalDeps, depName) || compDeps[depName]).filter(Boolean);
    });
    const routes = containers.filter((container) => container.containerType === "Page").map((page) => {
      const { meta } = page;
      if (meta) {
        return {
          path: meta.router || `/${page.fileName}`,
          fileName: page.fileName,
          componentName: page.moduleName
        };
      }
      return {
        path: "",
        fileName: page.fileName,
        componentName: page.moduleName
      };
    });
    const routerDeps = routes.map((r) => internalDeps[r.componentName] || compDeps[r.componentName]).filter((dep) => !!dep);
    let utils;
    if (schema.utils) {
      utils = schema.utils;
      utilsDeps = schema.utils.filter(
        (u) => u.type !== "function"
      ).map(
        (u) => {
          var _a, _b;
          return {
            ...u.content,
            componentName: u.name,
            version: u.content.version || "*",
            destructuring: (_a = u.content.destructuring) != null ? _a : false,
            exportName: (_b = u.content.exportName) != null ? _b : u.name
          };
        }
      );
    } else {
      utils = [];
    }
    let npms = [];
    containers.forEach((con) => {
      const p = (con.deps || []).map((dep) => {
        return dep.dependencyType === "External" /* External */ ? dep : null;
      }).filter((dep) => dep !== null);
      const npmInfos = p.filter(Boolean).map((i) => ({
        package: i.package,
        version: i.version
      }));
      npms.push(...npmInfos);
    });
    npms.push(
      ...utilsDeps.map((utilsDep) => ({
        package: utilsDep.package,
        version: utilsDep.version
      }))
    );
    npms = uniqueArray(npms, (i) => i.package).filter(Boolean);
    return {
      containers,
      globalUtils: {
        utils,
        deps: utilsDeps
      },
      globalI18n: schema.i18n,
      globalRouter: {
        routes,
        deps: routerDeps
      },
      project: {
        css: schema.css,
        constants: schema.constants,
        config: schema.config || {},
        meta: schema.meta || {},
        i18n: schema.i18n,
        containersDeps,
        utilsDeps,
        packages: npms || [],
        dataSourcesTypes: this.collectDataSourcesTypes(schema),
        projectRemark: this.getProjectRemark(containers)
      }
    };
  }
  getProjectRemark(containers) {
    return {
      isSingleComponent: containers.length === 1 && containers[0].containerType === "Component"
    };
  }
  getComponentNames(children) {
    return handleSubNodes(
      children,
      {
        node: (i) => i.componentName
      },
      {
        rerun: true
      }
    );
  }
  decodeSchema(schemaSrc) {
    let schema;
    if (typeof schemaSrc === "string") {
      try {
        schema = JSON.parse(schemaSrc);
      } catch (error) {
        throw new CodeGeneratorError(
          `Parse schema failed: ${getErrorMessage(error) || "unknown reason"}`
        );
      }
    } else {
      schema = schemaSrc;
    }
    return schema;
  }
  collectDataSourcesTypes(schema) {
    var _a, _b;
    const dataSourcesTypes = /* @__PURE__ */ new Set();
    const defaultDataSourceType = "fetch";
    (_b = (_a = schema.dataSource) == null ? void 0 : _a.list) == null ? void 0 : _b.forEach((ds) => {
      dataSourcesTypes.add(ds.type || defaultDataSourceType);
    });
    schema.componentsTree.forEach((rootNode) => {
      var _a2, _b2;
      (_b2 = (_a2 = rootNode.dataSource) == null ? void 0 : _a2.list) == null ? void 0 : _b2.forEach((ds) => {
        dataSourcesTypes.add(ds.type || defaultDataSourceType);
      });
    });
    return Array.from(dataSourcesTypes.values());
  }
};

// src/utils/resultHelper.ts
var resultHelper_exports = {};
__export(resultHelper_exports, {
  addDirectory: () => addDirectory,
  addFile: () => addFile,
  createResultDir: () => createResultDir,
  createResultFile: () => createResultFile,
  findDir: () => findDir,
  findFile: () => findFile,
  flattenResult: () => flattenResult,
  getFileNameWithExt: () => getFileNameWithExt,
  globDirs: () => globDirs,
  globFiles: () => globFiles,
  removeDirsFromResult: () => removeDirsFromResult,
  removeFilesFromResult: () => removeFilesFromResult,
  scanDirs: () => scanDirs,
  scanFiles: () => scanFiles
});
import nm from "nanomatch";
function createResultFile(name, ext = "jsx", content = "") {
  return {
    name,
    ext,
    content
  };
}
function createResultDir(name) {
  return {
    name,
    dirs: [],
    files: []
  };
}
function addDirectory(target, dir) {
  if (target.dirs.findIndex((d) => d.name === dir.name) < 0) {
    target.dirs.push(dir);
  } else {
    throw new CodeGeneratorError(
      `Adding same directory to one directory: ${dir.name} -> ${target.name}`
    );
  }
}
function addFile(target, file2) {
  if (target.files.findIndex((f) => f.name === file2.name && f.ext === file2.ext) < 0) {
    target.files.push(file2);
  } else {
    throw new CodeGeneratorError(
      `Adding same file to one directory: ${file2.name} -> ${target.name}`
    );
  }
}
function flattenResult(dir, cwd = "") {
  if (!dir.files.length && !dir.dirs.length) {
    return [];
  }
  return [
    ...dir.files.map(
      (file2) => ({
        pathName: joinPath(cwd, `${file2.name}${file2.ext ? `.${file2.ext}` : ""}`),
        content: file2.content
      })
    )
  ].concat(...dir.dirs.map((subDir) => flattenResult(subDir, joinPath(cwd, subDir.name))));
}
function findFile(result, fileGlobExpr, options = {}, resultDirPath = getResultNameOrDefault(result, "")) {
  const maxDepth = !/\/|\*\*/.test(fileGlobExpr) ? 1 : void 0;
  const files = scanFiles(result, resultDirPath, maxDepth);
  for (let [filePath, file2] of files) {
    if (nm.isMatch(filePath, fileGlobExpr, options)) {
      return file2;
    }
  }
  return null;
}
function* globFiles(result, fileGlobExpr, options = {}, resultDirPath = getResultNameOrDefault(result, "")) {
  const files = scanFiles(result, resultDirPath);
  for (let [filePath, file2] of files) {
    if (nm.isMatch(filePath, fileGlobExpr, options)) {
      yield [filePath, file2];
    }
  }
}
function* scanFiles(result, resultDirPath = getResultNameOrDefault(result, ""), maxDepth = 1e4) {
  for (let file2 of result.files) {
    const fileName = getFileNameWithExt(file2);
    yield [joinPath(resultDirPath, fileName), file2];
  }
  for (let subDir of result.dirs) {
    yield* scanFiles(subDir, joinPath(resultDirPath, subDir.name), maxDepth - 1);
  }
}
function getFileNameWithExt(file2) {
  return `${file2.name}${file2.ext ? `.${file2.ext}` : ""}`;
}
function getResultNameOrDefault(result, defaultDir = "/") {
  return result.name && result.name !== "." ? result.name : defaultDir;
}
function joinPath(...pathParts) {
  return pathParts.filter((x) => x !== "" && x !== ".").join("/").replace(/\\+/g, "/").replace(/\/+/g, "/");
}
function* scanDirs(result, resultDirPath = getResultNameOrDefault(result, ""), maxDepth = 1e4) {
  yield [resultDirPath, result];
  for (let subDir of result.dirs) {
    yield* scanDirs(subDir, joinPath(resultDirPath, subDir.name), maxDepth - 1);
  }
}
function* globDirs(result, dirGlobExpr, options = {}, resultDirPath = getResultNameOrDefault(result, "")) {
  const dirs = scanDirs(result, resultDirPath);
  for (let [dirPath, dir] of dirs) {
    if (nm.isMatch(dirPath, dirGlobExpr, options)) {
      yield [dirPath, dir];
    }
  }
}
function findDir(result, dirGlobExpr, options = {}, resultDirPath = getResultNameOrDefault(result, "")) {
  const dirs = scanDirs(result, resultDirPath);
  for (let [dirPath, dir] of dirs) {
    if (nm.isMatch(dirPath, dirGlobExpr, options)) {
      return dir;
    }
  }
  return null;
}
function removeFilesFromResult(result, filePathGlobExpr, globOptions = {}) {
  let removedCount = 0;
  const [dirPath, fileName] = splitPath(filePathGlobExpr);
  const dirs = dirPath ? globDirs(result, dirPath) : [["", result]];
  for (let [, dir] of dirs) {
    const files = globFiles(dir, fileName, globOptions, ".");
    for (let [, file2] of files) {
      dir.files.splice(dir.files.indexOf(file2), 1);
      removedCount += 1;
    }
  }
  return removedCount;
}
function removeDirsFromResult(result, dirPathGlobExpr, globOptions = {}) {
  let removedCount = 0;
  const [dirPath, fileName] = splitPath(dirPathGlobExpr);
  const dirs = dirPath ? globDirs(result, dirPath) : [["", result]];
  for (let [, dir] of dirs) {
    const foundDirs = globDirs(dir, fileName, globOptions, ".");
    for (let [, foundDir] of foundDirs) {
      dir.dirs.splice(dir.dirs.indexOf(foundDir), 1);
      removedCount += 1;
    }
  }
  return removedCount;
}
function splitPath(filePath) {
  const parts = filePath.split("/");
  const fileName = parts.pop() || "";
  return [joinPath(...parts), fileName];
}

// src/generator/ChunkBuilder.ts
function whichFamily(type) {
  const idx = FILE_TYPE_FAMILY.findIndex((family) => family.indexOf(type) >= 0);
  if (idx < 0) {
    return void 0;
  }
  return [idx, FILE_TYPE_FAMILY[idx]];
}
var groupChunks = (chunks) => {
  const tmp = {};
  const col = chunks.reduce((chunksSet, chunk) => {
    const fileKey = chunk.subModule || COMMON_SUB_MODULE_NAME;
    if (!chunksSet[fileKey]) {
      chunksSet[fileKey] = [];
    }
    const res = whichFamily(chunk.fileType);
    const info = {
      chunk
    };
    if (res) {
      const [familyIdx, family] = res;
      const rank = family.indexOf(chunk.fileType);
      if (tmp[fileKey]) {
        if (tmp[fileKey][familyIdx] !== void 0) {
          if (tmp[fileKey][familyIdx] > rank) {
            tmp[fileKey][familyIdx] = rank;
          }
        } else {
          tmp[fileKey][familyIdx] = rank;
        }
      } else {
        tmp[fileKey] = {};
        tmp[fileKey][familyIdx] = rank;
      }
      info.familyIdx = familyIdx;
    }
    chunksSet[fileKey].push(info);
    return chunksSet;
  }, {});
  const result = [];
  Object.keys(col).forEach((key) => {
    const byType = {};
    col[key].forEach((info) => {
      let t3 = info.chunk.fileType;
      if (info.familyIdx !== void 0) {
        t3 = FILE_TYPE_FAMILY[info.familyIdx][tmp[key][info.familyIdx]];
        info.chunk.fileType = t3;
      }
      if (!byType[t3]) {
        byType[t3] = [];
      }
      byType[t3].push(info.chunk);
    });
    result.push(...Object.keys(byType).map((t3) => byType[t3]));
  });
  return result;
};
var ChunkBuilder = class {
  constructor(plugins4 = []) {
    this.plugins = plugins4;
  }
  async run(ir, initialStructure = {
    ir,
    chunks: [],
    depNames: [],
    contextData: {}
  }) {
    const structure = initialStructure;
    const finalStructure = await this.plugins.reduce(
      async (previousPluginOperation, plugin) => {
        const modifiedStructure = await previousPluginOperation;
        return plugin(modifiedStructure);
      },
      Promise.resolve(structure)
    );
    const chunks = groupChunks(finalStructure.chunks);
    return {
      chunks
    };
  }
  getPlugins() {
    return this.plugins;
  }
  addPlugin(plugin) {
    this.plugins.push(plugin);
  }
};

// src/generator/CodeBuilder.ts
var CodeBuilder = class {
  constructor(chunkDefinitions = []) {
    this.chunkDefinitions = [];
    this.generators = {
      ["string" /* STRING */]: (str) => str,
      ["json" /* JSON */]: (json) => JSON.stringify(json)
    };
    this.chunkDefinitions = chunkDefinitions;
  }
  link(chunkDefinitions = []) {
    const chunks = chunkDefinitions || this.chunkDefinitions;
    if (chunks.length <= 0) {
      return "";
    }
    const unprocessedChunks = chunks.map((chunk) => {
      return {
        name: chunk.name,
        type: chunk.type,
        content: chunk.content,
        linkAfter: this.cleanupInvalidChunks(chunk.linkAfter, chunks)
      };
    });
    const resultingString = [];
    while (unprocessedChunks.length > 0) {
      let indexToRemove = 0;
      for (let index = 0; index < unprocessedChunks.length; index++) {
        if (unprocessedChunks[index].linkAfter.length <= 0) {
          indexToRemove = index;
          break;
        }
      }
      if (unprocessedChunks[indexToRemove].linkAfter.length > 0) {
        throw new CodeGeneratorError(
          "Operation aborted. Reason: cyclic dependency between chunks."
        );
      }
      const { type, content, name } = unprocessedChunks[indexToRemove];
      const compiledContent = this.generateByType(type, content);
      if (compiledContent) {
        resultingString.push(`${compiledContent}
`);
      }
      unprocessedChunks.splice(indexToRemove, 1);
      if (!unprocessedChunks.some((ch) => ch.name === name)) {
        unprocessedChunks.forEach(
          (ch) => {
            ch.linkAfter = ch.linkAfter.filter((after) => after !== name);
          }
        );
      }
    }
    return resultingString.join("\n");
  }
  generateByType(type, content) {
    if (!content) {
      return "";
    }
    if (Array.isArray(content)) {
      return content.map((contentItem) => this.generateByType(type, contentItem)).join("\n");
    }
    if (!this.generators[type]) {
      throw new Error(
        `Attempted to generate unknown type ${type}. Please register a generator for this type in builder/index.ts`
      );
    }
    return this.generators[type](content);
  }
  cleanupInvalidChunks(linkAfter, chunks) {
    return linkAfter.filter((chunkName) => chunks.some((chunk) => chunk.name === chunkName));
  }
};

// src/generator/ModuleBuilder.ts
function createModuleBuilder(options = {
  plugins: [],
  postProcessors: []
}) {
  const chunkGenerator = new ChunkBuilder(options.plugins);
  const linker = new CodeBuilder();
  const generateModule = async (input) => {
    const moduleMainName = options.mainFileName || COMMON_SUB_MODULE_NAME;
    if (chunkGenerator.getPlugins().length <= 0) {
      throw new CodeGeneratorError(
        "No plugins found. Component generation cannot work without any plugins!"
      );
    }
    let files = [];
    const { chunks } = await chunkGenerator.run(input, {
      ir: input,
      chunks: [],
      depNames: [],
      contextData: options.contextData || {}
    });
    chunks.forEach((fileChunkList) => {
      const content = linker.link(fileChunkList);
      const file2 = createResultFile(
        fileChunkList[0].subModule || moduleMainName,
        fileChunkList[0].fileType,
        content
      );
      files.push(file2);
    });
    if (options.postProcessors.length > 0) {
      files = files.map((file2) => {
        let { content, ext: type, name } = file2;
        options.postProcessors.forEach((processer) => {
          content = processer(content, type, name);
        });
        return createResultFile(file2.name, type, content);
      });
    }
    return {
      files
    };
  };
  const generateModuleCode = async (schema) => {
    const schemaParser = new SchemaParser();
    const parseResult = schemaParser.parse(schema);
    const containerInfo = parseResult.containers[0];
    const { files } = await generateModule(containerInfo);
    const dir = createResultDir(containerInfo.moduleName);
    files.forEach((file2) => addFile(dir, file2));
    return dir;
  };
  const linkCodeChunks = (chunks, fileName) => {
    const files = [];
    Object.keys(chunks).forEach((fileKey) => {
      const fileChunkList = chunks[fileKey];
      const content = linker.link(fileChunkList);
      const file2 = createResultFile(
        fileChunkList[0].subModule || fileName,
        fileChunkList[0].fileType,
        content
      );
      files.push(file2);
    });
    return files;
  };
  return {
    generateModule,
    generateModuleCode,
    linkCodeChunks,
    addPlugin: chunkGenerator.addPlugin.bind(chunkGenerator)
  };
}

// src/generator/ProjectBuilder.ts
var ProjectBuilder = class {
  constructor(builderOptions) {
    let customBuilderOptions = builderOptions;
    if (typeof builderOptions.customizeBuilderOptions === "function") {
      customBuilderOptions = builderOptions.customizeBuilderOptions(builderOptions);
    }
    const {
      template,
      plugins: plugins4,
      postProcessors,
      schemaParser = new SchemaParser(),
      projectPreProcessors = [],
      projectPostProcessors = [],
      inStrictMode = false,
      extraContextData = {}
    } = customBuilderOptions;
    this.template = template;
    this.plugins = plugins4;
    this.postProcessors = postProcessors;
    this.schemaParser = schemaParser;
    this.projectPreProcessors = projectPreProcessors;
    this.projectPostProcessors = projectPostProcessors;
    this.inStrictMode = inStrictMode;
    this.extraContextData = extraContextData;
  }
  async generateProject(originalSchema) {
    var _a, _b, _c;
    const { schemaParser } = this;
    let schema = typeof originalSchema === "string" ? JSON.parse(originalSchema) : originalSchema;
    for (const preProcessor of this.projectPreProcessors) {
      schema = await preProcessor(schema);
    }
    if (!schemaParser.validate(schema)) {
      throw new CodeGeneratorError("Schema is invalid");
    }
    const parseResult = schemaParser.parse(schema);
    const projectRoot = await this.template.generateTemplate(parseResult);
    let buildResult = [];
    const builders = this.createModuleBuilders({
      extraContextData: {
        projectRemark: (_a = parseResult == null ? void 0 : parseResult.project) == null ? void 0 : _a.projectRemark,
        template: this.template
      }
    });
    const containerBuildResult = await Promise.all(
      parseResult.containers.map(async (containerInfo) => {
        let builder;
        let path;
        if (containerInfo.containerType === "Page") {
          builder = builders.pages;
          path = this.template.slots.pages.path;
        } else {
          builder = builders.components;
          path = this.template.slots.components.path;
        }
        const { files } = await builder.generateModule(containerInfo);
        return {
          moduleName: containerInfo.moduleName,
          path,
          files
        };
      })
    );
    buildResult = buildResult.concat(containerBuildResult);
    if (parseResult.globalRouter && builders.router) {
      const { files } = await builders.router.generateModule(parseResult.globalRouter);
      buildResult.push({
        path: this.template.slots.router.path,
        files
      });
    }
    if (parseResult.project && builders.entry) {
      const { files } = await builders.entry.generateModule(parseResult.project);
      buildResult.push({
        path: this.template.slots.entry.path,
        files
      });
    }
    if (builders.appConfig) {
      const { files } = await builders.appConfig.generateModule(parseResult);
      buildResult.push({
        path: this.template.slots.appConfig.path,
        files
      });
    }
    if (builders.buildConfig) {
      const { files } = await builders.buildConfig.generateModule(parseResult);
      buildResult.push({
        path: this.template.slots.buildConfig.path,
        files
      });
    }
    if (parseResult.project && builders.constants && this.template.slots.constants) {
      const { files } = await builders.constants.generateModule(parseResult.project);
      buildResult.push({
        path: this.template.slots.constants.path,
        files
      });
    }
    if (parseResult.globalUtils && builders.utils && this.template.slots.utils) {
      const { files } = await builders.utils.generateModule(parseResult.globalUtils);
      buildResult.push({
        path: this.template.slots.utils.path,
        files
      });
    }
    if (builders.i18n && this.template.slots.i18n) {
      const { files } = await builders.i18n.generateModule(parseResult.project);
      buildResult.push({
        path: this.template.slots.i18n.path,
        files
      });
    }
    if (parseResult.project && builders.globalStyle) {
      const { files } = await builders.globalStyle.generateModule(parseResult.project);
      buildResult.push({
        path: this.template.slots.globalStyle.path,
        files
      });
    }
    if (parseResult.project && builders.htmlEntry) {
      const { files } = await builders.htmlEntry.generateModule(parseResult.project);
      buildResult.push({
        path: this.template.slots.htmlEntry.path,
        files
      });
    }
    if (parseResult.project && builders.packageJSON) {
      const { files } = await builders.packageJSON.generateModule(parseResult.project);
      buildResult.push({
        path: this.template.slots.packageJSON.path,
        files
      });
    }
    if (parseResult.project && builders.demo) {
      const { files } = await builders.demo.generateModule(parseResult.project);
      buildResult.push({
        path: this.template.slots.demo.path,
        files
      });
    }
    await this.generateExtraSlots(builders, parseResult, buildResult);
    const isSingleComponent = (_c = (_b = parseResult == null ? void 0 : parseResult.project) == null ? void 0 : _b.projectRemark) == null ? void 0 : _c.isSingleComponent;
    buildResult.forEach((moduleInfo) => {
      let targetDir = getDirFromRoot(projectRoot, moduleInfo.path);
      if (moduleInfo.moduleName && !isSingleComponent) {
        const dir = createResultDir(moduleInfo.moduleName);
        addDirectory(targetDir, dir);
        targetDir = dir;
      }
      moduleInfo.files.forEach((file2) => addFile(targetDir, file2));
    });
    let finalResult = projectRoot;
    for (const projectPostProcessor of this.projectPostProcessors) {
      finalResult = await projectPostProcessor(finalResult, schema, originalSchema, {
        template: this.template,
        parseResult
      });
    }
    return finalResult;
  }
  createModuleBuilders(extraContextData = {}) {
    const builders = {};
    Object.keys(this.plugins).forEach((pluginName) => {
      if (this.plugins[pluginName].length > 0) {
        const options = {};
        if (this.template.slots[pluginName] && this.template.slots[pluginName].fileName) {
          options.mainFileName = this.template.slots[pluginName].fileName;
        }
        builders[pluginName] = createModuleBuilder({
          plugins: this.plugins[pluginName],
          postProcessors: this.postProcessors,
          contextData: {
            inStrictMode: this.inStrictMode,
            tolerateEvalErrors: true,
            evalErrorsHandler: "",
            ...this.extraContextData,
            ...extraContextData
          },
          ...options
        });
      }
    });
    return builders;
  }
  async generateExtraSlots(builders, parseResult, buildResult) {
    for (const slotName in this.template.slots) {
      if (!isBuiltinSlotName(slotName)) {
        const { files } = await builders[slotName].generateModule(parseResult);
        buildResult.push({
          path: this.template.slots[slotName].path,
          files
        });
      }
    }
  }
};
function createProjectBuilder(initOptions) {
  return new ProjectBuilder(initOptions);
}
function getDirFromRoot(root, path) {
  let current = root;
  path.forEach((p) => {
    const exist = current.dirs.find((d) => d.name === p);
    if (exist) {
      current = exist;
    } else {
      const newDir = createResultDir(p);
      addDirectory(current, newDir);
      current = newDir;
    }
  });
  return current;
}

// src/publisher/disk/index.ts
import * as defaultFs from "fs";

// src/publisher/disk/utils.ts
import * as systemFs from "fs";
import { join } from "path";
var writeFolder = async (folder, currentPath, createProjectFolder = true, fs = systemFs) => {
  const { name, files, dirs } = folder;
  const folderPath = createProjectFolder ? join(currentPath, name) : currentPath;
  if (!fs.existsSync(folderPath)) {
    await createDirectory(folderPath, fs);
  }
  const promises = [
    writeFilesToFolder(folderPath, files, fs),
    writeSubFoldersToFolder(folderPath, dirs, fs)
  ];
  await Promise.all(promises);
};
var writeFilesToFolder = async (folderPath, files, fs) => {
  const promises = files.map((file2) => {
    const fileName = file2.ext ? `${file2.name}.${file2.ext}` : file2.name;
    const filePath = join(folderPath, fileName);
    return writeContentToFile(filePath, file2.content, "utf8", fs);
  });
  await Promise.all(promises);
};
var writeSubFoldersToFolder = async (folderPath, subFolders, fs) => {
  const promises = subFolders.map((subFolder) => {
    return writeFolder(subFolder, folderPath, true, fs);
  });
  await Promise.all(promises);
};
var createDirectory = (pathToDir, fs) => {
  return new Promise((resolve, reject) => {
    fs.mkdir(pathToDir, { recursive: true }, (err) => {
      err ? reject(err) : resolve();
    });
  });
};
var writeContentToFile = (filePath, fileContent, encoding = "utf8", fs) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, fileContent, { encoding }, (err) => {
      err ? reject(err) : resolve();
    });
  });
};

// src/publisher/disk/index.ts
var createDiskPublisher = (params = {}) => {
  let { project, outputPath = "./" } = params;
  const { fs = defaultFs } = params;
  const getProject = () => {
    if (!project) {
      throw new PublisherError("MissingProject");
    }
    return project;
  };
  const setProject = (projectToSet) => {
    project = projectToSet;
  };
  const getOutputPath = () => {
    return outputPath;
  };
  const setOutputPath = (path) => {
    outputPath = path;
  };
  const publish = async (options = {}) => {
    var _a;
    const projectToPublish = options.project || project;
    if (!projectToPublish) {
      throw new PublisherError("MissingProject");
    }
    const projectOutputPath = options.outputPath || outputPath;
    const overrideProjectSlug = options.projectSlug || params.projectSlug;
    const createProjectFolder = (_a = options.createProjectFolder) != null ? _a : params.createProjectFolder;
    if (overrideProjectSlug) {
      projectToPublish.name = overrideProjectSlug;
    }
    try {
      await writeFolder(projectToPublish, projectOutputPath, createProjectFolder, fs);
      return { success: true, payload: projectOutputPath };
    } catch (error) {
      throw new PublisherError(getErrorMessage(error) || "UnknownError");
    }
  };
  return {
    publish,
    getProject,
    setProject,
    getOutputPath,
    setOutputPath
  };
};

// src/publisher/zip/utils.ts
import JSZip from "jszip";
var isNodeProcess = () => {
  return typeof process === "object" && typeof process.versions === "object" && typeof process.versions.node !== "undefined";
};
var writeZipToDisk = (zipFolderPath, content, zipName) => {
  if (!isNodeProcess()) {
    throw new Error("ZipPublisher: writeZipToDisk is only available in NodeJS");
  }
  const fs = __require("fs");
  const path = __require("path");
  if (!fs.existsSync(zipFolderPath)) {
    fs.mkdirSync(zipFolderPath, { recursive: true });
  }
  const zipPath = path.join(zipFolderPath, `${zipName}.zip`);
  const writeStream = fs.createWriteStream(zipPath);
  writeStream.write(content);
  writeStream.end();
};
var generateProjectZip = async (project) => {
  let zip = new JSZip();
  zip = writeFolderToZip(project, zip, true);
  const zipType = isNodeProcess() ? "nodebuffer" : "blob";
  return zip.generateAsync({ type: zipType });
};
var writeFolderToZip = (folder, parentFolder, ignoreFolder = false) => {
  const zipFolder = ignoreFolder ? parentFolder : parentFolder.folder(folder.name);
  if (zipFolder !== null) {
    folder.files.forEach((file2) => {
      const options = {};
      const fileName = file2.ext ? `${file2.name}.${file2.ext}` : file2.name;
      zipFolder.file(fileName, file2.content, options);
    });
    folder.dirs.forEach((subFolder) => {
      writeFolderToZip(subFolder, zipFolder);
    });
  }
  return parentFolder;
};

// src/publisher/zip/index.ts
import { saveAs } from "file-saver";
var createZipPublisher = (params = {}) => {
  let { project, outputPath } = params;
  const getProject = () => project;
  const setProject = (projectToSet) => {
    project = projectToSet;
  };
  const getOutputPath = () => outputPath;
  const setOutputPath = (path) => {
    outputPath = path;
  };
  const publish = async (options = {}) => {
    const projectToPublish = options.project || project;
    if (!projectToPublish) {
      throw new PublisherError("MissingProject");
    }
    const zipName = options.projectSlug || params.projectSlug || projectToPublish.name;
    try {
      const zipContent = await generateProjectZip(projectToPublish);
      if (isNodeProcess()) {
        const projectOutputPath = options.outputPath || outputPath;
        if (projectOutputPath) {
          await writeZipToDisk(projectOutputPath, zipContent, zipName);
        }
      } else {
        saveAs(zipContent, `${zipName}.zip`);
      }
      return { success: true, payload: zipContent };
    } catch (error) {
      throw new PublisherError(getErrorMessage(error) || "UnknownError");
    }
  };
  return {
    publish,
    getProject,
    setProject,
    getOutputPath,
    setOutputPath
  };
};

// src/plugins/common/esmodule.ts
import { flatMap as flatMap2, camelCase, get } from "lodash";
var DEP_MAIN_BLOCKLIST = ["lib", "lib/index", "es", "es/index", "main"];
var DEFAULT_EXPORT_NAME = "__default__";
function groupDepsByPack(deps) {
  const depMap = {};
  const addDep = (pkg, dep) => {
    if (!depMap[pkg]) {
      depMap[pkg] = [];
    }
    depMap[pkg].push(dep);
  };
  deps.forEach((dep) => {
    if (dep.dependencyType === "Internal" /* Internal */) {
      addDep(`${dep.moduleName}${dep.main ? `/${dep.main}` : ""}`, dep);
    } else {
      let depMain = "";
      if (dep.main && DEP_MAIN_BLOCKLIST.indexOf(dep.main) < 0) {
        depMain = dep.main;
      }
      if (depMain.substring(0, 1) === "/") {
        depMain = depMain.substring(1);
      }
      addDep(`${dep.package}${depMain ? `/${depMain}` : ""}`, dep);
    }
  });
  return depMap;
}
function getDependencyIdentifier(info) {
  return info.aliasName || info.exportName;
}
function getExportNameOfDep(dep) {
  if (dep.destructuring) {
    return dep.exportName || dep.componentName || throwNewError("destructuring dependency must have exportName or componentName");
  }
  if (!dep.subName) {
    return dep.componentName || dep.exportName || throwNewError("dependency item must have componentName or exportName");
  }
  return dep.exportName || `__$${camelCase(
    get(dep, "moduleName") || get(dep, "package") || throwNewError("dep.moduleName or dep.package is undefined")
  )}_default`;
}
function throwNewError(msg) {
  throw new Error(msg);
}
function buildPackageImport(pkg, deps, targetFileType, useAliasName) {
  if (!pkg || pkg === "undefined" || pkg === "null") {
    return [];
  }
  const chunks = [];
  const exportItems = {};
  const defaultExportNames = [];
  const depsInfo = deps.map((dep) => {
    const info = {
      exportName: getExportNameOfDep(dep),
      isDefault: !dep.destructuring,
      subName: dep.subName || void 0,
      nodeIdentifier: dep.componentName || void 0,
      source: dep
    };
    if (info.isDefault) {
      if (defaultExportNames.indexOf(info.exportName) < 0) {
        defaultExportNames.push(info.exportName);
      }
    }
    if (!info.subName) {
      if (info.nodeIdentifier === info.exportName) {
        info.nodeIdentifier = void 0;
      }
      if (info.isDefault) {
        info.aliasName = info.nodeIdentifier || info.exportName;
        info.exportName = DEFAULT_EXPORT_NAME;
      }
      if (info.nodeIdentifier) {
        info.aliasName = info.nodeIdentifier;
        info.nodeIdentifier = void 0;
      }
    } else {
      if (info.isDefault) {
        info.aliasName = info.exportName;
        info.exportName = DEFAULT_EXPORT_NAME;
      }
      if (info.nodeIdentifier === `${info.exportName}.${info.subName}`) {
        info.nodeIdentifier = void 0;
      }
    }
    return info;
  });
  depsInfo.forEach((info) => {
    if (!exportItems[info.exportName]) {
      exportItems[info.exportName] = {
        exportName: info.exportName,
        isDefault: info.isDefault,
        aliasNames: [],
        needOriginExport: false
      };
    }
    if (!info.nodeIdentifier && !info.aliasName) {
      exportItems[info.exportName].needOriginExport = true;
    }
  });
  depsInfo.forEach((info) => {
    if (info.aliasName) {
      const { aliasNames } = exportItems[info.exportName];
      if (aliasNames.indexOf(info.aliasName) < 0) {
        aliasNames.push(info.aliasName);
      }
    }
  });
  depsInfo.forEach((info) => {
    if (info.nodeIdentifier) {
      const exportItem = exportItems[info.exportName];
      if (!exportItem.needOriginExport && exportItem.aliasNames.length > 0) {
        info.aliasName = exportItem.aliasNames[0];
      }
    }
  });
  const nodeIdentifiers = depsInfo.map((info) => info.nodeIdentifier).filter(Boolean);
  const conflictInfos = flatMap2(Object.keys(exportItems), (exportName) => {
    const exportItem = exportItems[exportName];
    const usedNames = [
      ...exportItem.aliasNames,
      ...exportItem.needOriginExport || exportItem.aliasNames.length <= 0 ? [exportName] : []
    ];
    const conflictNames = usedNames.filter((n) => nodeIdentifiers.indexOf(n) >= 0);
    if (conflictNames.length > 0) {
      return [
        ...conflictNames.indexOf(exportName) >= 0 ? [[exportName, true, exportItem]] : [],
        ...conflictNames.filter((n) => n !== exportName).map((n) => [n, false, exportItem])
      ];
    }
    return [];
  });
  const conflictExports = conflictInfos.filter((c) => c[1]).map((c) => c[0]);
  const conflictAlias = conflictInfos.filter((c) => !c[1]).map((c) => c[0]);
  const solutions = {};
  depsInfo.forEach((info) => {
    if (info.aliasName && conflictAlias.indexOf(info.aliasName) >= 0) {
      let solution = solutions[info.aliasName];
      if (!solution) {
        solution = `${info.aliasName}Alias`;
        const conflictItem = (conflictInfos.find((c) => c[0] === info.aliasName) || [])[2];
        conflictItem.aliasNames = conflictItem.aliasNames.filter((a) => a !== info.aliasName);
        conflictItem.aliasNames.push(solution);
        solutions[info.aliasName] = solution;
      }
      info.aliasName = solution;
    }
    if (conflictExports.indexOf(info.exportName) >= 0) {
      let solution = solutions[info.exportName];
      if (!solution) {
        solution = `${info.exportName}Export`;
        const conflictItem = (conflictInfos.find((c) => c[0] === info.exportName) || [])[2];
        conflictItem.aliasNames.push(solution);
        conflictItem.needOriginExport = false;
        solutions[info.exportName] = solution;
      }
      info.aliasName = solution;
    }
  });
  depsInfo.forEach((info) => {
    const name = info.aliasName || info.exportName;
    if (!isValidIdentifier(name)) {
      throw new CodeGeneratorError(`Invalid Identifier [${name}]`);
    }
    if (info.nodeIdentifier && !isValidIdentifier(info.nodeIdentifier)) {
      throw new CodeGeneratorError(`Invalid Identifier [${info.nodeIdentifier}]`);
    }
  });
  const aliasDefineStatements = {};
  if (useAliasName) {
    Object.keys(exportItems).forEach((exportName) => {
      var _a;
      const aliasList = ((_a = exportItems[exportName]) == null ? void 0 : _a.aliasNames) || [];
      if (aliasList.length > 0) {
        const srcName = exportItems[exportName].needOriginExport ? exportName : aliasList[0];
        const aliasNameList = exportItems[exportName].needOriginExport ? aliasList : aliasList.slice(1);
        aliasNameList.forEach((a) => {
          if (!aliasDefineStatements[a]) {
            aliasDefineStatements[a] = `const ${a} = ${srcName};`;
          }
        });
      }
    });
  }
  function getDefaultExportName(info) {
    if (info.isDefault) {
      return defaultExportNames[0];
    }
    return info.exportName;
  }
  depsInfo.forEach((info) => {
    if (info.nodeIdentifier) {
      const ownerName = getDependencyIdentifier(info);
      chunks.push({
        type: "string" /* STRING */,
        fileType: targetFileType,
        name: COMMON_CHUNK_NAME.ImportAliasDefine,
        content: useAliasName ? `const ${info.nodeIdentifier} = ${ownerName}.${info.subName};` : "",
        linkAfter: [COMMON_CHUNK_NAME.ExternalDepsImport, COMMON_CHUNK_NAME.InternalDepsImport],
        ext: {
          originalName: `${getDefaultExportName(info)}.${info.subName}`,
          aliasName: info.nodeIdentifier,
          dependency: info.source
        }
      });
    } else if (info.aliasName) {
      if (info.isDefault && defaultExportNames.find((n) => n === info.aliasName)) {
        delete aliasDefineStatements[info.aliasName];
        return;
      }
      let contentStatement = "";
      if (aliasDefineStatements[info.aliasName]) {
        contentStatement = aliasDefineStatements[info.aliasName];
        delete aliasDefineStatements[info.aliasName];
      }
      chunks.push({
        type: "string" /* STRING */,
        fileType: targetFileType,
        name: COMMON_CHUNK_NAME.ImportAliasDefine,
        content: contentStatement,
        linkAfter: [COMMON_CHUNK_NAME.ExternalDepsImport, COMMON_CHUNK_NAME.InternalDepsImport],
        ext: {
          originalName: getDefaultExportName(info),
          aliasName: info.aliasName,
          dependency: info.source
        }
      });
    }
  });
  Object.keys(aliasDefineStatements).forEach((a) => {
    chunks.push({
      type: "string" /* STRING */,
      fileType: targetFileType,
      name: COMMON_CHUNK_NAME.ImportAliasDefine,
      content: aliasDefineStatements[a],
      linkAfter: [COMMON_CHUNK_NAME.ExternalDepsImport, COMMON_CHUNK_NAME.InternalDepsImport]
    });
  });
  const exportItemList = Object.keys(exportItems).map((k) => exportItems[k]);
  const defaultExport = exportItemList.filter((item) => item.isDefault);
  const otherExports = exportItemList.filter((item) => !item.isDefault);
  const statementL = ["import"];
  if (defaultExport.length > 0) {
    if (useAliasName) {
      statementL.push(defaultExportNames[0]);
    } else {
      statementL.push(defaultExport[0].aliasNames[0]);
    }
    if (otherExports.length > 0) {
      statementL.push(", ");
    }
  }
  if (otherExports.length > 0) {
    const items = otherExports.map((item) => {
      return !useAliasName || item.needOriginExport || item.aliasNames.length <= 0 ? item.exportName : `${item.exportName} as ${item.aliasNames[0]}`;
    });
    statementL.push(`{ ${items.join(", ")} }`);
  }
  statementL.push("from");
  const getInternalDependencyModuleId = () => `@/${deps[0].type}/${pkg}`;
  if (deps[0].dependencyType === "Internal" /* Internal */) {
    statementL.push(`'${getInternalDependencyModuleId()}';`);
    chunks.push({
      type: "string" /* STRING */,
      fileType: targetFileType,
      name: COMMON_CHUNK_NAME.InternalDepsImport,
      content: statementL.join(" "),
      linkAfter: [COMMON_CHUNK_NAME.ExternalDepsImport]
    });
  } else {
    statementL.push(`'${pkg}';`);
    chunks.push({
      type: "string" /* STRING */,
      fileType: targetFileType,
      name: COMMON_CHUNK_NAME.ExternalDepsImport,
      content: statementL.join(" "),
      linkAfter: []
    });
  }
  if (defaultExportNames.length > 1) {
    if (deps[0].dependencyType === "Internal" /* Internal */) {
      defaultExportNames.slice(1).forEach((exportName) => {
        chunks.push({
          type: "string" /* STRING */,
          fileType: targetFileType,
          name: COMMON_CHUNK_NAME.InternalDepsImport,
          content: `import ${exportName} from '${getInternalDependencyModuleId()}';`,
          linkAfter: [COMMON_CHUNK_NAME.ExternalDepsImport]
        });
      });
    } else {
      defaultExportNames.slice(1).forEach((exportName) => {
        chunks.push({
          type: "string" /* STRING */,
          fileType: targetFileType,
          name: COMMON_CHUNK_NAME.ExternalDepsImport,
          content: `import ${exportName} from '${pkg}';`,
          linkAfter: []
        });
        chunks.push({
          type: "string" /* STRING */,
          fileType: targetFileType,
          name: COMMON_CHUNK_NAME.ImportAliasDefine,
          content: "",
          linkAfter: [],
          ext: {
            aliasName: exportName,
            originalName: exportName,
            dependency: {
              package: pkg,
              componentName: exportName
            }
          }
        });
      });
    }
  }
  return chunks;
}
var pluginFactory = (config) => {
  const cfg = {
    fileType: "js" /* JS */,
    useAliasName: true,
    ...config || {}
  };
  const plugin = async (pre) => {
    const next = {
      ...pre
    };
    const ir = next.ir;
    if (ir && ir.deps && ir.deps.length > 0) {
      const deps = cfg.filter ? cfg.filter(ir.deps) : ir.deps;
      const packs = groupDepsByPack(deps);
      Object.keys(packs).forEach((pkg) => {
        const chunks = buildPackageImport(pkg, packs[pkg], cfg.fileType, cfg.useAliasName);
        next.chunks.push(...chunks);
      });
    }
    return next;
  };
  return plugin;
};
var esmodule_default = pluginFactory;

// src/plugins/common/styleImport.ts
import changeCase3 from "change-case";
var pluginFactory2 = () => {
  const plugin = async (pre) => {
    const next = {
      ...pre
    };
    const ir = next.ir;
    const { chunks } = next;
    if (ir && ir.deps && ir.deps.length > 0) {
      let lowcodeMaterialsStyleAdded = false;
      let fusionUIStyleAdded = false;
      let nextStyleAddedMap = {};
      ir.deps.forEach((dep) => {
        if (dep.package === "@alifd/next" && !nextStyleAddedMap[dep.exportName]) {
          chunks.push({
            type: "string" /* STRING */,
            fileType: "jsx" /* JSX */,
            name: COMMON_CHUNK_NAME.InternalDepsImport,
            content: `import '@alifd/next/lib/${changeCase3.paramCase(dep.exportName)}/style';`,
            linkAfter: [COMMON_CHUNK_NAME.ExternalDepsImport]
          });
          nextStyleAddedMap[dep.exportName] = true;
        } else if (dep.package === "@alilc/lowcode-materials" && !lowcodeMaterialsStyleAdded) {
          chunks.push({
            type: "string" /* STRING */,
            fileType: "jsx" /* JSX */,
            name: COMMON_CHUNK_NAME.InternalDepsImport,
            content: "import '@alilc/lowcode-materials/lib/style';",
            linkAfter: [COMMON_CHUNK_NAME.ExternalDepsImport]
          });
          lowcodeMaterialsStyleAdded = true;
        } else if (dep.package === "@alifd/fusion-ui" && !fusionUIStyleAdded) {
          chunks.push({
            type: "string" /* STRING */,
            fileType: "jsx" /* JSX */,
            name: COMMON_CHUNK_NAME.InternalDepsImport,
            content: "import '@alifd/fusion-ui/lib/style';",
            linkAfter: [COMMON_CHUNK_NAME.ExternalDepsImport]
          });
          fusionUIStyleAdded = true;
        }
      });
    }
    return next;
  };
  return plugin;
};
var styleImport_default = pluginFactory2;

// src/plugins/component/react/containerClass.ts
import changeCase4 from "change-case";

// src/plugins/component/react/const.ts
var REACT_CHUNK_NAME = {
  ClassRenderStart: "ReactComponentClassRenderStart",
  ClassRenderPre: "ReactComponentClassRenderPre",
  ClassRenderEnd: "ReactComponentClassRenderEnd",
  ClassRenderJSX: "ReactComponentClassRenderJSX",
  ClassDidMountStart: "ReactComponentClassDidMountStart",
  ClassDidMountEnd: "ReactComponentClassDidMountEnd",
  ClassDidMountContent: "ReactComponentClassDidMountContent"
};

// src/plugins/component/react/containerClass.ts
var pluginFactory3 = () => {
  const plugin = async (pre) => {
    const next = {
      ...pre
    };
    const ir = next.ir;
    const componentClassName = ensureValidClassName(
      `${changeCase4.pascalCase(ir.moduleName)}$$${ir.containerType}`
    );
    next.chunks.push({
      type: "string" /* STRING */,
      fileType: "jsx" /* JSX */,
      name: CLASS_DEFINE_CHUNK_NAME.Start,
      content: `class ${componentClassName} extends React.Component {`,
      linkAfter: [
        COMMON_CHUNK_NAME.ExternalDepsImport,
        COMMON_CHUNK_NAME.InternalDepsImport,
        COMMON_CHUNK_NAME.ImportAliasDefine,
        COMMON_CHUNK_NAME.FileVarDefine,
        COMMON_CHUNK_NAME.FileUtilDefine
      ]
    });
    if (ir.containerType === "Component") {
      next.chunks.push({
        type: "string" /* STRING */,
        fileType: "jsx" /* JSX */,
        name: CLASS_DEFINE_CHUNK_NAME.InsVar,
        content: `static displayName = '${ir.moduleName}';`,
        linkAfter: [
          CLASS_DEFINE_CHUNK_NAME.Start
        ]
      });
    }
    next.chunks.push({
      type: "string" /* STRING */,
      fileType: "jsx" /* JSX */,
      name: CLASS_DEFINE_CHUNK_NAME.End,
      content: "}",
      linkAfter: [
        ...DEFAULT_LINK_AFTER[CLASS_DEFINE_CHUNK_NAME.End],
        REACT_CHUNK_NAME.ClassRenderEnd,
        REACT_CHUNK_NAME.ClassDidMountEnd
      ]
    });
    next.chunks.push({
      type: "string" /* STRING */,
      fileType: "jsx" /* JSX */,
      name: CLASS_DEFINE_CHUNK_NAME.ConstructorStart,
      content: "constructor(props, context) { super(props); ",
      linkAfter: [...DEFAULT_LINK_AFTER[CLASS_DEFINE_CHUNK_NAME.ConstructorStart]]
    });
    next.chunks.push({
      type: "string" /* STRING */,
      fileType: "jsx" /* JSX */,
      name: CLASS_DEFINE_CHUNK_NAME.ConstructorEnd,
      content: "}",
      linkAfter: [...DEFAULT_LINK_AFTER[CLASS_DEFINE_CHUNK_NAME.ConstructorEnd]]
    });
    next.chunks.push({
      type: "string" /* STRING */,
      fileType: "jsx" /* JSX */,
      name: REACT_CHUNK_NAME.ClassDidMountStart,
      content: "componentDidMount() {",
      linkAfter: [...DEFAULT_LINK_AFTER[CLASS_DEFINE_CHUNK_NAME.End]]
    });
    next.chunks.push({
      type: "string" /* STRING */,
      fileType: "jsx" /* JSX */,
      name: REACT_CHUNK_NAME.ClassDidMountEnd,
      content: "}",
      linkAfter: [REACT_CHUNK_NAME.ClassDidMountContent, REACT_CHUNK_NAME.ClassDidMountStart]
    });
    next.chunks.push({
      type: "string" /* STRING */,
      fileType: "jsx" /* JSX */,
      name: REACT_CHUNK_NAME.ClassRenderStart,
      content: "render() {",
      linkAfter: [
        ...DEFAULT_LINK_AFTER[CLASS_DEFINE_CHUNK_NAME.End],
        REACT_CHUNK_NAME.ClassDidMountEnd
      ]
    });
    next.chunks.push({
      type: "string" /* STRING */,
      fileType: "jsx" /* JSX */,
      name: REACT_CHUNK_NAME.ClassRenderEnd,
      content: "}",
      linkAfter: [
        REACT_CHUNK_NAME.ClassRenderStart,
        REACT_CHUNK_NAME.ClassRenderPre,
        REACT_CHUNK_NAME.ClassRenderJSX
      ]
    });
    next.chunks.push({
      type: "string" /* STRING */,
      fileType: "jsx" /* JSX */,
      name: COMMON_CHUNK_NAME.FileExport,
      content: `export default ${componentClassName};`,
      linkAfter: [
        COMMON_CHUNK_NAME.ExternalDepsImport,
        COMMON_CHUNK_NAME.InternalDepsImport,
        COMMON_CHUNK_NAME.ImportAliasDefine,
        COMMON_CHUNK_NAME.FileVarDefine,
        COMMON_CHUNK_NAME.FileUtilDefine,
        CLASS_DEFINE_CHUNK_NAME.End
      ]
    });
    return next;
  };
  return plugin;
};
var containerClass_default = pluginFactory3;

// src/utils/compositeType.ts
var compositeType_exports = {};
__export(compositeType_exports, {
  generateCompositeType: () => generateCompositeType
});
import {
  isJSExpression as isJSExpression3,
  isJSFunction as isJSFunction3,
  isJSSlot as isJSSlot3
} from "@alilc/lowcode-types";
import _2 from "lodash";

// src/utils/jsExpression.ts
var jsExpression_exports = {};
__export(jsExpression_exports, {
  generateExpression: () => generateExpression,
  generateFunction: () => generateFunction,
  isBroadJSFunction: () => isBroadJSFunction
});
import * as parser2 from "@babel/parser";
import generate2 from "@babel/generator";
import traverse2 from "@babel/traverse";
import * as t2 from "@babel/types";
import { isJSExpression as isJSExpression2, isJSFunction as isJSFunction2 } from "@alilc/lowcode-types";

// src/utils/expressionParser.ts
var expressionParser_exports = {};
__export(expressionParser_exports, {
  ParseError: () => ParseError,
  parseExpression: () => parseExpression2,
  parseExpressionConvertThis2Context: () => parseExpressionConvertThis2Context,
  parseExpressionGetGlobalVariables: () => parseExpressionGetGlobalVariables,
  parseExpressionGetKeywords: () => parseExpressionGetKeywords,
  transformExpressionLocalRef: () => transformExpressionLocalRef
});
import * as parser from "@babel/parser";
import generate from "@babel/generator";
import traverse from "@babel/traverse";
import * as t from "@babel/types";
import { isIdentifier } from "@babel/types";

// src/utils/OrderedSet.ts
var OrderedSet = class {
  constructor(items) {
    this._set = /* @__PURE__ */ new Set();
    this._arr = [];
    if (items) {
      this._set = new Set(items);
      this._arr = items.slice(0);
    }
  }
  add(item) {
    if (!this._set.has(item)) {
      this._set.add(item);
      this._arr.push(item);
    }
  }
  delete(item) {
    if (this._set.has(item)) {
      this._set.delete(item);
      this._arr.splice(this._arr.indexOf(item), 1);
    }
  }
  has(item) {
    return this._set.has(item);
  }
  toArray() {
    return this._arr.slice(0);
  }
};

// src/utils/expressionParser.ts
var ParseError = class extends Error {
  constructor(expr, detail) {
    super(`Failed to parse expression "${typeof expr === "string" ? expr : generate(expr)}"`);
    this.expr = expr;
    this.detail = detail;
    Object.setPrototypeOf(this, new.target.prototype);
  }
};
var MAYBE_EXPRESSIONS = {
  ArrayExpression: { fields: ["elements"] },
  AssignmentExpression: { fields: ["left", "right"] },
  BinaryExpression: { fields: ["left", "right"] },
  CallExpression: { fields: ["arguments", "callee"] },
  ConditionalExpression: { fields: ["test", "consequent", "alternate"] },
  DoWhileStatement: { fields: ["test"] },
  ExpressionStatement: { fields: ["expression"] },
  ForInStatement: { fields: ["right"] },
  ForStatement: { fields: ["init", "test", "update"] },
  IfStatement: { fields: ["test"] },
  LogicalExpression: { fields: ["left", "right"] },
  MemberExpression: {
    fields: (node) => {
      return node.type === "MemberExpression" && node.computed ? ["object", "property"] : ["object"];
    }
  },
  NewExpression: { fields: ["callee", "arguments"] },
  ObjectMethod: {
    fields: (node) => {
      return node.type === "ObjectMethod" && node.computed ? ["key"] : [];
    }
  },
  ObjectProperty: {
    fields: (node) => {
      return node.type === "ObjectProperty" && node.computed ? ["key", "value"] : ["value"];
    }
  },
  ReturnStatement: { fields: ["argument"] },
  SequenceExpression: { fields: ["expressions"] },
  ParenthesizedExpression: { fields: ["expression"] },
  SwitchCase: { fields: ["test"] },
  SwitchStatement: { fields: ["discriminant"] },
  ThrowStatement: { fields: ["argument"] },
  UnaryExpression: { fields: ["argument"] },
  UpdateExpression: { fields: ["argument"] },
  VariableDeclarator: { fields: ["init"] },
  WhileStatement: { fields: ["test"] },
  WithStatement: { fields: ["object"] },
  AssignmentPattern: { fields: ["right"] },
  ArrowFunctionExpression: { fields: ["body"] },
  ClassExpression: { fields: ["superClass"] },
  ClassDeclaration: { fields: ["superClass"] },
  ExportDefaultDeclaration: { fields: ["declaration"] },
  ForOfStatement: { fields: ["right"] },
  ClassMethod: {
    fields: (node) => {
      return node.type === "ClassMethod" && node.computed ? ["key"] : [];
    }
  },
  SpreadElement: { fields: ["argument"] },
  TaggedTemplateExpression: { fields: ["tag"] },
  TemplateLiteral: { fields: ["expressions"] },
  YieldExpression: { fields: ["argument"] },
  AwaitExpression: { fields: ["argument"] },
  OptionalMemberExpression: {
    fields: (node) => {
      return node.type === "OptionalMemberExpression" && node.computed ? ["object", "property"] : ["object"];
    }
  },
  OptionalCallExpression: { fields: ["callee", "arguments"] },
  JSXSpreadAttribute: { fields: ["argument"] },
  BindExpression: { fields: ["object", "callee"] },
  ClassProperty: {
    fields: (node) => {
      return node.type === "ClassProperty" && node.computed ? ["key", "value"] : ["value"];
    }
  },
  PipelineTopicExpression: { fields: ["expression"] },
  PipelineBareFunction: { fields: ["callee"] },
  ClassPrivateProperty: { fields: ["value"] },
  Decorator: { fields: ["expression"] },
  TupleExpression: { fields: ["elements"] },
  TSDeclareMethod: {
    fields: (node) => {
      return node.type === "TSDeclareMethod" && node.computed ? ["key"] : [];
    }
  },
  TSPropertySignature: {
    fields: (node) => {
      return node.type === "TSPropertySignature" && node.computed ? ["key", "initializer"] : ["initializer"];
    }
  },
  TSMethodSignature: {
    fields: (node) => {
      return node.type === "TSMethodSignature" && node.computed ? ["key"] : [];
    }
  },
  TSAsExpression: { fields: ["expression"] },
  TSTypeAssertion: { fields: ["expression"] },
  TSEnumDeclaration: { fields: ["initializer"] },
  TSEnumMember: { fields: ["initializer"] },
  TSNonNullExpression: { fields: ["expression"] },
  TSExportAssignment: { fields: ["expression"] }
};
var CROSS_THIS_SCOPE_TYPE_NODE = {
  ArrowFunctionExpression: false,
  FunctionExpression: true,
  FunctionDeclaration: true,
  ClassDeclaration: true,
  ClassExpression: true,
  ClassBody: true,
  ClassImplements: true,
  ClassMethod: true,
  ClassPrivateMethod: true,
  ClassProperty: true,
  ClassPrivateProperty: true,
  DeclareClass: true
};
var JS_KEYWORDS = ["arguments", "this", "super"];
function parseExpressionGetKeywords(expr) {
  if (!expr) {
    return [];
  }
  try {
    const keywordVars = new OrderedSet();
    const ast = parser.parse(`!(${expr});`, {
      plugins: [
        "jsx"
      ]
    });
    const addIdentifierIfNeeded = (x) => {
      if (typeof x === "object" && isIdentifier(x) && JS_KEYWORDS.includes(x.name)) {
        keywordVars.add(x.name);
      }
    };
    traverse(ast, {
      enter(path) {
        var _a;
        const { node } = path;
        const expressionFields = (_a = MAYBE_EXPRESSIONS[node.type]) == null ? void 0 : _a.fields;
        if (expressionFields) {
          (typeof expressionFields === "function" ? expressionFields(node) : expressionFields).forEach((fieldName) => {
            const fieldValue = node[fieldName];
            if (typeof fieldValue === "object") {
              if (Array.isArray(fieldValue)) {
                fieldValue.forEach((item) => {
                  addIdentifierIfNeeded(item);
                });
              } else {
                addIdentifierIfNeeded(fieldValue);
              }
            }
          });
        }
      }
    });
    return keywordVars.toArray().filter(Boolean);
  } catch (e) {
    throw new ParseError(expr, e);
  }
}
function parseExpressionGetGlobalVariables(expr, { filter = () => true } = {}) {
  if (!expr) {
    return [];
  }
  try {
    const undeclaredVars = new OrderedSet();
    const ast = parser.parse(`!(${expr});`);
    const addUndeclaredIdentifierIfNeeded = (x, path) => {
      if (typeof x === "object" && isIdentifier(x) && !path.scope.hasBinding(x.name)) {
        undeclaredVars.add(x.name);
      }
    };
    traverse(ast, {
      enter(path) {
        var _a;
        const { node } = path;
        const expressionFields = (_a = MAYBE_EXPRESSIONS[node.type]) == null ? void 0 : _a.fields;
        if (expressionFields) {
          (typeof expressionFields === "function" ? expressionFields(node) : expressionFields).forEach((fieldName) => {
            const fieldValue = node[fieldName];
            if (typeof fieldValue === "object") {
              if (Array.isArray(fieldValue)) {
                fieldValue.forEach((item) => {
                  addUndeclaredIdentifierIfNeeded(item, path);
                });
              } else {
                addUndeclaredIdentifierIfNeeded(fieldValue, path);
              }
            }
          });
        }
      }
    });
    return undeclaredVars.toArray().filter(filter);
  } catch (e) {
    throw new ParseError(expr, e);
  }
}
function parseExpressionConvertThis2Context(expr, contextName = "__$$context", localVariables = []) {
  if (!expr) {
    return expr;
  }
  try {
    const exprAst = typeof expr === "string" ? parser.parseExpression(expr) : expr;
    const exprWrapAst = t.expressionStatement(exprAst);
    const fileAst = t.file(t.program([exprWrapAst]));
    const localVariablesSet = new Set(localVariables);
    let thisScopeLevel = CROSS_THIS_SCOPE_TYPE_NODE[exprAst.type] ? -1 : 0;
    traverse(fileAst, {
      enter(path) {
        if (CROSS_THIS_SCOPE_TYPE_NODE[path.node.type]) {
          thisScopeLevel++;
        }
      },
      exit(path) {
        if (CROSS_THIS_SCOPE_TYPE_NODE[path.node.type]) {
          thisScopeLevel--;
        }
      },
      MemberExpression(path) {
        if (!path.isMemberExpression()) {
          return;
        }
        const obj = path.get("object");
        if (!obj.isThisExpression()) {
          return;
        }
        if (!path.node.computed) {
          const prop = path.get("property");
          if (prop.isIdentifier() && localVariablesSet.has(prop.node.name)) {
            path.replaceWith(t.identifier(prop.node.name));
            return;
          }
        }
        if (thisScopeLevel <= 0) {
          obj.replaceWith(t.identifier(contextName));
        }
      },
      ThisExpression(path) {
        if (!path.isThisExpression()) {
          return;
        }
        if (path.parent.type === "MemberExpression") {
          return;
        }
        if (thisScopeLevel <= 0) {
          path.replaceWith(t.identifier(contextName));
        }
      }
    });
    const { code } = generate(exprWrapAst.expression, { sourceMaps: false });
    return code;
  } catch (e) {
    throw new ParseError(expr, e);
  }
}
function parseExpression2(expr) {
  try {
    return parser.parseExpression(expr);
  } catch (e) {
    throw new ParseError(expr, e);
  }
}
function transformExpressionLocalRef(expr, scope) {
  if (!expr) {
    return expr;
  }
  if (!scope) {
    throw new Error("transform expression without scope");
  }
  try {
    const exprAst = typeof expr === "string" ? parser.parseExpression(expr) : expr;
    const exprWrapAst = t.expressionStatement(exprAst);
    const fileAst = t.file(t.program([exprWrapAst]));
    traverse(fileAst, {
      MemberExpression(path) {
        if (!path.isMemberExpression()) {
          return;
        }
        const obj = path.get("object");
        if (!obj.isThisExpression()) {
          return;
        }
        const prop = path.get("property");
        let memberName = "";
        if (!path.node.computed && prop.isIdentifier()) {
          memberName = prop.node.name;
        } else if (path.node.computed && prop.isStringLiteral()) {
          memberName = prop.node.value;
        }
        if (memberName && scope.bindings && scope.bindings.hasBinding(memberName)) {
          path.replaceWith(t.identifier(memberName));
        }
      }
    });
    const { code } = generate(exprWrapAst.expression, { sourceMaps: false });
    return code;
  } catch (e) {
    throw new ParseError(expr, e);
  }
}

// src/utils/jsExpression.ts
function parseFunction(content) {
  try {
    const ast = parser2.parse(`(${content});`, {
      plugins: [
        "jsx"
      ]
    });
    let resultNode = null;
    traverse2(ast, {
      FunctionExpression(path) {
        resultNode = path.node;
        path.stop();
      }
    });
    return resultNode;
  } catch (e) {
    throw new ParseError(content, e);
  }
}
function transformFuncExpr2MethodMember(methodName, content) {
  const funcNode = parseFunction(content);
  if (funcNode) {
    const targetNode = t2.classMethod(
      "method",
      methodName && t2.identifier(methodName) || funcNode.id || t2.identifier("notDefineName"),
      funcNode.params,
      funcNode.body,
      void 0,
      void 0,
      void 0,
      funcNode.async || void 0
    );
    const { code: resultCode } = generate2(targetNode, { sourceMaps: false });
    return resultCode;
  }
  throw new Error("Can not find Function Statement");
}
function getArrowFunction(content) {
  const funcNode = parseFunction(content);
  if (funcNode) {
    const targetNode = t2.arrowFunctionExpression(
      funcNode.params,
      funcNode.body,
      funcNode.async || void 0
    );
    const { code: resultCode } = generate2(targetNode, { sourceMaps: false });
    return resultCode;
  }
  throw new Error("Can not find Function Statement");
}
function getBodyStatements(content) {
  const funcNode = parseFunction(content);
  if (funcNode) {
    const statements = funcNode.body.body;
    const targetNode = t2.program(statements, void 0, "module", void 0);
    const { code: resultCode } = generate2(targetNode, { sourceMaps: false });
    return resultCode;
  }
  throw new Error("Can not find Function Statement");
}
function isBroadJSFunction(value) {
  return isJSExpressionFn(value) || isJSFunction2(value);
}
function generateExpression(value, scope) {
  if (isJSExpression2(value)) {
    const exprVal = value.value.trim();
    if (!exprVal) {
      return "null";
    }
    const afterProcessWithLocals = transformExpressionLocalRef(exprVal, scope);
    return afterProcessWithLocals;
  }
  throw new CodeGeneratorError("Not a JSExpression");
}
function getFunctionSource(cfg) {
  return cfg.source || cfg.value || cfg.compiled;
}
function generateFunction(value, config = {
  name: void 0,
  isMember: false,
  isBlock: false,
  isArrow: false,
  isBindExpr: false
}) {
  if (isBroadJSFunction(value)) {
    const functionCfg = value;
    const functionSource = getFunctionSource(functionCfg);
    if (config.isMember) {
      return transformFuncExpr2MethodMember(config.name || "", functionSource);
    }
    if (config.isBlock) {
      return getBodyStatements(functionSource);
    }
    if (config.isArrow) {
      return getArrowFunction(functionSource);
    }
    if (config.isBindExpr) {
      return `(${functionSource}).bind(this)`;
    }
    return functionSource;
  }
  if (isJSExpression2(value)) {
    return value.value;
  }
  throw new CodeGeneratorError("Not a JSFunction or JSExpression");
}

// src/utils/jsSlot.ts
var jsSlot_exports = {};
__export(jsSlot_exports, {
  generateJsSlot: () => generateJsSlot
});
import { isJSSlot as isJSSlot2 } from "@alilc/lowcode-types";

// src/utils/jsxHelpers.ts
function unwrapJsExprQuoteInJsx(jsxExpr) {
  if (jsxExpr.length >= 2 && jsxExpr[0] === "{" && jsxExpr[jsxExpr.length - 1] === "}") {
    return jsxExpr.slice(1, jsxExpr.length - 1);
  }
  return jsxExpr;
}

// src/utils/jsSlot.ts
function generateSingleLineComment(commentText) {
  return `/* ${commentText.split("\n").join(" ").replace(/\*\//g, "*-/")}*/`;
}
function generateJsSlot(slot, scope, generator) {
  if (isJSSlot2(slot)) {
    const { title, params, value } = slot;
    const slotScope = params ? scope.createSubScope(params || []) : scope;
    const contentExpr = !value ? "null" : generateNodeDataOrArrayForJsSlot(value, generator, slotScope);
    if (params) {
      return [
        title && generateSingleLineComment(title),
        "(",
        (params || []).join(", "),
        ") => ((__$$context) => (",
        contentExpr,
        "))(",
        `  __$$createChildContext(__$$context, { ${(params || []).join(", ")} }`,
        "))"
      ].filter(Boolean).join("");
    }
    return contentExpr || "[]";
  }
  throw new CodeGeneratorError("Not a JSSlot");
}
function generateNodeDataOrArrayForJsSlot(value, generator, scope) {
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return "[]";
    }
    if (value.length === 1) {
      return unwrapJsExprQuoteInJsx(generator(value, scope)) || "null";
    }
    return `[
${value.map((v) => {
      if (typeof v === "string") {
        return JSON.stringify(v);
      }
      return unwrapJsExprQuoteInJsx(generator(v, scope)) || "null";
    }).join(",\n") || "null"}
]`;
  }
  return unwrapJsExprQuoteInJsx(generator(value, scope)) || "null";
}

// src/utils/aopHelper.ts
function executeFunctionStack(input, scope, funcs, baseFunc, config) {
  const funcList = [];
  if (Array.isArray(funcs)) {
    funcList.push(...funcs);
  } else {
    funcList.push(funcs);
  }
  let next = baseFunc;
  while (funcList.length > 0) {
    const func = funcList.pop();
    if (func) {
      const warppedFunc = ((nextFunc) => (i, s, cfg) => func(i, s, cfg, nextFunc))(next);
      next = warppedFunc;
    }
  }
  return next(input, scope, config);
}

// src/utils/compositeType.ts
function isVariable(v) {
  if (_2.isObject(v) && v.type === "variable") {
    return true;
  }
  return false;
}
function isDataSource(v) {
  return typeof v === "object" && v != null && v.type === "DataSource";
}
function generateArray(value, scope, options = {}) {
  const body = value.map((v) => generateUnknownType(v, scope, options)).join(",");
  return `[${body}]`;
}
function generateObject(value, scope, options = {}) {
  if (value.type === "i18n") {
    if (value.params && typeof value.params === "object") {
      return `this._i18nText(${generateUnknownType(_2.omit(value, "type"), scope, options)})`;
    }
    return `this._i18nText(${JSON.stringify(_2.omit(value, "type"))})`;
  }
  const body = Object.keys(value).map((key) => {
    const propName = JSON.stringify(key);
    const v = generateUnknownType(value[key], scope, options);
    return `${propName}: ${v}`;
  }).join(",\n");
  return `{${body}}`;
}
function generateString(value) {
  return JSON.stringify(value);
}
function generateNumber(value) {
  return String(value);
}
function generateBool(value) {
  return value ? "true" : "false";
}
function genFunction(value) {
  const globalVars = parseExpressionGetKeywords(value.value);
  if (globalVars.includes("arguments")) {
    return generateFunction(value, { isBindExpr: true });
  }
  return generateFunction(value, { isArrow: true });
}
function genJsSlot(value, scope, options = {}) {
  if (options.nodeGenerator) {
    return generateJsSlot(value, scope, options.nodeGenerator);
  }
  return "";
}
function generateUnknownType(value, scope, options = {}) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i;
  if (_2.isUndefined(value)) {
    return "undefined";
  }
  if (_2.isNull(value)) {
    return "null";
  }
  if (_2.isArray(value)) {
    if ((_a = options.handlers) == null ? void 0 : _a.array) {
      return executeFunctionStack(value, scope, options.handlers.array, generateArray, options);
    }
    return generateArray(value, scope, options);
  }
  if (isVariable(value)) {
    const transValue = {
      type: "JSExpression",
      value: value.variable
    };
    if ((_b = options.handlers) == null ? void 0 : _b.expression) {
      const expression = executeFunctionStack(
        transValue,
        scope,
        options.handlers.expression,
        generateExpression,
        options
      );
      return expression || "undefined";
    }
    return generateExpression(transValue, scope);
  }
  if (isJSExpression3(value)) {
    if ((_c = options.handlers) == null ? void 0 : _c.expression) {
      return executeFunctionStack(
        value,
        scope,
        options.handlers.expression,
        generateExpression,
        options
      );
    }
    return generateExpression(value, scope);
  }
  if (isJSFunction3(value) || isJSExpressionFn(value)) {
    if ((_d = options.handlers) == null ? void 0 : _d.function) {
      return executeFunctionStack(value, scope, options.handlers.function, genFunction, options);
    }
    return genFunction(value);
  }
  if (isJSSlot3(value)) {
    if ((_e = options.handlers) == null ? void 0 : _e.slot) {
      return executeFunctionStack(value, scope, options.handlers.slot, genJsSlot, options);
    }
    return genJsSlot(value, scope, options);
  }
  if (isDataSource(value)) {
    return generateUnknownType(
      {
        type: "JSExpression",
        value: `this.dataSourceMap[${JSON.stringify(value.id)}]`
      },
      scope,
      options
    );
  }
  if (_2.isObject(value)) {
    if ((_f = options.handlers) == null ? void 0 : _f.object) {
      return executeFunctionStack(value, scope, options.handlers.object, generateObject, options);
    }
    return generateObject(value, scope, options);
  }
  if (_2.isString(value)) {
    if ((_g = options.handlers) == null ? void 0 : _g.string) {
      return executeFunctionStack(value, scope, options.handlers.string, generateString, options);
    }
    return generateString(value);
  }
  if (_2.isNumber(value)) {
    if ((_h = options.handlers) == null ? void 0 : _h.number) {
      return executeFunctionStack(value, scope, options.handlers.number, generateNumber, options);
    }
    return generateNumber(value);
  }
  if (_2.isBoolean(value)) {
    if ((_i = options.handlers) == null ? void 0 : _i.boolean) {
      return executeFunctionStack(value, scope, options.handlers.boolean, generateBool, options);
    }
    return generateBool(value);
  }
  throw new CodeGeneratorError("Meet unknown composite value type");
}
function generateCompositeType(value, scope, options = {}) {
  const result = generateUnknownType(value, scope, options);
  return result;
}

// src/utils/Scope.ts
var Scope_exports = {};
__export(Scope_exports, {
  Scope: () => Scope
});

// src/utils/ScopeBindings.ts
var ScopeBindings = class {
  constructor(p = null) {
    this._bindings = new OrderedSet();
    this.parent = p;
  }
  hasBinding(varName) {
    var _a;
    return this._bindings.has(varName) || !!((_a = this.parent) == null ? void 0 : _a.hasBinding(varName));
  }
  hasOwnBinding(varName) {
    return this._bindings.has(varName);
  }
  addBinding(varName) {
    this._bindings.add(varName);
  }
  removeBinding(varName) {
    this._bindings.delete(varName);
  }
  getAllBindings() {
    const allBindings = new OrderedSet(this._bindings.toArray());
    for (let { parent } = this; parent; parent = parent == null ? void 0 : parent.parent) {
      parent.getAllOwnedBindings().forEach((varName) => {
        allBindings.add(varName);
      });
    }
    return allBindings.toArray();
  }
  getAllOwnedBindings() {
    return this._bindings.toArray();
  }
};

// src/utils/Scope.ts
var Scope = class {
  constructor(parent = null) {
    this.parent = parent;
    this.bindings = void 0;
  }
  static createRootScope() {
    return new Scope();
  }
  createSubScope(ownIdentifiers) {
    const originalScopeBindings = this.bindings;
    const newScopeBindings = new ScopeBindings(originalScopeBindings);
    ownIdentifiers.forEach((identifier3) => {
      newScopeBindings.addBinding(identifier3);
    });
    const newScope = new Scope(this);
    newScope.bindings = newScopeBindings;
    return newScope;
  }
};

// src/plugins/component/react/containerInitState.ts
var pluginFactory4 = (config) => {
  const cfg = {
    fileType: "jsx" /* JSX */,
    implementType: "inConstructor",
    ...config
  };
  const plugin = async (pre) => {
    const next = {
      ...pre
    };
    const ir = next.ir;
    const scope = Scope.createRootScope();
    const state = ir.state || {};
    const fields = Object.keys(state).map((stateName) => {
      const value = generateCompositeType(state[stateName], scope);
      return `${stateName}: ${value},`;
    });
    if (cfg.implementType === "inConstructor") {
      next.chunks.push({
        type: "string" /* STRING */,
        fileType: cfg.fileType,
        name: CLASS_DEFINE_CHUNK_NAME.ConstructorContent,
        content: `this.state = { ${fields.join("")} };`,
        linkAfter: [...DEFAULT_LINK_AFTER[CLASS_DEFINE_CHUNK_NAME.ConstructorContent]]
      });
    } else if (cfg.implementType === "insMember") {
      next.chunks.push({
        type: "string" /* STRING */,
        fileType: cfg.fileType,
        name: CLASS_DEFINE_CHUNK_NAME.InsVar,
        content: `state = { ${fields.join("")} };`,
        linkAfter: [...DEFAULT_LINK_AFTER[CLASS_DEFINE_CHUNK_NAME.InsVar]]
      });
    }
    return next;
  };
  return plugin;
};
var containerInitState_default = pluginFactory4;

// src/plugins/component/react/containerInjectContext.ts
var pluginFactory5 = (config) => {
  const cfg = {
    fileType: "jsx" /* JSX */,
    ...config
  };
  const plugin = async (pre) => {
    const next = {
      ...pre
    };
    const ir = next.ir;
    const scope = Scope.createRootScope();
    const { inStrictMode } = next.contextData;
    if (!inStrictMode) {
      next.chunks.push({
        type: "string" /* STRING */,
        fileType: cfg.fileType,
        name: CLASS_DEFINE_CHUNK_NAME.InsVar,
        content: `
          _context = this;
        `,
        linkAfter: [CLASS_DEFINE_CHUNK_NAME.Start]
      });
    } else {
      next.chunks.push({
        type: "string" /* STRING */,
        fileType: cfg.fileType,
        name: CLASS_DEFINE_CHUNK_NAME.InsVar,
        content: `
          _context = this._createContext();
        `,
        linkAfter: [CLASS_DEFINE_CHUNK_NAME.Start]
      });
      next.chunks.push({
        type: "string" /* STRING */,
        fileType: cfg.fileType,
        name: CLASS_DEFINE_CHUNK_NAME.InsPrivateMethod,
        content: `
          _createContext() {
            const self = this;
            const context = {
              get state() { return self.state; },
              setState(newState, callback) { self.setState(newState, callback); },
              get dataSourceMap() { return self._dataSourceEngine.dataSourceMap || {}; },
              async reloadDataSource() { await self._dataSourceEngine.reloadDataSource(); },
              get utils() { return self.utils; },
              get page() { return context; },
              get component() { return context; },
              get props() { return self.props; },
              get constants() { return self.constants; },
              get $() { return self.$ },
              get $$() { return self.$$ },
              ...this._methods,
            };
  
            return context;
          }
        `,
        linkAfter: DEFAULT_LINK_AFTER[CLASS_DEFINE_CHUNK_NAME.InsPrivateMethod]
      });
    }
    return next;
  };
  return plugin;
};
var containerInjectContext_default = pluginFactory5;

// src/utils/pathHelper.ts
var pathHelper_exports = {};
__export(pathHelper_exports, {
  getSlotRelativePath: () => getSlotRelativePath
});
function relativePath(from, to) {
  const length = Math.min(from.length, to.length);
  let samePartsLength = length;
  for (let i = 0; i < length; i++) {
    if (from[i] !== to[i]) {
      samePartsLength = i;
      break;
    }
  }
  if (samePartsLength === 0) {
    return to;
  }
  let outputParts = [];
  for (let i = samePartsLength; i < from.length; i++) {
    outputParts.push("..");
  }
  outputParts = [...outputParts, ...to.slice(samePartsLength)];
  if (outputParts[0] !== "..") {
    outputParts.unshift(".");
  }
  return outputParts;
}
function getSlotRelativePath(options) {
  var _a, _b, _c;
  const { contextData, from, to } = options;
  const isSingleComponent = (_b = (_a = contextData == null ? void 0 : contextData.extraContextData) == null ? void 0 : _a.projectRemark) == null ? void 0 : _b.isSingleComponent;
  const template = (_c = contextData == null ? void 0 : contextData.extraContextData) == null ? void 0 : _c.template;
  let toPath = template.slots[to].path;
  toPath = [...toPath, template.slots[to].fileName];
  let fromPath = template.slots[from].path;
  if (!isSingleComponent && ["components", "pages"].indexOf(from) !== -1) {
    fromPath = [...fromPath, "pageName"];
  }
  return relativePath(fromPath, toPath).join("/");
}

// src/plugins/component/react/containerInjectUtils.ts
var pluginFactory6 = (config) => {
  const cfg = {
    fileType: "jsx" /* JSX */,
    ...config
  };
  const plugin = async (pre) => {
    var _a;
    const next = {
      ...pre
    };
    const ir = next.ir;
    next.contextData.useRefApi = true;
    const useRef = !!((_a = ir.analyzeResult) == null ? void 0 : _a.isUsingRef);
    next.chunks.push({
      type: "string" /* STRING */,
      fileType: cfg.fileType,
      name: COMMON_CHUNK_NAME.InternalDepsImport,
      content: `
        import utils${useRef ? ", { RefsManager }" : ""} from '${getSlotRelativePath({ contextData: next.contextData, from: "components", to: "utils" })}';
      `,
      linkAfter: [COMMON_CHUNK_NAME.ExternalDepsImport]
    });
    if (cfg.preferClassProperty) {
      next.chunks.push({
        type: "string" /* STRING */,
        fileType: cfg.fileType,
        name: CLASS_DEFINE_CHUNK_NAME.InsVar,
        content: "utils = utils;",
        linkAfter: [...DEFAULT_LINK_AFTER[CLASS_DEFINE_CHUNK_NAME.InsVar]]
      });
    } else {
      next.chunks.push({
        type: "string" /* STRING */,
        fileType: cfg.fileType,
        name: CLASS_DEFINE_CHUNK_NAME.ConstructorContent,
        content: "this.utils = utils;",
        linkAfter: [CLASS_DEFINE_CHUNK_NAME.ConstructorStart]
      });
    }
    if (useRef) {
      next.chunks.push({
        type: "string" /* STRING */,
        fileType: cfg.fileType,
        name: CLASS_DEFINE_CHUNK_NAME.ConstructorContent,
        content: "this._refsManager = new RefsManager();",
        linkAfter: [...DEFAULT_LINK_AFTER[CLASS_DEFINE_CHUNK_NAME.ConstructorContent]]
      });
      next.chunks.push({
        type: "string" /* STRING */,
        fileType: cfg.fileType,
        name: CLASS_DEFINE_CHUNK_NAME.InsMethod,
        content: `
          $ = (refName) => {
            return this._refsManager.get(refName);
          }
        `,
        linkAfter: [...DEFAULT_LINK_AFTER[CLASS_DEFINE_CHUNK_NAME.InsMethod]]
      });
      next.chunks.push({
        type: "string" /* STRING */,
        fileType: cfg.fileType,
        name: CLASS_DEFINE_CHUNK_NAME.InsMethod,
        content: `
          $$ = (refName) => {
            return this._refsManager.getAll(refName);
          }
        `,
        linkAfter: [...DEFAULT_LINK_AFTER[CLASS_DEFINE_CHUNK_NAME.InsMethod]]
      });
    } else {
      next.chunks.push({
        type: "string" /* STRING */,
        fileType: cfg.fileType,
        name: CLASS_DEFINE_CHUNK_NAME.InsMethod,
        content: " $ = () => null; ",
        linkAfter: [...DEFAULT_LINK_AFTER[CLASS_DEFINE_CHUNK_NAME.InsMethod]]
      });
      next.chunks.push({
        type: "string" /* STRING */,
        fileType: cfg.fileType,
        name: CLASS_DEFINE_CHUNK_NAME.InsMethod,
        content: " $$ = () => [];        ",
        linkAfter: [...DEFAULT_LINK_AFTER[CLASS_DEFINE_CHUNK_NAME.InsMethod]]
      });
    }
    return next;
  };
  return plugin;
};
var containerInjectUtils_default = pluginFactory6;

// src/plugins/component/react/containerInjectDataSourceEngine.ts
import {
  isJSExpression as isJSExpression4,
  isJSFunction as isJSFunction4
} from "@alilc/lowcode-types";
import changeCase5 from "change-case";
var pluginFactory7 = (config) => {
  const cfg = {
    ...config,
    fileType: (config == null ? void 0 : config.fileType) || "jsx" /* JSX */
  };
  const plugin = async (pre) => {
    const next = {
      ...pre
    };
    const scope = Scope.createRootScope();
    const dataSourceConfig = isValidContainerType(pre.ir) ? pre.ir.dataSource : null;
    const dataSourceItems = dataSourceConfig && dataSourceConfig.list || [];
    const dataSourceEngineOptions = { runtimeConfig: true };
    if (dataSourceItems.length > 0) {
      const requestHandlersMap = {};
      dataSourceItems.forEach((ds) => {
        var _a, _b;
        const dsType = ds.type || "fetch";
        if (!(dsType in requestHandlersMap) && dsType !== "custom") {
          const handlerFactoryName = `__$$create${changeCase5.pascal(dsType)}RequestHandler`;
          requestHandlersMap[dsType] = {
            type: "JSExpression",
            value: handlerFactoryName + (dsType === "urlParams" ? "(window.location.search)" : "()")
          };
          const handlerFactoryExportName = `create${changeCase5.pascal(dsType)}Handler`;
          const handlerPkgName = ((_b = (_a = cfg.datasourceConfig) == null ? void 0 : _a.handlersPackages) == null ? void 0 : _b[dsType]) || `@alilc/lowcode-datasource-${changeCase5.kebab(dsType)}-handler`;
          next.chunks.push({
            type: "string" /* STRING */,
            fileType: "jsx" /* JSX */,
            name: COMMON_CHUNK_NAME.ExternalDepsImport,
            content: `
              import { ${handlerFactoryExportName} as ${handlerFactoryName} } from '${handlerPkgName}';
            `,
            linkAfter: []
          });
        }
      });
      Object.assign(dataSourceEngineOptions, { requestHandlersMap });
      next.chunks.push({
        type: "string" /* STRING */,
        fileType: "jsx" /* JSX */,
        name: COMMON_CHUNK_NAME.ExternalDepsImport,
        content: `
          import { create as __$$createDataSourceEngine } from '@alilc/lowcode-datasource-engine/runtime';
        `,
        linkAfter: []
      });
      next.chunks.push({
        type: "string" /* STRING */,
        fileType: cfg.fileType,
        name: CLASS_DEFINE_CHUNK_NAME.InsVar,
        content: `
          _dataSourceConfig = this._defineDataSourceConfig();
          _dataSourceEngine = __$$createDataSourceEngine(
            this._dataSourceConfig,
            this,
            ${generateCompositeType(dataSourceEngineOptions, scope)}
          );

          get dataSourceMap() {
            return this._dataSourceEngine.dataSourceMap || {};
          }

          reloadDataSource = async () => {
            await this._dataSourceEngine.reloadDataSource();
          }

          `,
        linkAfter: [...DEFAULT_LINK_AFTER[CLASS_DEFINE_CHUNK_NAME.InsVar]]
      });
      next.chunks.unshift({
        type: "string" /* STRING */,
        fileType: cfg.fileType,
        name: REACT_CHUNK_NAME.ClassDidMountContent,
        content: `
          this._dataSourceEngine.reloadDataSource();
        `,
        linkAfter: [REACT_CHUNK_NAME.ClassDidMountStart]
      });
      next.chunks.push({
        type: "string" /* STRING */,
        fileType: cfg.fileType,
        name: CLASS_DEFINE_CHUNK_NAME.InsMethod,
        content: `
  _defineDataSourceConfig() {
    const _this = this;
    return (${generateCompositeType(
          {
            ...dataSourceConfig,
            list: [
              ...dataSourceItems.map((item) => ({
                ...item,
                isInit: wrapAsFunction(item.isInit, scope),
                options: wrapAsFunction(item.options, scope)
              }))
            ]
          },
          scope,
          {
            handlers: {
              function: (jsFunc) => parseExpressionConvertThis2Context(jsFunc.value, "_this"),
              expression: (jsExpr) => parseExpressionConvertThis2Context(jsExpr.value, "_this")
            }
          }
        )});
  }
        `,
        linkAfter: [...DEFAULT_LINK_AFTER[CLASS_DEFINE_CHUNK_NAME.InsMethod]]
      });
    }
    return next;
  };
  return plugin;
};
var containerInjectDataSourceEngine_default = pluginFactory7;
function wrapAsFunction(value, scope) {
  if (isJSExpression4(value) || isJSFunction4(value) || isJSExpressionFn(value)) {
    return {
      type: "JSExpression",
      value: `function(){ return ((${value.value}))}.bind(this)`
    };
  }
  return {
    type: "JSExpression",
    value: `function(){return((${generateCompositeType(value, scope)}))}.bind(this)`
  };
}

// src/plugins/component/react/containerInjectConstants.ts
var pluginFactory8 = (config) => {
  const cfg = {
    fileType: "jsx" /* JSX */,
    ...config
  };
  const plugin = async (pre) => {
    const next = {
      ...pre
    };
    next.chunks.push({
      type: "string" /* STRING */,
      fileType: cfg.fileType,
      name: COMMON_CHUNK_NAME.InternalDepsImport,
      content: "import __$$constants from '../../constants';",
      linkAfter: [COMMON_CHUNK_NAME.ExternalDepsImport]
    });
    next.chunks.push({
      type: "string" /* STRING */,
      fileType: cfg.fileType,
      name: CLASS_DEFINE_CHUNK_NAME.InsVar,
      content: `
        get constants() {
          return __$$constants || {};
        }
        `,
      linkAfter: [...DEFAULT_LINK_AFTER[CLASS_DEFINE_CHUNK_NAME.InsVar]]
    });
    return next;
  };
  return plugin;
};
var containerInjectConstants_default = pluginFactory8;

// src/plugins/component/react/containerInjectI18n.ts
var pluginFactory9 = (config) => {
  const cfg = {
    fileType: "jsx" /* JSX */,
    ...config
  };
  const plugin = async (pre) => {
    const next = {
      ...pre
    };
    next.chunks.push({
      type: "string" /* STRING */,
      fileType: cfg.fileType,
      name: COMMON_CHUNK_NAME.InternalDepsImport,
      content: `
        import * as __$$i18n from '${getSlotRelativePath({ contextData: next.contextData, from: "components", to: "i18n" })}';
      `,
      linkAfter: [COMMON_CHUNK_NAME.ExternalDepsImport]
    });
    next.chunks.push({
      type: "string" /* STRING */,
      fileType: cfg.fileType,
      name: CLASS_DEFINE_CHUNK_NAME.ConstructorContent,
      content: `
        __$$i18n._inject2(this);
      `,
      linkAfter: [...DEFAULT_LINK_AFTER[CLASS_DEFINE_CHUNK_NAME.ConstructorContent]]
    });
    return next;
  };
  return plugin;
};
var containerInjectI18n_default = pluginFactory9;

// src/plugins/component/react/containerLifeCycle.ts
import { isJSFunction as isJSFunction5, isJSExpression as isJSExpression5 } from "@alilc/lowcode-types";
var pluginFactory10 = (config) => {
  const cfg = {
    fileType: "jsx" /* JSX */,
    exportNameMapping: {},
    normalizeNameMapping: {},
    ...config
  };
  const plugin = async (pre) => {
    const next = {
      ...pre
    };
    const ir = next.ir;
    if (ir.lifeCycles) {
      const { lifeCycles } = ir;
      const chunks = Object.keys(lifeCycles).map((lifeCycleName) => {
        var _a;
        if (!isJSFunction5(lifeCycles[lifeCycleName]) && !isJSExpressionFn(lifeCycles[lifeCycleName]) && !isJSExpression5(lifeCycles[lifeCycleName])) {
          return null;
        }
        let normalizeName;
        if (lifeCycleName === "constructor") {
          normalizeName = lifeCycleName;
        } else {
          normalizeName = cfg.normalizeNameMapping[lifeCycleName] || lifeCycleName;
        }
        if ((_a = cfg == null ? void 0 : cfg.exclude) == null ? void 0 : _a.includes(normalizeName)) {
          return null;
        }
        const exportName = cfg.exportNameMapping[lifeCycleName] || lifeCycleName;
        if (normalizeName === "constructor") {
          return {
            type: "string" /* STRING */,
            fileType: cfg.fileType,
            name: CLASS_DEFINE_CHUNK_NAME.ConstructorContent,
            content: generateFunction(lifeCycles[lifeCycleName], { isBlock: true }),
            linkAfter: [...DEFAULT_LINK_AFTER[CLASS_DEFINE_CHUNK_NAME.ConstructorStart]]
          };
        }
        if (normalizeName === "componentDidMount") {
          return {
            type: "string" /* STRING */,
            fileType: cfg.fileType,
            name: REACT_CHUNK_NAME.ClassDidMountContent,
            content: generateFunction(lifeCycles[lifeCycleName], { isBlock: true }),
            linkAfter: [REACT_CHUNK_NAME.ClassDidMountStart]
          };
        }
        if (normalizeName === "render") {
          return {
            type: "string" /* STRING */,
            fileType: cfg.fileType,
            name: REACT_CHUNK_NAME.ClassRenderPre,
            content: generateFunction(lifeCycles[lifeCycleName], { isBlock: true }),
            linkAfter: [REACT_CHUNK_NAME.ClassRenderStart]
          };
        }
        return {
          type: "string" /* STRING */,
          fileType: cfg.fileType,
          name: CLASS_DEFINE_CHUNK_NAME.InsMethod,
          content: generateFunction(lifeCycles[lifeCycleName], {
            name: exportName,
            isMember: true
          }),
          linkAfter: [...DEFAULT_LINK_AFTER[CLASS_DEFINE_CHUNK_NAME.InsMethod]]
        };
      }).filter((i) => !!i);
      next.chunks.push(...chunks.filter((x) => x !== null));
    }
    return next;
  };
  return plugin;
};
var containerLifeCycle_default = pluginFactory10;

// src/plugins/component/react/containerMethod.ts
var pluginFactory11 = (config) => {
  const cfg = {
    fileType: "jsx" /* JSX */,
    ...config
  };
  const plugin = async (pre) => {
    const next = {
      ...pre
    };
    const ir = next.ir;
    const { inStrictMode } = next.contextData;
    if (!ir.methods) {
      return next;
    }
    const { methods } = ir;
    const chunks = Object.keys(methods).map((methodName) => ({
      type: "string" /* STRING */,
      fileType: cfg.fileType,
      name: CLASS_DEFINE_CHUNK_NAME.InsMethod,
      content: generateFunction(methods[methodName], { name: methodName, isMember: true }),
      linkAfter: [...DEFAULT_LINK_AFTER[CLASS_DEFINE_CHUNK_NAME.InsMethod]]
    }));
    next.chunks.push(...chunks);
    if (inStrictMode) {
      next.chunks.push({
        type: "string" /* STRING */,
        fileType: cfg.fileType,
        name: CLASS_DEFINE_CHUNK_NAME.ConstructorContent,
        content: Object.keys(ir.methods).map(
          (methodName) => isValidIdentifier(methodName) ? `.${methodName}` : `[${JSON.stringify(methodName)}]`
        ).map((method) => `this._context${method} = this${method};`).join("\n"),
        linkAfter: [...DEFAULT_LINK_AFTER[CLASS_DEFINE_CHUNK_NAME.ConstructorContent]]
      });
    }
    return next;
  };
  return plugin;
};
var containerMethod_default = pluginFactory11;

// src/utils/nodeToJSX.ts
var nodeToJSX_exports = {};
__export(nodeToJSX_exports, {
  createNodeGenerator: () => createNodeGenerator,
  createReactNodeGenerator: () => createReactNodeGenerator,
  generateConditionReactCtrl: () => generateConditionReactCtrl,
  generateReactExprInJS: () => generateReactExprInJS,
  generateReactLoopCtrl: () => generateReactLoopCtrl,
  isPureString: () => isPureString
});
import _4 from "lodash";
import { pipe } from "fp-ts/function";
import { isNodeSchema as isNodeSchema2 } from "@alilc/lowcode-types";

// src/utils/encodeJsxAttrString.ts
import _3 from "lodash";
var SPECIAL_CHARS = `
\r'"<>&`;
var SPECIAL_CHARS_REG = new RegExp(
  `[${SPECIAL_CHARS.split("").map((c) => `\\x${_3.padStart(c.charCodeAt(0).toString(16), 2, "0")}`).join("")}]`,
  "g"
);
function encodeJsxStringNode(str) {
  return str.replace(SPECIAL_CHARS_REG, (c) => `&#${c.charCodeAt(0)};`);
}

// src/core/jsx/handlers/transformThis2Context.ts
import generate3 from "@babel/generator";
function transformThis2Context(expr, scope, { ignoreRootScope = false } = {}) {
  var _a;
  if (ignoreRootScope && scope.parent == null) {
    return typeof expr === "string" ? expr : generate3(expr).code;
  }
  return parseExpressionConvertThis2Context(
    expr,
    "__$$context",
    ((_a = scope.bindings) == null ? void 0 : _a.getAllBindings()) || []
  );
}

// src/utils/nodeToJSX.ts
function mergeNodeGeneratorConfig(cfg1, cfg2 = {}) {
  const resCfg = {};
  if (cfg1.handlers || cfg2.handlers) {
    resCfg.handlers = {
      ...cfg1.handlers || {},
      ...cfg2.handlers || {}
    };
  }
  if (cfg1.tagMapping || cfg2.tagMapping) {
    resCfg.tagMapping = cfg2.tagMapping || cfg1.tagMapping;
  }
  if (cfg1.attrPlugins || cfg2.attrPlugins) {
    resCfg.attrPlugins = [];
    resCfg.attrPlugins.push(...cfg2.attrPlugins || []);
    resCfg.attrPlugins.push(...cfg1.attrPlugins || []);
  }
  if (cfg1.nodePlugins || cfg2.nodePlugins) {
    resCfg.nodePlugins = [];
    resCfg.nodePlugins.push(...cfg2.nodePlugins || []);
    resCfg.nodePlugins.push(...cfg1.nodePlugins || []);
  }
  return resCfg;
}
function isPureString(v) {
  return v[0] === "'" && v[v.length - 1] === "'" || v[0] === '"' && v[v.length - 1] === '"';
}
function generateAttrValue(attrData, scope, config) {
  const valueStr = generateCompositeType(attrData.attrValue, scope, {
    handlers: config == null ? void 0 : config.handlers,
    nodeGenerator: config == null ? void 0 : config.self
  });
  return [
    {
      type: "NodeCodePieceAttr" /* ATTR */,
      name: attrData.attrName,
      value: valueStr
    }
  ];
}
function generateAttr(attrName, attrValue, scope, config) {
  let pieces;
  if (config == null ? void 0 : config.attrPlugins) {
    pieces = executeFunctionStack(
      { attrName, attrValue },
      scope,
      config.attrPlugins,
      generateAttrValue,
      config
    );
  } else {
    pieces = generateAttrValue({ attrName, attrValue }, scope, config);
  }
  pieces = pieces.map((p) => {
    let newValue;
    if (p.value && isPureString(p.value)) {
      const content = getStaticExprValue(p.value);
      newValue = JSON.stringify(encodeJsxStringNode(content));
    } else {
      newValue = `{${p.value}}`;
    }
    return {
      value: `${p.name}=${newValue}`,
      type: "NodeCodePieceAttr" /* ATTR */
    };
  });
  return pieces;
}
function generateAttrs(nodeItem, scope, config) {
  const { props } = nodeItem;
  let pieces = [];
  if (props) {
    if (!Array.isArray(props)) {
      Object.keys(props).forEach((propName) => {
        if (isValidIdentifier(propName)) {
          pieces = pieces.concat(generateAttr(propName, props[propName], scope, config));
        }
      });
    } else {
      props.forEach((prop) => {
        if (prop.name && isValidIdentifier(prop.name) && !prop.spread) {
          pieces = pieces.concat(generateAttr(prop.name, prop.value, scope, config));
        }
      });
    }
  }
  return pieces;
}
function generateBasicNode(nodeItem, scope, config) {
  const pieces = [];
  const tagName = ((config == null ? void 0 : config.tagMapping) || _4.identity)(nodeItem.componentName);
  pieces.push({
    value: tagName || "",
    type: "NodeCodePieceTag" /* TAG */
  });
  return pieces;
}
function generateSimpleNode(nodeItem, scope, config) {
  const basicParts = generateBasicNode(nodeItem, scope, config) || [];
  const attrParts = generateAttrs(nodeItem, scope, config) || [];
  const childrenParts = [];
  if (nodeItem.children && (config == null ? void 0 : config.self)) {
    const childrenStr = config.self(nodeItem.children, scope);
    childrenParts.push({
      type: "NodeCodePieceChildren" /* CHILDREN */,
      value: childrenStr
    });
  }
  return [...basicParts, ...attrParts, ...childrenParts];
}
function linkPieces(pieces) {
  const tagsPieces = pieces.filter((p) => p.type === "NodeCodePieceTag" /* TAG */);
  if (tagsPieces.length !== 1) {
    throw new CodeGeneratorError("Only one tag definition required", tagsPieces);
  }
  const tagName = tagsPieces[0].value;
  const beforeParts = pieces.filter((p) => p.type === "NodeCodePieceBefore" /* BEFORE */).map((p) => p.value).join("");
  const afterParts = pieces.filter((p) => p.type === "NodeCodePieceAfter" /* AFTER */).map((p) => p.value).join("");
  const childrenParts = pieces.filter((p) => p.type === "NodeCodePieceChildren" /* CHILDREN */).map((p) => p.value).join("");
  let attrsParts = pieces.filter((p) => p.type === "NodeCodePieceAttr" /* ATTR */).map((p) => p.value).join(" ");
  attrsParts = attrsParts ? ` ${attrsParts}` : "";
  if (childrenParts) {
    return `${beforeParts}<${tagName}${attrsParts}>${childrenParts}</${tagName}>${afterParts}`;
  }
  return `${beforeParts}<${tagName}${attrsParts} />${afterParts}`;
}
function generateNodeSchema(nodeItem, scope, config) {
  const pieces = [];
  if (config == null ? void 0 : config.nodePlugins) {
    const res = executeFunctionStack(
      nodeItem,
      scope,
      config.nodePlugins,
      generateSimpleNode,
      config
    );
    pieces.push(...res);
  } else {
    pieces.push(...generateSimpleNode(nodeItem, scope, config));
  }
  return linkPieces(pieces);
}
function generateReactLoopCtrl(nodeItem, scope, config, next) {
  var _a, _b, _c;
  if (nodeItem.loop) {
    const tolerateEvalErrors = (_a = config == null ? void 0 : config.tolerateEvalErrors) != null ? _a : true;
    const loopItemName = ((_b = nodeItem.loopArgs) == null ? void 0 : _b[0]) || "item";
    const loopIndexName = ((_c = nodeItem.loopArgs) == null ? void 0 : _c[1]) || "index";
    const subScope = scope.createSubScope([loopItemName, loopIndexName]);
    const pieces = next ? next(nodeItem, subScope, config) : [];
    const loopDataExpr = pipe(
      nodeItem.loop,
      (expr) => generateCompositeType(expr, scope, {
        handlers: config == null ? void 0 : config.handlers,
        tolerateEvalErrors: false
      }),
      (expr) => transformThis2Context(expr, scope, { ignoreRootScope: true }),
      (expr) => tolerateEvalErrors ? `__$$evalArray(() => (${expr}))` : expr
    );
    pieces.unshift({
      value: `(${loopDataExpr}).map((${loopItemName}, ${loopIndexName}) => ((__$$context) => (`,
      type: "NodeCodePieceBefore" /* BEFORE */
    });
    pieces.push({
      value: `))(__$$createChildContext(__$$context, { ${loopItemName}, ${loopIndexName} })))`,
      type: "NodeCodePieceAfter" /* AFTER */
    });
    return pieces;
  }
  return next ? next(nodeItem, scope, config) : [];
}
function generateConditionReactCtrl(nodeItem, scope, config, next) {
  const pieces = next ? next(nodeItem, scope, config) : [];
  if (nodeItem.condition != null && nodeItem.condition !== true) {
    const value = generateCompositeType(nodeItem.condition, scope, {
      handlers: config == null ? void 0 : config.handlers
    });
    pieces.unshift({
      value: `!!(${value}) && (`,
      type: "NodeCodePieceBefore" /* BEFORE */
    });
    pieces.push({
      value: ")",
      type: "NodeCodePieceAfter" /* AFTER */
    });
  }
  return pieces;
}
function generateReactExprInJS(nodeItem, scope, config, next) {
  const pieces = next ? next(nodeItem, scope, config) : [];
  if (nodeItem.condition != null && nodeItem.condition !== true || nodeItem.loop != null) {
    pieces.unshift({
      value: "{",
      type: "NodeCodePieceBefore" /* BEFORE */
    });
    pieces.push({
      value: "}",
      type: "NodeCodePieceAfter" /* AFTER */
    });
  }
  return pieces;
}
var handleChildren = (v) => v.join("");
function createNodeGenerator(cfg = {}) {
  const generateNode = (nodeItem, scope) => {
    if (_4.isArray(nodeItem)) {
      const resList = nodeItem.map((n) => generateNode(n, scope));
      return handleChildren(resList);
    }
    if (isNodeSchema2(nodeItem)) {
      return generateNodeSchema(nodeItem, scope, {
        ...cfg,
        self: generateNode
      });
    }
    const valueStr = generateCompositeType(nodeItem, scope, {
      handlers: cfg.handlers,
      nodeGenerator: generateNode
    });
    if (isPureString(valueStr)) {
      return encodeJsxStringNode(getStaticExprValue(valueStr));
    }
    return `{${valueStr}}`;
  };
  return (nodeItem, scope) => unwrapJsExprQuoteInJsx(generateNode(nodeItem, scope));
}
var defaultReactGeneratorConfig = {
  nodePlugins: [generateReactExprInJS, generateReactLoopCtrl, generateConditionReactCtrl]
};
function createReactNodeGenerator(cfg) {
  const newCfg = mergeNodeGeneratorConfig(defaultReactGeneratorConfig, cfg);
  return createNodeGenerator(newCfg);
}

// src/core/jsx/util/isLiteralAtomicExpr.ts
function isLiteralAtomicExpr(expr) {
  return expr === "null" || expr === "undefined" || expr === "true" || expr === "false" || /^-?\d+(\.\d+)?$/.test(expr);
}

// src/core/jsx/util/isSimpleStraightLiteral.ts
function isSimpleStraightLiteral(expr) {
  switch (expr.type) {
    case "BigIntLiteral":
    case "BooleanLiteral":
    case "DecimalLiteral":
    case "NullLiteral":
    case "NumericLiteral":
    case "RegExpLiteral":
    case "StringLiteral":
      return true;
    default:
      return false;
  }
}

// src/core/jsx/handlers/transformJsExpression.ts
function transformJsExpr(expr, scope, { dontWrapEval = false, dontTransformThis2ContextAtRootScope = false } = {}) {
  if (!expr) {
    return "undefined";
  }
  if (isLiteralAtomicExpr(expr)) {
    return expr;
  }
  const exprAst = parseExpression2(expr);
  if (isSimpleStraightLiteral(exprAst)) {
    return expr;
  }
  if (dontWrapEval) {
    return transformThis2Context(exprAst, scope, {
      ignoreRootScope: dontTransformThis2ContextAtRootScope
    });
  }
  switch (exprAst.type) {
    case "ArrowFunctionExpression":
    case "FunctionExpression":
      return transformThis2Context(exprAst, scope, {
        ignoreRootScope: dontTransformThis2ContextAtRootScope
      });
    default:
      break;
  }
  return `__$$eval(() => (${transformThis2Context(exprAst, scope, {
    ignoreRootScope: dontTransformThis2ContextAtRootScope
  })}))`;
}

// src/plugins/component/react/jsx.ts
var pluginFactory12 = (config) => {
  const cfg = {
    fileType: "jsx" /* JSX */,
    nodeTypeMapping: {},
    ...config
  };
  const { nodeTypeMapping } = cfg;
  const plugin = async (pre) => {
    const next = {
      ...pre
    };
    const { tolerateEvalErrors = true, evalErrorsHandler = "" } = next.contextData;
    const customHandlers = {
      expression(input, scope2, config2) {
        var _a;
        return transformJsExpr(generateExpression(input, scope2), scope2, {
          dontWrapEval: !((_a = config2 == null ? void 0 : config2.tolerateEvalErrors) != null ? _a : tolerateEvalErrors),
          dontTransformThis2ContextAtRootScope: true
        });
      },
      function(input, scope2) {
        return transformThis2Context(
          generateCompositeType(
            {
              type: "JSFunction",
              value: input.value || "function () {}"
            },
            Scope.createRootScope()
          ),
          scope2,
          { ignoreRootScope: true }
        );
      }
    };
    const generatorPlugins = {
      handlers: customHandlers,
      tagMapping: (v) => nodeTypeMapping[v] || v,
      tolerateEvalErrors
    };
    if (next.contextData.useRefApi) {
      generatorPlugins.attrPlugins = [
        (attrData, scope2, pluginCfg, nextFunc) => {
          if (attrData.attrName === "ref") {
            return [
              {
                name: attrData.attrName,
                value: `this._refsManager.linkRef('${attrData.attrValue}')`,
                type: "NodeCodePieceAttr" /* ATTR */
              }
            ];
          }
          return nextFunc ? nextFunc(attrData, scope2, pluginCfg) : [];
        }
      ];
    }
    const generator = createReactNodeGenerator(generatorPlugins);
    const ir = next.ir;
    const scope = Scope.createRootScope();
    const jsxContent = generator(ir, scope);
    next.chunks.push({
      type: "string" /* STRING */,
      fileType: cfg.fileType,
      name: REACT_CHUNK_NAME.ClassRenderJSX,
      content: `
        const __$$context = this._context || this;
        const { state } = __$$context;
        return ${jsxContent};
      `,
      linkAfter: [REACT_CHUNK_NAME.ClassRenderStart, REACT_CHUNK_NAME.ClassRenderPre]
    });
    next.chunks.push({
      type: "string" /* STRING */,
      fileType: cfg.fileType,
      name: COMMON_CHUNK_NAME.CustomContent,
      content: [
        tolerateEvalErrors && `
          function __$$eval(expr) {
            try {
              return expr();
            } catch (error) {
              ${evalErrorsHandler}
            }
          }

          function __$$evalArray(expr) {
            const res = __$$eval(expr);
            return Array.isArray(res) ? res : [];
          }
      `,
        `
        function __$$createChildContext(oldContext, ext) {
          const childContext = {
            ...oldContext,
            ...ext,
          };
          childContext.__proto__ = oldContext;
          return childContext;
        }
      `
      ].filter(Boolean).join("\n"),
      linkAfter: [COMMON_CHUNK_NAME.FileExport]
    });
    return next;
  };
  return plugin;
};
var jsx_default = pluginFactory12;

// src/plugins/component/react/reactCommonDeps.ts
var pluginFactory13 = () => {
  const plugin = async (pre) => {
    const next = {
      ...pre
    };
    next.chunks.push({
      type: "string" /* STRING */,
      fileType: "jsx" /* JSX */,
      name: COMMON_CHUNK_NAME.ExternalDepsImport,
      content: `
// \u6CE8\u610F: \u51FA\u7801\u5F15\u64CE\u6CE8\u5165\u7684\u4E34\u65F6\u53D8\u91CF\u9ED8\u8BA4\u90FD\u4EE5 "__$$" \u5F00\u5934\uFF0C\u7981\u6B62\u5728\u642D\u5EFA\u7684\u4EE3\u7801\u4E2D\u76F4\u63A5\u8BBF\u95EE\u3002
// \u4F8B\u5916\uFF1Areact \u6846\u67B6\u7684\u5BFC\u51FA\u540D\u548C\u5404\u79CD\u7EC4\u4EF6\u540D\u9664\u5916\u3002
import React from 'react';`,
      linkAfter: []
    });
    return next;
  };
  return plugin;
};
var reactCommonDeps_default = pluginFactory13;

// src/plugins/component/style/css.ts
var pluginFactory14 = (config) => {
  const cfg = {
    fileType: "css" /* CSS */,
    moduleFileType: "jsx" /* JSX */,
    ...config
  };
  const plugin = async (pre) => {
    const next = {
      ...pre
    };
    const ir = next.ir;
    next.chunks.push({
      type: "string" /* STRING */,
      fileType: cfg.fileType,
      name: COMMON_CHUNK_NAME.StyleCssContent,
      content: ir.css,
      linkAfter: [COMMON_CHUNK_NAME.StyleDepsImport]
    });
    next.chunks.push({
      type: "string" /* STRING */,
      fileType: cfg.moduleFileType,
      name: COMMON_CHUNK_NAME.InternalDepsImport,
      content: `import './index.${cfg.fileType}';`,
      linkAfter: [COMMON_CHUNK_NAME.ExternalDepsImport]
    });
    return next;
  };
  return plugin;
};
var css_default = pluginFactory14;

// src/plugins/project/constants.ts
var pluginFactory15 = () => {
  const plugin = async (pre) => {
    const next = {
      ...pre
    };
    const ir = next.ir;
    const scope = Scope.createRootScope();
    const constantStr = generateCompositeType(ir.constants || {}, scope);
    next.chunks.push({
      type: "string" /* STRING */,
      fileType: "js" /* JS */,
      name: COMMON_CHUNK_NAME.FileVarDefine,
      content: `
        const __$$constants = (${constantStr});
      `,
      linkAfter: [
        COMMON_CHUNK_NAME.ExternalDepsImport,
        COMMON_CHUNK_NAME.InternalDepsImport,
        COMMON_CHUNK_NAME.ImportAliasDefine
      ]
    });
    next.chunks.push({
      type: "string" /* STRING */,
      fileType: "js" /* JS */,
      name: COMMON_CHUNK_NAME.FileExport,
      content: `
        export default __$$constants;
      `,
      linkAfter: [
        COMMON_CHUNK_NAME.ExternalDepsImport,
        COMMON_CHUNK_NAME.InternalDepsImport,
        COMMON_CHUNK_NAME.ImportAliasDefine,
        COMMON_CHUNK_NAME.FileVarDefine,
        COMMON_CHUNK_NAME.FileUtilDefine,
        COMMON_CHUNK_NAME.FileMainContent
      ]
    });
    return next;
  };
  return plugin;
};
var constants_default = pluginFactory15;

// src/plugins/project/i18n.ts
var pluginFactory16 = () => {
  const plugin = async (pre) => {
    const next = {
      ...pre
    };
    const ir = next.ir;
    const i18nStr = ir.i18n ? JSON.stringify(ir.i18n, null, 2) : "{}";
    next.chunks.push({
      type: "string" /* STRING */,
      fileType: "js" /* JS */,
      name: COMMON_CHUNK_NAME.FileMainContent,
      content: `
        const i18nConfig = ${i18nStr};

        let locale = typeof navigator === 'object' && typeof navigator.language === 'string' ? navigator.language : 'zh-CN';

        const getLocale = () => locale;

        const setLocale = (target) => {
          locale = target;
        };

        const isEmptyVariables = variables => (
          Array.isArray(variables) && variables.length === 0
          || typeof variables === 'object' && (!variables || Object.keys(variables).length === 0)
        );

        // \u6309\u4F4E\u4EE3\u7801\u89C4\u8303\u91CC\u9762\u7684\u8981\u6C42\u8FDB\u884C\u53D8\u91CF\u66FF\u6362
        const format = (msg, variables) => (
          typeof msg === 'string'
            ? msg.replace(/\\$?\\{(\\w+)\\}/g, (match, key) => variables?.[key] ?? '')
            : msg
        );

        const i18nFormat = ({ id, defaultMessage, fallback }, variables) => {
          const msg = i18nConfig[locale]?.[id] ??  i18nConfig[locale.replace('-', '_')]?.[id] ??  defaultMessage;
          if (msg == null) {
            console.warn('[i18n]: unknown message id: %o (locale=%o)', id, locale);
            return fallback === undefined ? \`\${id}\` : fallback;
          }

          return format(msg, variables);
        }

        const i18n = (id, params) => {
          return i18nFormat({ id }, params);
        };

        // \u5C06\u56FD\u9645\u5316\u7684\u4E00\u4E9B\u65B9\u6CD5\u6CE8\u5165\u5230\u76EE\u6807\u5BF9\u8C61&\u4E0A\u4E0B\u6587\u4E2D
        const _inject2 = (target) => {
          target.i18n = i18n;
          target.getLocale = getLocale;
          target.setLocale = (locale) => {
            setLocale(locale);
            target.forceUpdate();
          };
          target._i18nText = (t) => {
            // \u4F18\u5148\u53D6\u76F4\u63A5\u4F20\u8FC7\u6765\u7684\u8BED\u6599
            const localMsg = t[locale] ?? t[String(locale).replace('-', '_')]
            if (localMsg != null) {
              return format(localMsg, t.params);
            }

            // \u5176\u6B21\u7528\u9879\u76EE\u7EA7\u522B\u7684
            const projectMsg = i18nFormat({ id: t.key, fallback: null }, t.params);
            if (projectMsg != null) {
              return projectMsg;
            }

            // \u515C\u5E95\u7528 use \u6307\u5B9A\u7684\u6216\u9ED8\u8BA4\u8BED\u8A00\u7684
            return format(t[t.use || "zh-CN"] ?? t.en_US, t.params);
          }

          // \u6CE8\u5165\u5230\u4E0A\u4E0B\u6587\u4E2D\u53BB
          if (target._context && target._context !== target) {
            Object.assign(target._context, {
              i18n,
              getLocale, setLocale: target.setLocale
            });
          }
        }
      `,
      linkAfter: [
        COMMON_CHUNK_NAME.ExternalDepsImport,
        COMMON_CHUNK_NAME.InternalDepsImport,
        COMMON_CHUNK_NAME.ImportAliasDefine,
        COMMON_CHUNK_NAME.FileVarDefine,
        COMMON_CHUNK_NAME.FileUtilDefine
      ]
    });
    next.chunks.push({
      type: "string" /* STRING */,
      fileType: "js" /* JS */,
      name: COMMON_CHUNK_NAME.FileExport,
      content: `
        export {
          getLocale,
          setLocale,
          i18n,
          i18nFormat,
          _inject2,
        };
      `,
      linkAfter: [
        COMMON_CHUNK_NAME.ExternalDepsImport,
        COMMON_CHUNK_NAME.InternalDepsImport,
        COMMON_CHUNK_NAME.ImportAliasDefine,
        COMMON_CHUNK_NAME.FileVarDefine,
        COMMON_CHUNK_NAME.FileUtilDefine,
        COMMON_CHUNK_NAME.FileMainContent
      ]
    });
    return next;
  };
  return plugin;
};
var i18n_default = pluginFactory16;

// src/plugins/project/utils.ts
var pluginFactory17 = (baseFramework) => {
  const plugin = async (pre) => {
    const framework = baseFramework || "react";
    const next = {
      ...pre
    };
    const ir = next.ir;
    next.chunks.push({
      type: "string" /* STRING */,
      fileType: "js" /* JS */,
      name: COMMON_CHUNK_NAME.ExternalDepsImport,
      content: `
        import { createRef } from '${framework}';
      `,
      linkAfter: []
    });
    next.chunks.push({
      type: "string" /* STRING */,
      fileType: "js" /* JS */,
      name: COMMON_CHUNK_NAME.FileUtilDefine,
      content: `
        export class RefsManager {
          constructor() {
            this.refInsStore = {};
          }

          clearNullRefs() {
            Object.keys(this.refInsStore).forEach((refName) => {
              const filteredInsList = this.refInsStore[refName].filter(insRef => !!insRef.current);
              if (filteredInsList.length > 0) {
                this.refInsStore[refName] = filteredInsList;
              } else {
                delete this.refInsStore[refName];
              }
            });
          }

          get(refName) {
            this.clearNullRefs();
            if (this.refInsStore[refName] && this.refInsStore[refName].length > 0) {
              return this.refInsStore[refName][0].current;
            }

            return null;
          }

          getAll(refName) {
            this.clearNullRefs();
            if (this.refInsStore[refName] && this.refInsStore[refName].length > 0) {
              return this.refInsStore[refName].map(i => i.current);
            }

            return [];
          }

          linkRef(refName) {
            const refIns = createRef();
            this.refInsStore[refName] = this.refInsStore[refName] || [];
            this.refInsStore[refName].push(refIns);
            return refIns;
          }
        }
      `,
      linkAfter: [...DEFAULT_LINK_AFTER[COMMON_CHUNK_NAME.FileUtilDefine]]
    });
    if (ir.utils) {
      next.chunks.push({
        type: "string" /* STRING */,
        fileType: "js" /* JS */,
        name: COMMON_CHUNK_NAME.FileExport,
        content: `
          export default {
        `,
        linkAfter: [
          COMMON_CHUNK_NAME.ExternalDepsImport,
          COMMON_CHUNK_NAME.InternalDepsImport,
          COMMON_CHUNK_NAME.ImportAliasDefine,
          COMMON_CHUNK_NAME.FileVarDefine,
          COMMON_CHUNK_NAME.FileUtilDefine,
          COMMON_CHUNK_NAME.FileMainContent
        ]
      });
      ir.utils.forEach((util) => {
        if (util.type === "function") {
          next.chunks.push({
            type: "string" /* STRING */,
            fileType: "js" /* JS */,
            name: COMMON_CHUNK_NAME.FileVarDefine,
            content: `
              const ${util.name} = ${util.content.value};
            `,
            linkAfter: [
              COMMON_CHUNK_NAME.ExternalDepsImport,
              COMMON_CHUNK_NAME.InternalDepsImport,
              COMMON_CHUNK_NAME.ImportAliasDefine
            ]
          });
        }
        next.chunks.push({
          type: "string" /* STRING */,
          fileType: "js" /* JS */,
          name: COMMON_CHUNK_NAME.FileExport,
          content: `${util.name},`,
          linkAfter: [
            COMMON_CHUNK_NAME.ExternalDepsImport,
            COMMON_CHUNK_NAME.InternalDepsImport,
            COMMON_CHUNK_NAME.ImportAliasDefine,
            COMMON_CHUNK_NAME.FileVarDefine,
            COMMON_CHUNK_NAME.FileUtilDefine,
            COMMON_CHUNK_NAME.FileMainContent
          ]
        });
      });
      next.chunks.push({
        type: "string" /* STRING */,
        fileType: "js" /* JS */,
        name: COMMON_CHUNK_NAME.FileExport,
        content: `
          };
        `,
        linkAfter: [
          COMMON_CHUNK_NAME.ExternalDepsImport,
          COMMON_CHUNK_NAME.InternalDepsImport,
          COMMON_CHUNK_NAME.ImportAliasDefine,
          COMMON_CHUNK_NAME.FileVarDefine,
          COMMON_CHUNK_NAME.FileUtilDefine,
          COMMON_CHUNK_NAME.FileMainContent
        ]
      });
    }
    return next;
  };
  return plugin;
};
var utils_default = pluginFactory17;

// src/utils/templateHelper.ts
var templateHelper_exports = {};
__export(templateHelper_exports, {
  insertFile: () => insertFile,
  runFileGenerator: () => runFileGenerator
});
function insertFile(root, path, file2) {
  let current = root;
  path.forEach((pathNode) => {
    const dir = current.dirs.find((d) => d.name === pathNode);
    if (dir) {
      current = dir;
    } else {
      const newDir = createResultDir(pathNode);
      addDirectory(current, newDir);
      current = newDir;
    }
  });
  addFile(current, file2);
}
function runFileGenerator(root, fun) {
  try {
    const result = fun();
    const [path, file2] = result;
    insertFile(root, path, file2);
  } catch (error) {
    throw new Error(`Error: ${typeof fun}`);
  }
}

// src/plugins/project/framework/icejs/template/files/abc.json.ts
function getFile() {
  return [
    [],
    {
      name: "abc",
      ext: "json",
      content: `
{
  "type": "ice-app",
  "builder": "@ali/builder-ice-app"
}
    `
    }
  ];
}

// src/plugins/project/framework/icejs/template/files/build.json.ts
function getFile2() {
  return [
    [],
    {
      name: "build",
      ext: "json",
      content: `
{
  "entry": "src/app.js",
  "plugins": [
    [
      "build-plugin-fusion",
      {
        "themePackage": "@alifd/theme-design-pro"
      }
    ],
    [
      "build-plugin-moment-locales",
      {
        "locales": [
          "zh-cn"
        ]
      }
    ]
  ]
}
      `
    }
  ];
}

// src/plugins/project/framework/icejs/template/files/editorconfig.ts
function getFile3() {
  const file2 = createResultFile(
    ".editorconfig",
    "",
    `
# http://editorconfig.org
root = true

[*]
indent_style = space
indent_size = 2
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.md]
trim_trailing_whitespace = false
    `
  );
  return [[], file2];
}

// src/plugins/project/framework/icejs/template/files/eslintignore.ts
function getFile4() {
  const file2 = createResultFile(
    ".eslintignore",
    "",
    `
# \u5FFD\u7565\u76EE\u5F55
build/
tests/
demo/
.ice/

# node \u8986\u76D6\u7387\u6587\u4EF6
coverage/

# \u5FFD\u7565\u6587\u4EF6
**/*-min.js
**/*.min.js

package-lock.json
yarn.lock
    `
  );
  return [[], file2];
}

// src/plugins/project/framework/icejs/template/files/eslintrc.js.ts
function getFile5() {
  const file2 = createResultFile(
    ".eslintrc",
    "js",
    `
const { eslint } = require('@ice/spec');

module.exports = eslint;
    `
  );
  return [[], file2];
}

// src/plugins/project/framework/icejs/template/files/gitignore.ts
function getFile6() {
  const file2 = createResultFile(
    ".gitignore",
    "",
    `
# See https://help.github.com/ignore-files/ for more about ignoring files.

# dependencies
node_modules/

# production
build/
dist/
tmp/
lib/

# misc
.idea/
.happypack
.DS_Store
*.swp
*.dia~
.ice

npm-debug.log*
yarn-debug.log*
yarn-error.log*
index.module.scss.d.ts
    `
  );
  return [[], file2];
}

// src/plugins/project/framework/icejs/template/files/jsconfig.json.ts
function getFile7() {
  const file2 = createResultFile(
    "jsconfig",
    "json",
    `
{
  "compilerOptions": {
    "baseUrl": ".",
    "jsx": "react",
    "paths": {
      "@/*": ["./src/*"],
      "ice": [".ice/index.ts"],
      "ice/*": [".ice/pages/*"]
    }
  }
}
    `
  );
  return [[], file2];
}

// src/plugins/project/framework/icejs/template/files/prettierignore.ts
function getFile8() {
  const file2 = createResultFile(
    ".prettierignore",
    "",
    `
build/
tests/
demo/
.ice/
coverage/
**/*-min.js
**/*.min.js
package-lock.json
yarn.lock
    `
  );
  return [[], file2];
}

// src/plugins/project/framework/icejs/template/files/prettierrc.js.ts
function getFile9() {
  const file2 = createResultFile(
    ".prettierrc",
    "js",
    `
const { prettier } = require('@ice/spec');

module.exports = prettier;
    `
  );
  return [[], file2];
}

// src/plugins/project/framework/icejs/template/files/README.md.ts
function getFile10() {
  const file2 = createResultFile(
    "README",
    "md",
    `
## Scaffold Lite

> \u8F7B\u91CF\u7EA7\u6A21\u677F\uFF0C\u4F7F\u7528 JavaScript\uFF0C\u4EC5\u5305\u542B\u57FA\u7840\u7684 Layout\u3002

## \u4F7F\u7528

\`\`\`bash
# \u5B89\u88C5\u4F9D\u8D56
$ npm install

# \u542F\u52A8\u670D\u52A1
$ npm start  # visit http://localhost:3333
\`\`\`

[More docs](https://ice.work/docs/guide/about).

## \u76EE\u5F55

\`\`\`md
\u251C\u2500\u2500 build/                         # \u6784\u5EFA\u4EA7\u7269
\u251C\u2500\u2500 mock/                          # \u672C\u5730\u6A21\u62DF\u6570\u636E
\u2502   \u251C\u2500\u2500 index.[j,t]s
\u251C\u2500\u2500 public/
\u2502   \u251C\u2500\u2500 index.html                 # \u5E94\u7528\u5165\u53E3 HTML
\u2502   \u2514\u2500\u2500 favicon.png                # Favicon
\u251C\u2500\u2500 src/                           # \u6E90\u7801\u8DEF\u5F84
\u2502   \u251C\u2500\u2500 components/                # \u81EA\u5B9A\u4E49\u4E1A\u52A1\u7EC4\u4EF6
\u2502   \u2502   \u2514\u2500\u2500 Guide/
\u2502   \u2502       \u251C\u2500\u2500 index.[j,t]sx
\u2502   \u2502       \u251C\u2500\u2500 index.module.scss
\u2502   \u251C\u2500\u2500 layouts/                   # \u5E03\u5C40\u7EC4\u4EF6
\u2502   \u2502   \u2514\u2500\u2500 BasicLayout/
\u2502   \u2502       \u251C\u2500\u2500 index.[j,t]sx
\u2502   \u2502       \u2514\u2500\u2500 index.module.scss
\u2502   \u251C\u2500\u2500 pages/                     # \u9875\u9762
\u2502   \u2502   \u2514\u2500\u2500 Home/                  # home \u9875\u9762\uFF0C\u7EA6\u5B9A\u8DEF\u7531\u8F6C\u6210\u5C0F\u5199
\u2502   \u2502       \u251C\u2500\u2500 components/        # \u9875\u9762\u7EA7\u81EA\u5B9A\u4E49\u4E1A\u52A1\u7EC4\u4EF6
\u2502   \u2502       \u251C\u2500\u2500 models.[j,t]sx     # \u9875\u9762\u7EA7\u6570\u636E\u72B6\u6001
\u2502   \u2502       \u251C\u2500\u2500 index.[j,t]sx      # \u9875\u9762\u5165\u53E3
\u2502   \u2502       \u2514\u2500\u2500 index.module.scss  # \u9875\u9762\u6837\u5F0F\u6587\u4EF6
\u2502   \u251C\u2500\u2500 configs/                   # [\u53EF\u9009] \u914D\u7F6E\u6587\u4EF6
\u2502   \u2502   \u2514\u2500\u2500 menu.[j,t]s            # [\u53EF\u9009] \u83DC\u5355\u914D\u7F6E
\u2502   \u251C\u2500\u2500 models/                    # [\u53EF\u9009] \u5E94\u7528\u7EA7\u6570\u636E\u72B6\u6001
\u2502   \u2502   \u2514\u2500\u2500 user.[j,t]s
\u2502   \u251C\u2500\u2500 utils/                     # [\u53EF\u9009] \u5DE5\u5177\u5E93
\u2502   \u251C\u2500\u2500 global.scss                # \u5168\u5C40\u6837\u5F0F
\u2502   \u251C\u2500\u2500 routes.[j,t]s              # \u8DEF\u7531\u914D\u7F6E
\u2502   \u2514\u2500\u2500 app.[j,t]s[x]              # \u5E94\u7528\u5165\u53E3\u811A\u672C
\u251C\u2500\u2500 build.json                     # \u5DE5\u7A0B\u914D\u7F6E
\u251C\u2500\u2500 README.md
\u251C\u2500\u2500 package.json
\u251C\u2500\u2500 .editorconfig
\u251C\u2500\u2500 .eslintignore
\u251C\u2500\u2500 .eslintrc.[j,t]s
\u251C\u2500\u2500 .gitignore
\u251C\u2500\u2500 .stylelintignore
\u251C\u2500\u2500 .stylelintrc.[j,t]s
\u251C\u2500\u2500 .gitignore
\u2514\u2500\u2500 [j,t]sconfig.json
\`\`\`
    `
  );
  return [[], file2];
}

// src/plugins/project/framework/icejs/template/files/src/layouts/BasicLayout/components/Footer/index.jsx.ts
function getFile11() {
  const file2 = createResultFile(
    "index",
    "jsx",
    `
import React from 'react';
import styles from './index.module.scss';

export default function Footer() {
  return (
    <p className={styles.footer}>
      <span className={styles.logo}>Alibaba Fusion</span>
      <br />
      <span className={styles.copyright}>\xA9 2019-\u73B0\u5728 Alibaba Fusion & ICE</span>
    </p>
  );
}
    `
  );
  return [["src", "layouts", "BasicLayout", "components", "Footer"], file2];
}

// src/plugins/project/framework/icejs/template/files/src/layouts/BasicLayout/components/Footer/index.style.ts
function getFile12() {
  const file2 = createResultFile(
    "index",
    "module.scss",
    `
.footer {
  line-height: 20px;
  text-align: center;
}

.logo {
  font-weight: bold;
  font-size: 16px;
}

.copyright {
  font-size: 12px;
}
    `
  );
  return [["src", "layouts", "BasicLayout", "components", "Footer"], file2];
}

// src/plugins/project/framework/icejs/template/files/src/layouts/BasicLayout/components/Logo/index.jsx.ts
function getFile13() {
  const file2 = createResultFile(
    "index",
    "jsx",
    `
import React from 'react';
import { Link } from 'ice';
import styles from './index.module.scss';

export default function Logo({ image, text, url }) {
  return (
    <div className="logo">
      <Link to={url || '/'} className={styles.logo}>
        {image && <img src={image} alt="logo" />}
        <span>{text}</span>
      </Link>
    </div>
  );
}
    `
  );
  return [["src", "layouts", "BasicLayout", "components", "Logo"], file2];
}

// src/plugins/project/framework/icejs/template/files/src/layouts/BasicLayout/components/Logo/index.style.ts
function getFile14() {
  const file2 = createResultFile(
    "index",
    "module.scss",
    `
.logo{
  display: flex;
  align-items: center;
  justify-content: center;
  color: $color-text1-1;
  font-weight: bold;
  font-size: 14px;
  line-height: 22px;

  &:visited, &:link {
    color: $color-text1-1;
  }

  img {
    height: 24px;
    margin-right: 10px;
  }
}
    `
  );
  return [["src", "layouts", "BasicLayout", "components", "Logo"], file2];
}

// src/plugins/project/framework/icejs/template/files/src/layouts/BasicLayout/components/PageNav/index.jsx.ts
function getFile15() {
  const file2 = createResultFile(
    "index",
    "jsx",
    `
import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'ice';
import { Nav } from '@alifd/next';
import { asideMenuConfig } from '../../menuConfig';

const { SubNav } = Nav;
const NavItem = Nav.Item;

function getNavMenuItems(menusData) {
  if (!menusData) {
    return [];
  }

  return menusData
    .filter(item => item.name && !item.hideInMenu)
    .map((item, index) => getSubMenuOrItem(item, index));
}

function getSubMenuOrItem(item, index) {
  if (item.children && item.children.some(child => child.name)) {
    const childrenItems = getNavMenuItems(item.children);

    if (childrenItems && childrenItems.length > 0) {
      const subNav = (
        <SubNav key={index} icon={item.icon} label={item.name}>
          {childrenItems}
        </SubNav>
      );
      return subNav;
    }

    return null;
  }

  const navItem = (
    <NavItem key={item.path} icon={item.icon}>
      <Link to={item.path}>{item.name}</Link>
    </NavItem>
  );
  return navItem;
}

const Navigation = (props, context) => {
  const { location } = props;
  const { pathname } = location;
  const { isCollapse } = context;
  return (
    <Nav
      type="primary"
      selectedKeys={[pathname]}
      defaultSelectedKeys={[pathname]}
      embeddable
      openMode="single"
      iconOnly={isCollapse}
      hasArrow={false}
      mode={isCollapse ? 'popup' : 'inline'}
    >
      {getNavMenuItems(asideMenuConfig)}
    </Nav>
  );
};

Navigation.contextTypes = {
  isCollapse: PropTypes.bool,
};
const PageNav = withRouter(Navigation);
export default PageNav;
    `
  );
  return [["src", "layouts", "BasicLayout", "components", "PageNav"], file2];
}

// src/plugins/project/framework/icejs/template/files/src/layouts/BasicLayout/index.jsx.ts
function getFile16() {
  const file2 = createResultFile(
    "index",
    "jsx",
    `
import React, { useState } from 'react';
import { Shell, ConfigProvider } from '@alifd/next';
import PageNav from './components/PageNav';
import Logo from './components/Logo';
import Footer from './components/Footer';

(function() {
  const throttle = function(type, name, obj = window) {
    let running = false;

    const func = () => {
      if (running) {
        return;
      }

      running = true;
      requestAnimationFrame(() => {
        obj.dispatchEvent(new CustomEvent(name));
        running = false;
      });
    };

    obj.addEventListener(type, func);
  };

  throttle('resize', 'optimizedResize');
})();

export default function BasicLayout({ children }) {
  const getDevice = width => {
    const isPhone =
      typeof navigator !== 'undefined' && navigator && navigator.userAgent.match(/phone/gi);

    if (width < 680 || isPhone) {
      return 'phone';
    }
    if (width < 1280 && width > 680) {
      return 'tablet';
    }
    return 'desktop';
  };

  const [device, setDevice] = useState(getDevice(NaN));
  window.addEventListener('optimizedResize', e => {
    setDevice(getDevice(e && e.target && e.target.innerWidth));
  });
  return (
    <ConfigProvider device={device}>
      <Shell
        type="dark"
        style={{
          minHeight: '100vh',
        }}
      >
        <Shell.Branding>
          <Logo
            image="https://img.alicdn.com/tfs/TB1.ZBecq67gK0jSZFHXXa9jVXa-904-826.png"
            text="Logo"
          />
        </Shell.Branding>
        <Shell.Navigation
          direction="hoz"
          style={{
            marginRight: 10,
          }}
        ></Shell.Navigation>
        <Shell.Action></Shell.Action>
        <Shell.Navigation>
          <PageNav />
        </Shell.Navigation>

        <Shell.Content>{children}</Shell.Content>
        <Shell.Footer>
          <Footer />
        </Shell.Footer>
      </Shell>
    </ConfigProvider>
  );
}
    `
  );
  return [["src", "layouts", "BasicLayout"], file2];
}

// src/plugins/project/framework/icejs/template/files/src/layouts/BasicLayout/menuConfig.js.ts
function getFile17() {
  const file2 = createResultFile(
    "menuConfig",
    "js",
    `
const headerMenuConfig = [];
const asideMenuConfig = [
  {
    name: 'Dashboard',
    path: '/',
    icon: 'smile',
  },
];
export { headerMenuConfig, asideMenuConfig };
    `
  );
  return [["src", "layouts", "BasicLayout"], file2];
}

// src/plugins/project/framework/icejs/template/files/stylelintignore.ts
function getFile18() {
  const file2 = createResultFile(
    ".stylelintignore",
    "",
    `
# \u5FFD\u7565\u76EE\u5F55
build/
tests/
demo/

# node \u8986\u76D6\u7387\u6587\u4EF6
coverage/
    `
  );
  return [[], file2];
}

// src/plugins/project/framework/icejs/template/files/stylelintrc.js.ts
function getFile19() {
  const file2 = createResultFile(
    ".stylelintrc",
    "js",
    `
const { stylelint } = require('@ice/spec');

module.exports = stylelint;
    `
  );
  return [[], file2];
}

// src/plugins/project/framework/icejs/template/files/tsconfig.json.ts
function getFile20() {
  const file2 = createResultFile(
    "tsconfig",
    "json",
    `
{
  "compileOnSave": false,
  "buildOnSave": false,
  "compilerOptions": {
    "baseUrl": ".",
    "outDir": "build",
    "module": "esnext",
    "target": "es6",
    "jsx": "react",
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "lib": ["es6", "dom"],
    "sourceMap": true,
    "allowJs": true,
    "rootDir": "./",
    "forceConsistentCasingInFileNames": true,
    "noImplicitReturns": true,
    "noImplicitThis": true,
    "noImplicitAny": false,
    "importHelpers": true,
    "strictNullChecks": true,
    "suppressImplicitAnyIndexErrors": true,
    "noUnusedLocals": true,
    "skipLibCheck": true,
    "paths": {
      "@/*": ["./src/*"],
      "ice": [".ice/index.ts"],
      "ice/*": [".ice/pages/*"]
    }
  },
  "include": ["src/*", ".ice"],
  "exclude": ["node_modules", "build", "public"]
}
    `
  );
  return [[], file2];
}

// src/plugins/project/framework/icejs/template/static-files.ts
function generateStaticFiles(root = createResultDir(".")) {
  runFileGenerator(root, getFile20);
  runFileGenerator(root, getFile19);
  runFileGenerator(root, getFile18);
  runFileGenerator(root, getFile9);
  runFileGenerator(root, getFile8);
  runFileGenerator(root, getFile7);
  runFileGenerator(root, getFile6);
  runFileGenerator(root, getFile5);
  runFileGenerator(root, getFile4);
  runFileGenerator(root, getFile3);
  runFileGenerator(root, getFile2);
  runFileGenerator(root, getFile);
  runFileGenerator(root, getFile10);
  runFileGenerator(root, getFile16);
  runFileGenerator(root, getFile17);
  runFileGenerator(root, getFile11);
  runFileGenerator(root, getFile12);
  runFileGenerator(root, getFile13);
  runFileGenerator(root, getFile14);
  runFileGenerator(root, getFile15);
  return root;
}

// src/plugins/project/framework/icejs/template/index.ts
var icejsTemplate = {
  slots: {
    components: {
      path: ["src", "components"]
    },
    pages: {
      path: ["src", "pages"]
    },
    router: {
      path: ["src"],
      fileName: "routes"
    },
    entry: {
      path: ["src"],
      fileName: "app"
    },
    constants: {
      path: ["src"],
      fileName: "constants"
    },
    utils: {
      path: ["src"],
      fileName: "utils"
    },
    i18n: {
      path: ["src"],
      fileName: "i18n"
    },
    globalStyle: {
      path: ["src"],
      fileName: "global"
    },
    htmlEntry: {
      path: ["public"],
      fileName: "index"
    },
    packageJSON: {
      path: [],
      fileName: "package"
    }
  },
  generateTemplate() {
    return generateStaticFiles();
  }
};
var template_default = icejsTemplate;

// src/plugins/project/framework/icejs/plugins/entry.ts
var pluginFactory18 = () => {
  const plugin = async (pre) => {
    const next = {
      ...pre
    };
    next.chunks.push({
      type: "string" /* STRING */,
      fileType: "js" /* JS */,
      name: COMMON_CHUNK_NAME.ExternalDepsImport,
      content: `
        import { createApp } from 'ice';
      `,
      linkAfter: []
    });
    next.chunks.push({
      type: "string" /* STRING */,
      fileType: "js" /* JS */,
      name: COMMON_CHUNK_NAME.FileMainContent,
      content: `
        const appConfig = {
          app: {
            rootId: 'app',
          },
          router: {
            type: 'hash',
          },
        };
        createApp(appConfig);
      `,
      linkAfter: [
        COMMON_CHUNK_NAME.ExternalDepsImport,
        COMMON_CHUNK_NAME.InternalDepsImport,
        COMMON_CHUNK_NAME.ImportAliasDefine,
        COMMON_CHUNK_NAME.FileVarDefine,
        COMMON_CHUNK_NAME.FileUtilDefine
      ]
    });
    return next;
  };
  return plugin;
};
var entry_default = pluginFactory18;

// src/plugins/project/framework/icejs/plugins/entryHtml.ts
var pluginFactory19 = () => {
  const plugin = async (pre) => {
    var _a;
    const next = {
      ...pre
    };
    const ir = next.ir;
    next.chunks.push({
      type: "string" /* STRING */,
      fileType: "html" /* HTML */,
      name: COMMON_CHUNK_NAME.HtmlContent,
      content: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8" />
            <meta http-equiv="x-ua-compatible" content="ie=edge,chrome=1" />
            <meta name="viewport" content="width=device-width" />
            <title>${((_a = ir == null ? void 0 : ir.meta) == null ? void 0 : _a.name) || "Ice App"}</title>
          </head>
          <body>
            <div id="app"></div>
          </body>
        </html>
      `,
      linkAfter: []
    });
    return next;
  };
  return plugin;
};
var entryHtml_default = pluginFactory19;

// src/plugins/project/framework/icejs/plugins/globalStyle.ts
var pluginFactory20 = () => {
  const plugin = async (pre) => {
    const next = {
      ...pre
    };
    const ir = next.ir;
    next.chunks.push({
      type: "string" /* STRING */,
      fileType: "scss" /* SCSS */,
      name: COMMON_CHUNK_NAME.StyleDepsImport,
      content: `
        // \u5F15\u5165\u9ED8\u8BA4\u5168\u5C40\u6837\u5F0F
        @import '@alifd/next/reset.scss';
      `,
      linkAfter: []
    });
    next.chunks.push({
      type: "string" /* STRING */,
      fileType: "scss" /* SCSS */,
      name: COMMON_CHUNK_NAME.StyleCssContent,
      content: `
        body {
          -webkit-font-smoothing: antialiased;
        }
      `,
      linkAfter: [COMMON_CHUNK_NAME.StyleDepsImport]
    });
    next.chunks.push({
      type: "string" /* STRING */,
      fileType: "scss" /* SCSS */,
      name: COMMON_CHUNK_NAME.StyleCssContent,
      content: ir.css || "",
      linkAfter: [COMMON_CHUNK_NAME.StyleDepsImport]
    });
    return next;
  };
  return plugin;
};
var globalStyle_default = pluginFactory20;

// src/utils/dataSource.ts
var dataSource_exports = {};
__export(dataSource_exports, {
  buildDataSourceDependencies: () => buildDataSourceDependencies
});
import changeCase6 from "change-case";
function buildDataSourceDependencies(ir, cfg = {}) {
  return {
    [cfg.enginePackage || "@alilc/lowcode-datasource-engine"]: cfg.engineVersion || "^1.0.0",
    ...(ir.dataSourcesTypes || []).reduce(
      (acc, dsType) => {
        var _a;
        return {
          ...acc,
          [getDataSourceHandlerPackageName(dsType)]: ((_a = cfg.handlersVersion) == null ? void 0 : _a[dsType]) || "^1.0.0"
        };
      },
      {}
    )
  };
  function getDataSourceHandlerPackageName(dsType) {
    var _a;
    return ((_a = cfg.handlersPackages) == null ? void 0 : _a[dsType]) || `@alilc/lowcode-datasource-${changeCase6.kebab(dsType)}-handler`;
  }
}

// src/plugins/project/framework/icejs/plugins/packageJSON.ts
var pluginFactory21 = (cfg) => {
  const plugin = async (pre) => {
    const next = {
      ...pre
    };
    const ir = next.ir;
    const packageJson = {
      name: (cfg == null ? void 0 : cfg.packageName) || "icejs-demo-app",
      version: (cfg == null ? void 0 : cfg.packageVersion) || "0.1.5",
      description: "\u8F7B\u91CF\u7EA7\u6A21\u677F\uFF0C\u4F7F\u7528 JavaScript\uFF0C\u4EC5\u5305\u542B\u57FA\u7840\u7684 Layout\u3002",
      dependencies: {
        moment: "^2.24.0",
        react: "^16.4.1",
        "react-dom": "^16.4.1",
        "react-router": "^5.2.1",
        "@alifd/theme-design-pro": "^0.x",
        "intl-messageformat": "^9.3.6",
        "@ice/store": "^1.4.3",
        "@loadable/component": "^5.15.2",
        ...buildDataSourceDependencies(ir, cfg == null ? void 0 : cfg.datasourceConfig)
      },
      devDependencies: {
        "@ice/spec": "^1.0.0",
        "build-plugin-fusion": "^0.1.0",
        "build-plugin-moment-locales": "^0.1.0",
        eslint: "^6.0.1",
        "ice.js": "^1.0.0",
        stylelint: "^13.2.0"
      },
      scripts: {
        start: "icejs start",
        build: "icejs build",
        lint: "npm run eslint && npm run stylelint",
        eslint: "eslint --cache --ext .js,.jsx ./",
        stylelint: "stylelint ./**/*.scss"
      },
      ideMode: {
        name: "ice-react"
      },
      iceworks: {
        type: "react",
        adapter: "adapter-react-v3"
      },
      engines: {
        node: ">=8.0.0"
      },
      repository: {
        type: "git",
        url: "http://gitlab.xxx.com/msd/leak-scan/tree/master"
      },
      private: true,
      originTemplate: "@alifd/scaffold-lite-js"
    };
    ir.packages.forEach((packageInfo) => {
      packageJson.dependencies[packageInfo.package] = packageInfo.version;
    });
    next.chunks.push({
      type: "json" /* JSON */,
      fileType: "json" /* JSON */,
      name: COMMON_CHUNK_NAME.FileMainContent,
      content: packageJson,
      linkAfter: []
    });
    return next;
  };
  return plugin;
};
var packageJSON_default = pluginFactory21;

// src/plugins/project/framework/icejs/plugins/router.ts
var pluginFactory22 = () => {
  const plugin = async (pre) => {
    const next = {
      ...pre
    };
    const ir = next.ir;
    next.chunks.push({
      type: "string" /* STRING */,
      fileType: "js" /* JS */,
      name: COMMON_CHUNK_NAME.InternalDepsImport,
      content: `
        import BasicLayout from '@/layouts/BasicLayout';
      `,
      linkAfter: [COMMON_CHUNK_NAME.ExternalDepsImport]
    });
    next.chunks.push({
      type: "string" /* STRING */,
      fileType: "js" /* JS */,
      name: COMMON_CHUNK_NAME.FileVarDefine,
      content: `
        const routerConfig = [
          {
            path: '/',
            component: BasicLayout,
            children: [
              ${ir.routes.map(
        (route) => `
                    {
                      path: '${route.path}',
                      component: ${route.componentName},
                    }
                  `
      ).join(",")}
            ],
          },
        ];
      `,
      linkAfter: [
        COMMON_CHUNK_NAME.ExternalDepsImport,
        COMMON_CHUNK_NAME.InternalDepsImport,
        COMMON_CHUNK_NAME.ImportAliasDefine,
        COMMON_CHUNK_NAME.FileUtilDefine
      ]
    });
    next.chunks.push({
      type: "string" /* STRING */,
      fileType: "js" /* JS */,
      name: COMMON_CHUNK_NAME.FileExport,
      content: `
        export default routerConfig;
      `,
      linkAfter: [
        COMMON_CHUNK_NAME.ExternalDepsImport,
        COMMON_CHUNK_NAME.InternalDepsImport,
        COMMON_CHUNK_NAME.FileUtilDefine,
        COMMON_CHUNK_NAME.ImportAliasDefine,
        COMMON_CHUNK_NAME.FileVarDefine,
        COMMON_CHUNK_NAME.FileMainContent
      ]
    });
    return next;
  };
  return plugin;
};
var router_default = pluginFactory22;

// src/plugins/project/framework/icejs/index.ts
var icejs_default = {
  template: template_default,
  plugins: {
    entry: entry_default,
    entryHtml: entryHtml_default,
    globalStyle: globalStyle_default,
    packageJSON: packageJSON_default,
    router: router_default
  }
};

// src/postprocessor/prettier/index.ts
import prettier from "prettier";
import parserBabel from "prettier/parser-babel";
import parserPostCss from "prettier/parser-postcss";
import parserHtml from "prettier/parser-html";
var PARSERS = ["css", "scss", "less", "json", "html", "vue"];
var factory = (config) => {
  const cfg = {
    customFileTypeParser: {},
    ...config
  };
  const codePrettier = (content, fileType) => {
    let parser3;
    if (fileType === "js" || fileType === "jsx" || fileType === "ts" || fileType === "tsx") {
      parser3 = "babel-ts";
    } else if (fileType === "json") {
      parser3 = "json-stringify";
    } else if (PARSERS.indexOf(fileType) >= 0) {
      parser3 = fileType;
    } else if (cfg.customFileTypeParser[fileType]) {
      parser3 = cfg.customFileTypeParser[fileType];
    } else {
      return content;
    }
    return prettier.format(content, {
      parser: parser3,
      plugins: [parserBabel, parserPostCss, parserHtml, ...cfg.plugins || []],
      singleQuote: true,
      jsxSingleQuote: false
    });
  };
  return codePrettier;
};
var prettier_default = factory;

// src/solutions/icejs.ts
function createIceJsProjectBuilder(options) {
  return createProjectBuilder({
    inStrictMode: options == null ? void 0 : options.inStrictMode,
    extraContextData: { ...options },
    template: icejs_default.template,
    plugins: {
      components: [
        reactCommonDeps_default(),
        esmodule_default({
          fileType: "jsx"
        }),
        styleImport_default(),
        containerClass_default(),
        containerInjectContext_default(),
        containerInjectUtils_default(),
        containerInjectDataSourceEngine_default(),
        containerInjectI18n_default(),
        containerInjectConstants_default(),
        containerInitState_default(),
        containerLifeCycle_default(),
        containerMethod_default(),
        jsx_default({
          nodeTypeMapping: {
            Div: "div",
            Component: "div",
            Page: "div",
            Block: "div"
          }
        }),
        css_default()
      ],
      pages: [
        reactCommonDeps_default(),
        esmodule_default({
          fileType: "jsx"
        }),
        styleImport_default(),
        containerClass_default(),
        containerInjectContext_default(),
        containerInjectUtils_default(),
        containerInjectDataSourceEngine_default(),
        containerInjectI18n_default(),
        containerInjectConstants_default(),
        containerInitState_default(),
        containerLifeCycle_default(),
        containerMethod_default(),
        jsx_default({
          nodeTypeMapping: {
            Div: "div",
            Component: "div",
            Page: "div",
            Block: "div"
          }
        }),
        css_default()
      ],
      router: [esmodule_default(), icejs_default.plugins.router()],
      entry: [icejs_default.plugins.entry()],
      constants: [constants_default()],
      utils: [esmodule_default(), utils_default("react")],
      i18n: [i18n_default()],
      globalStyle: [icejs_default.plugins.globalStyle()],
      htmlEntry: [icejs_default.plugins.entryHtml()],
      packageJSON: [icejs_default.plugins.packageJSON()]
    },
    postProcessors: [prettier_default()],
    customizeBuilderOptions: options == null ? void 0 : options.customizeBuilderOptions
  });
}
var plugins = {
  containerClass: containerClass_default,
  containerInjectContext: containerInjectContext_default,
  containerInjectUtils: containerInjectUtils_default,
  containerInjectDataSourceEngine: containerInjectDataSourceEngine_default,
  containerInjectI18n: containerInjectI18n_default,
  containerInjectConstants: containerInjectConstants_default,
  containerInitState: containerInitState_default,
  containerLifeCycle: containerLifeCycle_default,
  containerMethod: containerMethod_default,
  jsx: jsx_default,
  commonDeps: reactCommonDeps_default,
  reactCommonDeps: reactCommonDeps_default
};

// src/plugins/project/framework/icejs3/template/files/gitignore.ts
function getFile21() {
  const file2 = createResultFile(
    ".gitignore",
    "",
    `
# See https://help.github.com/ignore-files/ for more about ignoring files.

# dependencies
node_modules/

# production
build/
dist/
tmp/
lib/

# misc
.idea/
.happypack
.DS_Store
*.swp
*.dia~
.ice

npm-debug.log*
yarn-debug.log*
yarn-error.log*
index.module.scss.d.ts
    `
  );
  return [[], file2];
}

// src/plugins/project/framework/icejs3/template/files/README.md.ts
function getFile22() {
  const file2 = createResultFile(
    "README",
    "md",
    "This project is generated by lowcode-code-generator & lowcode-solution-icejs3."
  );
  return [[], file2];
}

// src/plugins/project/framework/icejs3/template/files/browserslistrc.ts
function getFile23() {
  const file2 = createResultFile(
    ".browserslistrc",
    "",
    `defaults
ios_saf 9
    `
  );
  return [[], file2];
}

// src/plugins/project/framework/icejs3/template/files/typings.ts
function getFile24() {
  const file2 = createResultFile(
    "typings.d",
    "ts",
    `/// <reference types="@ice/app/types" />

export {};
declare global {
  interface Window {
    g_config: Record<string, any>;
  }
}
    `
  );
  return [["src"], file2];
}

// src/plugins/project/framework/icejs3/template/files/document.ts
function getFile25() {
  const file2 = createResultFile(
    "document",
    "tsx",
    `import React from 'react';
import { Meta, Title, Links, Main, Scripts } from 'ice';

export default function Document() {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="description" content="ice.js 3 lite scaffold" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="//alifd.alicdn.com/npm/@alifd/next/1.21.16/next.min.css" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <Meta />
        <Title />
        <Links />
      </head>
      <body>
        <Main />
        <script crossOrigin="anonymous" src="//g.alicdn.com/code/lib/react/18.2.0/umd/react.development.js" />
        <script crossOrigin="anonymous" src="//g.alicdn.com/code/lib/react-dom/18.2.0/umd/react-dom.development.js" />
        <script crossOrigin="anonymous" src="//g.alicdn.com/code/lib/??react-router/6.9.0/react-router.production.min.js,react-router-dom/6.9.0/react-router-dom.production.min.js" />
        <script crossOrigin="anonymous" src="//g.alicdn.com/code/lib/alifd__next/1.26.22/next.min.js" />
        <script crossOrigin="anonymous" src="//g.alicdn.com/code/lib/prop-types/15.7.2/prop-types.js" />
        <script crossOrigin="anonymous" src="//g.alicdn.com/platform/c/??lodash/4.6.1/lodash.min.js,immutable/3.7.6/dist/immutable.min.js" />
        <Scripts />
      </body>
    </html>
  );
}`
  );
  return [["src"], file2];
}

// src/plugins/project/framework/icejs3/template/files/src/layouts/BasicLayout/components/Footer/index.jsx.ts
function getFile26() {
  const file2 = createResultFile(
    "index",
    "jsx",
    `
import React from 'react';
import styles from './index.module.scss';

export default function Footer() {
  return (
    <p className={styles.footer}>
      <span className={styles.logo}>Alibaba Fusion</span>
      <br />
      <span className={styles.copyright}>\xA9 2019-\u73B0\u5728 Alibaba Fusion & ICE</span>
    </p>
  );
}
    `
  );
  return [["src", "layouts", "BasicLayout", "components", "Footer"], file2];
}

// src/plugins/project/framework/icejs3/template/files/src/layouts/BasicLayout/components/Footer/index.style.ts
function getFile27() {
  const file2 = createResultFile(
    "index",
    "module.scss",
    `
.footer {
  line-height: 20px;
  text-align: center;
}

.logo {
  font-weight: bold;
  font-size: 16px;
}

.copyright {
  font-size: 12px;
}
    `
  );
  return [["src", "layouts", "BasicLayout", "components", "Footer"], file2];
}

// src/plugins/project/framework/icejs3/template/files/src/layouts/BasicLayout/components/Logo/index.jsx.ts
function getFile28() {
  const file2 = createResultFile(
    "index",
    "jsx",
    `
import React from 'react';
import { Link } from 'ice';
import styles from './index.module.scss';

export default function Logo({ image, text, url }) {
  return (
    <div className="logo">
      <Link to={url || '/'} className={styles.logo}>
        {image && <img src={image} alt="logo" />}
        <span>{text}</span>
      </Link>
    </div>
  );
}
    `
  );
  return [["src", "layouts", "BasicLayout", "components", "Logo"], file2];
}

// src/plugins/project/framework/icejs3/template/files/src/layouts/BasicLayout/components/Logo/index.style.ts
function getFile29() {
  const file2 = createResultFile(
    "index",
    "module.scss",
    `
.logo{
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FF7300;
  font-weight: bold;
  font-size: 14px;
  line-height: 22px;

  &:visited, &:link {
    color: #FF7300;
  }

  img {
    height: 24px;
    margin-right: 10px;
  }
}
    `
  );
  return [["src", "layouts", "BasicLayout", "components", "Logo"], file2];
}

// src/plugins/project/framework/icejs3/template/files/src/layouts/BasicLayout/components/PageNav/index.jsx.ts
function getFile30() {
  const file2 = createResultFile(
    "index",
    "jsx",
    `import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'ice';
import { Nav } from '@alifd/next';
import { asideMenuConfig } from '../../menuConfig';

const { SubNav } = Nav;
const NavItem = Nav.Item;

function getNavMenuItems(menusData) {
  if (!menusData) {
    return [];
  }

  return menusData
    .filter(item => item.name && !item.hideInMenu)
    .map((item, index) => getSubMenuOrItem(item, index));
}

function getSubMenuOrItem(item, index) {
  if (item.children && item.children.some(child => child.name)) {
    const childrenItems = getNavMenuItems(item.children);

    if (childrenItems && childrenItems.length > 0) {
      const subNav = (
        <SubNav key={index} icon={item.icon} label={item.name}>
          {childrenItems}
        </SubNav>
      );
      return subNav;
    }

    return null;
  }

  const navItem = (
    <NavItem key={item.path} icon={item.icon}>
      <Link to={item.path}>{item.name}</Link>
    </NavItem>
  );
  return navItem;
}

const Navigation = (props, context) => {
  const location = useLocation();
  const { pathname } = location;
  const { isCollapse } = context;
  return (
    <Nav
      type="primary"
      selectedKeys={[pathname]}
      defaultSelectedKeys={[pathname]}
      embeddable
      openMode="single"
      iconOnly={isCollapse}
      hasArrow={false}
      mode={isCollapse ? 'popup' : 'inline'}
    >
      {getNavMenuItems(asideMenuConfig)}
    </Nav>
  );
};

Navigation.contextTypes = {
  isCollapse: PropTypes.bool,
};
export default Navigation;
    `
  );
  return [["src", "layouts", "BasicLayout", "components", "PageNav"], file2];
}

// src/plugins/project/framework/icejs3/template/files/src/layouts/BasicLayout/index.jsx.ts
function getFile31() {
  const file2 = createResultFile(
    "index",
    "jsx",
    `
import React, { useState } from 'react';
import { Shell, ConfigProvider } from '@alifd/next';
import PageNav from './components/PageNav';
import Logo from './components/Logo';
import Footer from './components/Footer';

(function() {
  const throttle = function(type, name, obj = window) {
    let running = false;

    const func = () => {
      if (running) {
        return;
      }

      running = true;
      requestAnimationFrame(() => {
        obj.dispatchEvent(new CustomEvent(name));
        running = false;
      });
    };

    obj.addEventListener(type, func);
  };

  throttle('resize', 'optimizedResize');
})();

export default function BasicLayout({ children }) {
  const getDevice = width => {
    const isPhone =
      typeof navigator !== 'undefined' && navigator && navigator.userAgent.match(/phone/gi);

    if (width < 680 || isPhone) {
      return 'phone';
    }
    if (width < 1280 && width > 680) {
      return 'tablet';
    }
    return 'desktop';
  };

  const [device, setDevice] = useState(getDevice(NaN));
  window.addEventListener('optimizedResize', e => {
    setDevice(getDevice(e && e.target && e.target.innerWidth));
  });
  return (
    <ConfigProvider device={device}>
      <Shell
        type="dark"
        style={{
          minHeight: '100vh',
        }}
      >
        <Shell.Branding>
          <Logo
            image="https://img.alicdn.com/tfs/TB1.ZBecq67gK0jSZFHXXa9jVXa-904-826.png"
            text="Logo"
          />
        </Shell.Branding>
        <Shell.Navigation
          direction="hoz"
          style={{
            marginRight: 10,
          }}
        ></Shell.Navigation>
        <Shell.Action></Shell.Action>
        <Shell.Navigation>
          <PageNav />
        </Shell.Navigation>

        <Shell.Content>{children}</Shell.Content>
        <Shell.Footer>
          <Footer />
        </Shell.Footer>
      </Shell>
    </ConfigProvider>
  );
}
    `
  );
  return [["src", "layouts", "BasicLayout"], file2];
}

// src/plugins/project/framework/icejs3/template/files/src/layouts/BasicLayout/menuConfig.js.ts
function getFile32() {
  const file2 = createResultFile(
    "menuConfig",
    "js",
    `
const headerMenuConfig = [];
const asideMenuConfig = [
  {
    name: 'Dashboard',
    path: '/',
    icon: 'smile',
  },
];
export { headerMenuConfig, asideMenuConfig };
    `
  );
  return [["src", "layouts", "BasicLayout"], file2];
}

// src/plugins/project/framework/icejs3/template/static-files.ts
function generateStaticFiles2(root = createResultDir(".")) {
  runFileGenerator(root, getFile21);
  runFileGenerator(root, getFile22);
  runFileGenerator(root, getFile23);
  runFileGenerator(root, getFile24);
  runFileGenerator(root, getFile25);
  runFileGenerator(root, getFile26);
  runFileGenerator(root, getFile27);
  runFileGenerator(root, getFile28);
  runFileGenerator(root, getFile29);
  runFileGenerator(root, getFile30);
  runFileGenerator(root, getFile31);
  runFileGenerator(root, getFile32);
  return root;
}

// src/plugins/project/framework/icejs3/template/index.ts
var icejs3Template = {
  slots: {
    components: {
      path: ["src", "components"],
      fileName: "index"
    },
    pages: {
      path: ["src", "pages"],
      fileName: "index"
    },
    entry: {
      path: ["src"],
      fileName: "app"
    },
    constants: {
      path: ["src"],
      fileName: "constants"
    },
    utils: {
      path: ["src"],
      fileName: "utils"
    },
    i18n: {
      path: ["src"],
      fileName: "i18n"
    },
    globalStyle: {
      path: ["src"],
      fileName: "global"
    },
    packageJSON: {
      path: [],
      fileName: "package"
    },
    appConfig: {
      path: ["src"],
      fileName: "app"
    },
    buildConfig: {
      path: [],
      fileName: "ice.config"
    },
    layout: {
      path: ["src", "pages"],
      fileName: "layout"
    }
  },
  generateTemplate() {
    return generateStaticFiles2();
  }
};
var template_default2 = icejs3Template;

// src/plugins/project/framework/icejs3/plugins/globalStyle.ts
var pluginFactory23 = () => {
  const plugin = async (pre) => {
    const next = {
      ...pre
    };
    const ir = next.ir;
    next.chunks.push({
      type: "string" /* STRING */,
      fileType: "scss" /* SCSS */,
      name: COMMON_CHUNK_NAME.StyleDepsImport,
      content: `
        // \u5F15\u5165\u9ED8\u8BA4\u5168\u5C40\u6837\u5F0F
        @import '@alifd/next/reset.scss';
      `,
      linkAfter: []
    });
    next.chunks.push({
      type: "string" /* STRING */,
      fileType: "scss" /* SCSS */,
      name: COMMON_CHUNK_NAME.StyleCssContent,
      content: `
        body {
          -webkit-font-smoothing: antialiased;
        }
      `,
      linkAfter: [COMMON_CHUNK_NAME.StyleDepsImport]
    });
    next.chunks.push({
      type: "string" /* STRING */,
      fileType: "scss" /* SCSS */,
      name: COMMON_CHUNK_NAME.StyleCssContent,
      content: ir.css || "",
      linkAfter: [COMMON_CHUNK_NAME.StyleDepsImport]
    });
    return next;
  };
  return plugin;
};
var globalStyle_default2 = pluginFactory23;

// src/plugins/project/framework/icejs3/plugins/packageJSON.ts
var pluginFactory24 = (cfg) => {
  const plugin = async (pre) => {
    const next = {
      ...pre
    };
    const ir = next.ir;
    const packageJson = {
      name: (cfg == null ? void 0 : cfg.packageName) || "icejs3-demo-app",
      version: (cfg == null ? void 0 : cfg.packageVersion) || "0.1.5",
      description: "icejs 3 \u8F7B\u91CF\u7EA7\u6A21\u677F\uFF0C\u4F7F\u7528 JavaScript\uFF0C\u4EC5\u5305\u542B\u57FA\u7840\u7684 Layout\u3002",
      dependencies: {
        moment: "^2.24.0",
        react: "^18.2.0",
        "react-dom": "^18.2.0",
        "react-router": "^6.9.0",
        "react-router-dom": "^6.9.0",
        "intl-messageformat": "^9.3.6",
        "@alifd/next": "1.26.15",
        "@ice/runtime": "~1.1.0",
        ...buildDataSourceDependencies(ir, cfg == null ? void 0 : cfg.datasourceConfig)
      },
      devDependencies: {
        "@ice/app": "~3.1.0",
        "@types/react": "^18.0.0",
        "@types/react-dom": "^18.0.0",
        "@types/node": "^18.11.17",
        "@ice/plugin-fusion": "^1.0.1",
        "@ice/plugin-moment-locales": "^1.0.0",
        eslint: "^6.0.1",
        stylelint: "^13.2.0"
      },
      scripts: {
        start: "ice start",
        build: "ice build",
        lint: "npm run eslint && npm run stylelint",
        eslint: "eslint --cache --ext .js,.jsx ./",
        stylelint: "stylelint ./**/*.scss"
      },
      engines: {
        node: ">=14.0.0"
      },
      repository: {
        type: "git",
        url: "http://gitlab.xxx.com/msd/leak-scan/tree/master"
      },
      private: true,
      originTemplate: "@alifd/scaffold-lite-js"
    };
    ir.packages.forEach((packageInfo) => {
      packageJson.dependencies[packageInfo.package] = packageInfo.version;
    });
    next.chunks.push({
      type: "json" /* JSON */,
      fileType: "json" /* JSON */,
      name: COMMON_CHUNK_NAME.FileMainContent,
      content: packageJson,
      linkAfter: []
    });
    return next;
  };
  return plugin;
};
var packageJSON_default2 = pluginFactory24;

// src/plugins/project/framework/icejs3/plugins/layout.ts
var pluginFactory25 = () => {
  const plugin = async (pre) => {
    const next = {
      ...pre
    };
    next.chunks.push({
      type: "string" /* STRING */,
      fileType: "jsx" /* JSX */,
      name: COMMON_CHUNK_NAME.FileMainContent,
      content: `
      import { Outlet } from 'ice';
      import BasicLayout from '@/layouts/BasicLayout';

      export default function Layout() {
        return (
          <BasicLayout>
            <Outlet />
          </BasicLayout>
        );;
      }
      `,
      linkAfter: []
    });
    return next;
  };
  return plugin;
};
var layout_default = pluginFactory25;

// src/plugins/project/framework/icejs3/plugins/appConfig.ts
function getContent() {
  return `import { defineAppConfig } from 'ice';

// App config, see https://v3.ice.work/docs/guide/basic/app
export default defineAppConfig(() => ({
  // Set your configs here.
  app: {
    rootId: 'App',
  },
  router: {
    type: 'browser',
    basename: '/',
  },
}));`;
}
var pluginFactory26 = () => {
  const plugin = async (pre) => {
    const next = {
      ...pre
    };
    next.chunks.push({
      type: "string" /* STRING */,
      fileType: "ts" /* TS */,
      name: COMMON_CHUNK_NAME.FileMainContent,
      content: getContent(),
      linkAfter: []
    });
    return next;
  };
  return plugin;
};
var appConfig_default = pluginFactory26;

// src/utils/format.ts
import prettier2 from "prettier";
import parserBabel2 from "prettier/parser-babel";
function format(content, options = {}) {
  return prettier2.format(content, {
    parser: "babel",
    plugins: [parserBabel2],
    singleQuote: true,
    jsxSingleQuote: false,
    ...options
  });
}

// src/utils/theme.ts
function getThemeInfo(theme) {
  const sepIdx = theme.indexOf("@", 1);
  if (sepIdx === -1) {
    return { name: theme };
  }
  return {
    name: theme.slice(0, sepIdx),
    version: theme.slice(sepIdx + 1)
  };
}

// src/plugins/project/framework/icejs3/plugins/buildConfig.ts
function getContent2(cfg, routesContent) {
  return `
import { join } from 'path';
import { defineConfig } from '@ice/app';
import _ from 'lodash';
import fusion from '@ice/plugin-fusion';
import locales from '@ice/plugin-moment-locales';
import type { Plugin } from '@ice/app/esm/types';

interface PluginOptions {
  id: string;
}

const plugin: Plugin<PluginOptions> = (options) => ({
  // name \u53EF\u9009\uFF0C\u63D2\u4EF6\u540D\u79F0
  name: 'plugin-name',
  // setup \u5FC5\u9009\uFF0C\u7528\u4E8E\u5B9A\u5236\u5DE5\u7A0B\u6784\u5EFA\u914D\u7F6E
  setup: ({ onGetConfig, modifyUserConfig }) => {
    modifyUserConfig('codeSplitting', 'page');

    onGetConfig((config) => {
      config.entry = {
        web: join(process.cwd(), '.ice/entry.client.tsx'),
      };

      config.cssFilename = '[name].css';

      config.configureWebpack = config.configureWebpack || [];
      config.configureWebpack?.push((webpackConfig) => {
        if (webpackConfig.output) {
          webpackConfig.output.filename = '[name].js';
          webpackConfig.output.chunkFilename = '[name].js';
        }
        return webpackConfig;
      });

      config.swcOptions = _.merge(config.swcOptions, {
        compilationConfig: {
          jsc: {
            transform: {
              react: {
                runtime: 'classic',
              },
            },
          },
        }
      });

      // \u89E3\u51B3 webpack publicPath \u95EE\u9898
      config.transforms = config.transforms || [];
      config.transforms.push((source: string, id: string) => {
        if (id.includes('.ice/entry.client.tsx')) {
          let code = \`
          if (!__webpack_public_path__?.startsWith('http') && document.currentScript) {
            // @ts-ignore
            __webpack_public_path__ = document.currentScript.src.replace(/^(.*\\\\/)[^/]+$/, '$1');
            window.__ICE_ASSETS_MANIFEST__ = window.__ICE_ASSETS_MANIFEST__ || {};
            window.__ICE_ASSETS_MANIFEST__.publicPath = __webpack_public_path__;
          }
          \`;
          code += source;
          return { code };
        }
      });
    });
  },
});

// The project config, see https://v3.ice.work/docs/guide/basic/config
const minify = process.env.NODE_ENV === 'production' ? 'swc' : false;
export default defineConfig(() => ({
  ssr: false,
  ssg: false,
  minify,
  ${routesContent}
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    'react-dom/client': 'ReactDOM',
    '@alifd/next': 'Next',
    lodash: 'var window._',
    '@alilc/lowcode-engine': 'var window.AliLowCodeEngine',
  },
  plugins: [
    fusion(${(cfg == null ? void 0 : cfg.themePackage) ? `{
      importStyle: 'sass',
      themePackage: '${getThemeInfo(cfg.themePackage).name}',
    }` : `{
      importStyle: 'sass',
    }`}),
    locales(),
    plugin(),
  ]
}));
  `;
}
function getRoutesContent(navData, needShell = true) {
  const routes = [
    "routes: {",
    "  defineRoutes: route => {"
  ];
  function _getRoutes(nav, _routes = []) {
    const { slug, children } = nav;
    if (children && children.length > 0) {
      children.forEach((_nav) => _getRoutes(_nav, _routes));
    } else if (slug) {
      _routes.push(`route('/${slug}', '${slug}/index.jsx');`);
    }
  }
  if (needShell) {
    routes.push("    route('/', 'layout.jsx', () => {");
  }
  navData == null ? void 0 : navData.forEach((nav) => {
    _getRoutes(nav, routes);
  });
  if (needShell) {
    routes.push("    });");
  }
  routes.push("  }");
  routes.push("  },");
  return routes.join("\n");
}
var pluginFactory27 = (cfg) => {
  const plugin = async (pre) => {
    const next = {
      ...pre
    };
    const { navConfig } = next.contextData;
    const routesContent = (navConfig == null ? void 0 : navConfig.data) ? getRoutesContent(navConfig.data, true) : "";
    next.chunks.push({
      type: "string" /* STRING */,
      fileType: "mts" /* MTS */,
      name: COMMON_CHUNK_NAME.FileMainContent,
      content: format(getContent2(cfg, routesContent)),
      linkAfter: []
    });
    return next;
  };
  return plugin;
};
var buildConfig_default = pluginFactory27;

// src/plugins/project/framework/icejs3/index.ts
var icejs3_default = {
  template: template_default2,
  plugins: {
    appConfig: appConfig_default,
    buildConfig: buildConfig_default,
    globalStyle: globalStyle_default2,
    packageJSON: packageJSON_default2,
    layout: layout_default
  }
};

// src/solutions/icejs3.ts
function createIceJsProjectBuilder2(options) {
  return createProjectBuilder({
    inStrictMode: options == null ? void 0 : options.inStrictMode,
    extraContextData: { ...options },
    template: icejs3_default.template,
    plugins: {
      components: [
        reactCommonDeps_default(),
        esmodule_default({
          fileType: "jsx"
        }),
        styleImport_default(),
        containerClass_default(),
        containerInjectContext_default(),
        containerInjectUtils_default(),
        containerInjectDataSourceEngine_default(),
        containerInjectI18n_default(),
        containerInjectConstants_default(),
        containerInitState_default(),
        containerLifeCycle_default(),
        containerMethod_default(),
        jsx_default({
          nodeTypeMapping: {
            Div: "div",
            Component: "div",
            Page: "div",
            Block: "div"
          }
        }),
        css_default()
      ],
      pages: [
        reactCommonDeps_default(),
        esmodule_default({
          fileType: "jsx"
        }),
        styleImport_default(),
        containerClass_default(),
        containerInjectContext_default(),
        containerInjectUtils_default(),
        containerInjectDataSourceEngine_default(),
        containerInjectI18n_default(),
        containerInjectConstants_default(),
        containerInitState_default(),
        containerLifeCycle_default(),
        containerMethod_default(),
        jsx_default({
          nodeTypeMapping: {
            Div: "div",
            Component: "div",
            Page: "div",
            Block: "div",
            Box: "div"
          }
        }),
        css_default()
      ],
      constants: [constants_default()],
      utils: [esmodule_default(), utils_default("react")],
      i18n: [i18n_default()],
      globalStyle: [icejs3_default.plugins.globalStyle()],
      packageJSON: [icejs3_default.plugins.packageJSON()],
      buildConfig: [icejs3_default.plugins.buildConfig()],
      appConfig: [icejs3_default.plugins.appConfig()],
      layout: [icejs3_default.plugins.layout()]
    },
    postProcessors: [prettier_default()],
    customizeBuilderOptions: options == null ? void 0 : options.customizeBuilderOptions
  });
}
var plugins2 = {
  containerClass: containerClass_default,
  containerInitState: containerInitState_default,
  containerInjectContext: containerInjectContext_default,
  containerInjectUtils: containerInjectUtils_default,
  containerInjectI18n: containerInjectI18n_default,
  containerInjectDataSourceEngine: containerInjectDataSourceEngine_default,
  containerLifeCycle: containerLifeCycle_default,
  containerMethod: containerMethod_default,
  jsx: jsx_default,
  commonDeps: reactCommonDeps_default
};

// src/plugins/component/rax/containerClass.ts
import changeCase7 from "change-case";

// src/plugins/component/rax/const.ts
var RAX_CHUNK_NAME = {
  ClassDidMountBegin: "RaxComponentClassDidMountBegin",
  ClassDidMountContent: "RaxComponentClassDidMountContent",
  ClassDidMountEnd: "RaxComponentClassDidMountEnd",
  ClassWillUnmountBegin: "RaxComponentClassWillUnmountBegin",
  ClassWillUnmountContent: "RaxComponentClassWillUnmountContent",
  ClassWillUnmountEnd: "RaxComponentClassWillUnmountEnd",
  ClassRenderBegin: "RaxComponentClassRenderBegin",
  ClassRenderPre: "RaxComponentClassRenderPre",
  ClassRenderJSX: "RaxComponentClassRenderJSX",
  ClassRenderEnd: "RaxComponentClassRenderEnd",
  MethodsBegin: "RaxComponentMethodsBegin",
  MethodsContent: "RaxComponentMethodsContent",
  MethodsEnd: "RaxComponentMethodsEnd",
  LifeCyclesBegin: "RaxComponentLifeCyclesBegin",
  LifeCyclesContent: "RaxComponentLifeCyclesContent",
  LifeCyclesEnd: "RaxComponentLifeCyclesEnd"
};

// src/plugins/component/rax/containerClass.ts
var pluginFactory28 = () => {
  const plugin = async (pre) => {
    const next = {
      ...pre
    };
    const ir = next.ir;
    const componentClassName = ensureValidClassName(
      `${changeCase7.pascalCase(ir.moduleName)}$$Page`
    );
    next.chunks.push({
      type: "string" /* STRING */,
      fileType: "jsx" /* JSX */,
      name: CLASS_DEFINE_CHUNK_NAME.Start,
      content: `class ${componentClassName} extends Component {`,
      linkAfter: [
        COMMON_CHUNK_NAME.ExternalDepsImport,
        COMMON_CHUNK_NAME.InternalDepsImport,
        COMMON_CHUNK_NAME.ImportAliasDefine,
        COMMON_CHUNK_NAME.FileVarDefine,
        COMMON_CHUNK_NAME.FileUtilDefine
      ]
    });
    next.chunks.push({
      type: "string" /* STRING */,
      fileType: "jsx" /* JSX */,
      name: CLASS_DEFINE_CHUNK_NAME.End,
      content: "}",
      linkAfter: [
        CLASS_DEFINE_CHUNK_NAME.Start,
        CLASS_DEFINE_CHUNK_NAME.InsPrivateMethod,
        RAX_CHUNK_NAME.ClassRenderEnd,
        RAX_CHUNK_NAME.MethodsEnd
      ]
    });
    next.chunks.push({
      type: "string" /* STRING */,
      fileType: "jsx" /* JSX */,
      name: CLASS_DEFINE_CHUNK_NAME.ConstructorStart,
      content: "constructor(props, context) { super(props); ",
      linkAfter: DEFAULT_LINK_AFTER[CLASS_DEFINE_CHUNK_NAME.ConstructorStart]
    });
    next.chunks.push({
      type: "string" /* STRING */,
      fileType: "jsx" /* JSX */,
      name: CLASS_DEFINE_CHUNK_NAME.ConstructorEnd,
      content: "} /* end of constructor */",
      linkAfter: DEFAULT_LINK_AFTER[CLASS_DEFINE_CHUNK_NAME.ConstructorEnd]
    });
    next.chunks.push({
      type: "string" /* STRING */,
      fileType: "jsx" /* JSX */,
      name: RAX_CHUNK_NAME.ClassDidMountBegin,
      content: "componentDidMount() {",
      linkAfter: [
        CLASS_DEFINE_CHUNK_NAME.Start,
        CLASS_DEFINE_CHUNK_NAME.InsVar,
        CLASS_DEFINE_CHUNK_NAME.InsMethod,
        CLASS_DEFINE_CHUNK_NAME.ConstructorEnd
      ]
    });
    next.chunks.push({
      type: "string" /* STRING */,
      fileType: "jsx" /* JSX */,
      name: RAX_CHUNK_NAME.ClassDidMountEnd,
      content: "} /* end of componentDidMount */",
      linkAfter: [RAX_CHUNK_NAME.ClassDidMountBegin, RAX_CHUNK_NAME.ClassDidMountContent]
    });
    next.chunks.push({
      type: "string" /* STRING */,
      fileType: "jsx" /* JSX */,
      name: RAX_CHUNK_NAME.ClassWillUnmountBegin,
      content: "componentWillUnmount() {",
      linkAfter: [
        CLASS_DEFINE_CHUNK_NAME.Start,
        CLASS_DEFINE_CHUNK_NAME.InsVar,
        CLASS_DEFINE_CHUNK_NAME.InsMethod,
        RAX_CHUNK_NAME.ClassDidMountEnd
      ]
    });
    next.chunks.push({
      type: "string" /* STRING */,
      fileType: "jsx" /* JSX */,
      name: RAX_CHUNK_NAME.ClassWillUnmountEnd,
      content: "} /* end of componentWillUnmount */",
      linkAfter: [RAX_CHUNK_NAME.ClassWillUnmountBegin, RAX_CHUNK_NAME.ClassWillUnmountContent]
    });
    next.chunks.push({
      type: "string" /* STRING */,
      fileType: "jsx" /* JSX */,
      name: RAX_CHUNK_NAME.ClassRenderBegin,
      content: "render() {",
      linkAfter: [RAX_CHUNK_NAME.ClassDidMountEnd, RAX_CHUNK_NAME.ClassWillUnmountEnd]
    });
    next.chunks.push({
      type: "string" /* STRING */,
      fileType: "jsx" /* JSX */,
      name: RAX_CHUNK_NAME.ClassRenderEnd,
      content: "} /* end of render */",
      linkAfter: [
        RAX_CHUNK_NAME.ClassRenderBegin,
        RAX_CHUNK_NAME.ClassRenderPre,
        RAX_CHUNK_NAME.ClassRenderJSX
      ]
    });
    next.chunks.push({
      type: "string" /* STRING */,
      fileType: "jsx" /* JSX */,
      name: COMMON_CHUNK_NAME.FileExport,
      content: `export default ${componentClassName};`,
      linkAfter: [
        COMMON_CHUNK_NAME.ExternalDepsImport,
        COMMON_CHUNK_NAME.InternalDepsImport,
        COMMON_CHUNK_NAME.ImportAliasDefine,
        COMMON_CHUNK_NAME.FileVarDefine,
        COMMON_CHUNK_NAME.FileUtilDefine,
        CLASS_DEFINE_CHUNK_NAME.End
      ]
    });
    return next;
  };
  return plugin;
};
var containerClass_default2 = pluginFactory28;

// src/plugins/component/rax/containerLifeCycle.ts
import _5 from "lodash";
import { isJSExpression as isJSExpression6, isJSFunction as isJSFunction6 } from "@alilc/lowcode-types";

// src/utils/debug.ts
import createDebug from "debug";
var debug = createDebug("code-generator");

// src/plugins/component/rax/containerLifeCycle.ts
var pluginFactory29 = (config) => {
  const cfg = {
    fileType: "jsx" /* JSX */,
    exportNameMapping: {},
    normalizeNameMapping: {
      didMount: "componentDidMount",
      willUnmount: "componentWillUnmount"
    },
    ...config
  };
  const exportNameMapping = new Map(Object.entries(cfg.exportNameMapping));
  const normalizeNameMapping = new Map(Object.entries(cfg.normalizeNameMapping));
  const plugin = async (pre) => {
    const next = {
      ...pre
    };
    const ir = next.ir;
    const { lifeCycles } = ir;
    if (lifeCycles && !_5.isEmpty(lifeCycles)) {
      Object.entries(lifeCycles).forEach(([lifeCycleName, lifeCycleMethodExpr]) => {
        if (!isJSFunction6(lifeCycles[lifeCycleName]) && !isJSExpressionFn(lifeCycles[lifeCycleName]) && !isJSExpression6(lifeCycles[lifeCycleName])) {
          return;
        }
        const normalizeName = normalizeNameMapping.get(lifeCycleName) || lifeCycleName;
        const exportName = exportNameMapping.get(lifeCycleName) || lifeCycleName;
        next.chunks.push({
          type: "string" /* STRING */,
          fileType: cfg.fileType,
          name: RAX_CHUNK_NAME.LifeCyclesContent,
          content: `${exportName}: (${lifeCycleMethodExpr.value}),`,
          linkAfter: [RAX_CHUNK_NAME.LifeCyclesBegin]
        });
        if (normalizeName === "constructor") {
          next.chunks.push({
            type: "string" /* STRING */,
            fileType: cfg.fileType,
            name: CLASS_DEFINE_CHUNK_NAME.ConstructorContent,
            content: `this._lifeCycles.${exportName}();`,
            linkAfter: [CLASS_DEFINE_CHUNK_NAME.ConstructorStart]
          });
        } else if (normalizeName === "componentDidMount") {
          next.chunks.push({
            type: "string" /* STRING */,
            fileType: cfg.fileType,
            name: RAX_CHUNK_NAME.ClassDidMountContent,
            content: `this._lifeCycles.${exportName}();`,
            linkAfter: [RAX_CHUNK_NAME.ClassDidMountBegin]
          });
        } else if (normalizeName === "componentWillUnmount") {
          next.chunks.push({
            type: "string" /* STRING */,
            fileType: cfg.fileType,
            name: RAX_CHUNK_NAME.ClassWillUnmountContent,
            content: `this._lifeCycles.${exportName}();`,
            linkAfter: [RAX_CHUNK_NAME.ClassWillUnmountBegin]
          });
        } else {
          debug(`[CodeGen]: unknown life cycle: ${lifeCycleName}`);
        }
      });
      next.chunks.push({
        type: "string" /* STRING */,
        fileType: cfg.fileType,
        name: CLASS_DEFINE_CHUNK_NAME.InsVar,
        content: "_lifeCycles = this._defineLifeCycles();",
        linkAfter: [CLASS_DEFINE_CHUNK_NAME.Start]
      });
      next.chunks.push({
        type: "string" /* STRING */,
        fileType: cfg.fileType,
        name: RAX_CHUNK_NAME.LifeCyclesBegin,
        content: `
          _defineLifeCycles() {
            const __$$lifeCycles = ({
        `,
        linkAfter: [RAX_CHUNK_NAME.ClassRenderEnd, CLASS_DEFINE_CHUNK_NAME.InsPrivateMethod]
      });
      next.chunks.push({
        type: "string" /* STRING */,
        fileType: cfg.fileType,
        name: RAX_CHUNK_NAME.LifeCyclesEnd,
        content: `
            });

            // \u4E3A\u6240\u6709\u7684\u65B9\u6CD5\u7ED1\u5B9A\u4E0A\u4E0B\u6587
            Object.entries(__$$lifeCycles).forEach(([lifeCycleName, lifeCycleMethod]) => {
              if (typeof lifeCycleMethod === 'function') {
                __$$lifeCycles[lifeCycleName] = (...args) => {
                  return lifeCycleMethod.apply(this._context, args);
                }
              }
            });

            return __$$lifeCycles;
          }
        `,
        linkAfter: [RAX_CHUNK_NAME.LifeCyclesBegin, RAX_CHUNK_NAME.LifeCyclesContent]
      });
    }
    return next;
  };
  return plugin;
};
var containerLifeCycle_default2 = pluginFactory29;

// src/plugins/component/rax/containerMethods.ts
var pluginFactory30 = (config) => {
  const cfg = {
    fileType: "jsx" /* JSX */,
    ...config
  };
  const plugin = async (pre) => {
    const next = {
      ...pre
    };
    const ir = next.ir;
    next.chunks.push({
      type: "string" /* STRING */,
      fileType: cfg.fileType,
      name: CLASS_DEFINE_CHUNK_NAME.InsVar,
      content: `
         _methods = this._defineMethods();
      `,
      linkAfter: [CLASS_DEFINE_CHUNK_NAME.Start]
    });
    next.chunks.push({
      type: "string" /* STRING */,
      fileType: cfg.fileType,
      name: RAX_CHUNK_NAME.MethodsBegin,
      content: `
        _defineMethods() {
          return ({
      `,
      linkAfter: [
        RAX_CHUNK_NAME.ClassRenderEnd,
        CLASS_DEFINE_CHUNK_NAME.InsPrivateMethod,
        RAX_CHUNK_NAME.LifeCyclesEnd
      ]
    });
    next.chunks.push({
      type: "string" /* STRING */,
      fileType: cfg.fileType,
      name: RAX_CHUNK_NAME.MethodsEnd,
      content: `
          });
        }
      `,
      linkAfter: [RAX_CHUNK_NAME.MethodsBegin, RAX_CHUNK_NAME.MethodsContent]
    });
    if (ir.methods && Object.keys(ir.methods).length > 0) {
      Object.entries(ir.methods).forEach(([methodName, methodDefine]) => {
        next.chunks.push({
          type: "string" /* STRING */,
          fileType: cfg.fileType,
          name: RAX_CHUNK_NAME.MethodsContent,
          content: `${methodName}: (${methodDefine.value}),`,
          linkAfter: [RAX_CHUNK_NAME.MethodsBegin]
        });
      });
    }
    return next;
  };
  return plugin;
};
var containerMethods_default = pluginFactory30;

// src/plugins/component/rax/containerInitState.ts
var pluginFactory31 = (config) => {
  const cfg = {
    fileType: "jsx" /* JSX */,
    implementType: "insMember",
    ...config
  };
  const plugin = async (pre) => {
    const next = {
      ...pre
    };
    const ir = next.ir;
    const scope = Scope.createRootScope();
    const state = ir.state || {};
    const fields = Object.keys(state).map((stateName) => {
      const value = generateCompositeType(state[stateName], scope);
      return `${JSON.stringify(stateName)}: ${value}`;
    });
    if (cfg.implementType === "inConstructor") {
      next.chunks.push({
        type: "string" /* STRING */,
        fileType: cfg.fileType,
        name: CLASS_DEFINE_CHUNK_NAME.ConstructorContent,
        content: `this.state = { ${fields.join(",")} };`,
        linkAfter: [...DEFAULT_LINK_AFTER[CLASS_DEFINE_CHUNK_NAME.ConstructorContent]]
      });
    } else if (cfg.implementType === "insMember") {
      next.chunks.push({
        type: "string" /* STRING */,
        fileType: cfg.fileType,
        name: CLASS_DEFINE_CHUNK_NAME.InsVar,
        content: `state = { ${fields.join(",")} };`,
        linkAfter: [...DEFAULT_LINK_AFTER[CLASS_DEFINE_CHUNK_NAME.InsVar]]
      });
    }
    return next;
  };
  return plugin;
};
var containerInitState_default2 = pluginFactory31;

// src/plugins/component/rax/containerInjectContext.ts
var pluginFactory32 = (config) => {
  const cfg = {
    fileType: "jsx" /* JSX */,
    ...config
  };
  const plugin = async (pre) => {
    var _a;
    const next = {
      ...pre
    };
    const ir = next.ir;
    const useRef = !!((_a = ir.analyzeResult) == null ? void 0 : _a.isUsingRef);
    next.chunks.push({
      type: "string" /* STRING */,
      fileType: cfg.fileType,
      name: COMMON_CHUNK_NAME.InternalDepsImport,
      content: "import __$$constants from '../../constants';",
      linkAfter: [COMMON_CHUNK_NAME.ExternalDepsImport]
    });
    next.chunks.push({
      type: "string" /* STRING */,
      fileType: cfg.fileType,
      name: COMMON_CHUNK_NAME.InternalDepsImport,
      content: "import * as __$$i18n from '../../i18n';",
      linkAfter: [COMMON_CHUNK_NAME.ExternalDepsImport]
    });
    next.chunks.push({
      type: "string" /* STRING */,
      fileType: cfg.fileType,
      name: CLASS_DEFINE_CHUNK_NAME.ConstructorContent,
      content: `
        __$$i18n._inject2(this);
      `,
      linkAfter: [...DEFAULT_LINK_AFTER[CLASS_DEFINE_CHUNK_NAME.ConstructorContent]]
    });
    next.chunks.push({
      type: "string" /* STRING */,
      fileType: cfg.fileType,
      name: CLASS_DEFINE_CHUNK_NAME.InsVar,
      content: `
        _context = this._createContext();
      `,
      linkAfter: [CLASS_DEFINE_CHUNK_NAME.Start]
    });
    next.chunks.push({
      type: "string" /* STRING */,
      fileType: cfg.fileType,
      name: CLASS_DEFINE_CHUNK_NAME.InsPrivateMethod,
      content: `
        _createContext() {
          const self = this;
          const context = {
            get state() {
              return self.state;
            },
            setState(newState, callback) {
              self.setState(newState, callback);
            },
            get dataSourceMap() {
              return self._dataSourceEngine.dataSourceMap || {};
            },
            async reloadDataSource() {
              await self._dataSourceEngine.reloadDataSource();
            },
            get utils() {
              return self._utils;
            },
            get page() {
              return context;
            },
            get component() {
              return context;
            },
            get props() {
              return self.props;
            },
            get constants() {
              return __$$constants;
            },
            i18n: __$$i18n.i18n,
            i18nFormat: __$$i18n.i18nFormat,
            getLocale: __$$i18n.getLocale,
            setLocale(locale) {
              __$$i18n.setLocale(locale);
              self.forceUpdate();
            },${useRef ? `
                  $(refName) {
                    return self._refsManager.get(refName);
                  },
                  $$(refName) {
                    return self._refsManager.getAll(refName);
                  },
                  get _refsManager() {
                    if (!self._refsManager) {
                      self._refsManager = new RefsManager();
                    }
                    return self._refsManager;
                  },
                ` : ""}
            ...this._methods,
          };

          return context;
        }
      `,
      linkAfter: [RAX_CHUNK_NAME.ClassRenderEnd]
    });
    return next;
  };
  return plugin;
};
var containerInjectContext_default2 = pluginFactory32;

// src/plugins/component/rax/containerInjectDataSourceEngine.ts
import {
  isJSExpression as isJSExpression7,
  isJSFunction as isJSFunction7
} from "@alilc/lowcode-types";
import changeCase8 from "change-case";
var pluginFactory33 = (config) => {
  var _a;
  const cfg = {
    fileType: "jsx" /* JSX */,
    ...config,
    dataSourceHandlersPackageMap: (config == null ? void 0 : config.dataSourceHandlersPackageMap) || ((_a = config == null ? void 0 : config.datasourceConfig) == null ? void 0 : _a.handlersPackages)
  };
  const plugin = async (pre) => {
    var _a2;
    const next = {
      ...pre
    };
    const scope = Scope.createRootScope();
    const dataSourceConfig = isContainerSchema(pre.ir) ? pre.ir.dataSource : null;
    const dataSourceItems = dataSourceConfig && dataSourceConfig.list || [];
    const dataSourceEngineOptions = { runtimeConfig: true };
    if (dataSourceItems.length > 0) {
      const requestHandlersMap = {};
      dataSourceItems.forEach((ds) => {
        var _a3;
        const dsType = ds.type || "fetch";
        if (!(dsType in requestHandlersMap) && dsType !== "custom") {
          const handlerFactoryName = `__$$create${changeCase8.pascal(dsType)}RequestHandler`;
          requestHandlersMap[dsType] = {
            type: "JSExpression",
            value: `${handlerFactoryName}(${dsType === "urlParams" ? "__$$getSearchParams()" : ""})`
          };
          const handlerFactoryExportName = `create${changeCase8.pascal(dsType)}Handler`;
          const handlerPkgName = ((_a3 = cfg.dataSourceHandlersPackageMap) == null ? void 0 : _a3[dsType]) || `@alilc/lowcode-datasource-${changeCase8.kebab(dsType)}-handler`;
          next.chunks.push({
            type: "string" /* STRING */,
            fileType: "jsx" /* JSX */,
            name: COMMON_CHUNK_NAME.ExternalDepsImport,
            content: `
              import { ${handlerFactoryExportName} as ${handlerFactoryName} } from '${handlerPkgName}';
            `,
            linkAfter: []
          });
        }
      });
      Object.assign(dataSourceEngineOptions, { requestHandlersMap });
    }
    const datasourceEnginePackageName = ((_a2 = cfg.datasourceConfig) == null ? void 0 : _a2.enginePackage) || "@alilc/lowcode-datasource-engine";
    next.chunks.push({
      type: "string" /* STRING */,
      fileType: "jsx" /* JSX */,
      name: COMMON_CHUNK_NAME.ExternalDepsImport,
      content: `
        import { create as __$$createDataSourceEngine } from '${datasourceEnginePackageName}/runtime';
      `,
      linkAfter: []
    });
    next.chunks.push({
      type: "string" /* STRING */,
      fileType: cfg.fileType,
      name: CLASS_DEFINE_CHUNK_NAME.InsVar,
      content: `
        _dataSourceConfig = this._defineDataSourceConfig();
        _dataSourceEngine = __$$createDataSourceEngine(
          this._dataSourceConfig,
          this._context,
          ${generateCompositeType(dataSourceEngineOptions, scope)}
        );`,
      linkAfter: [CLASS_DEFINE_CHUNK_NAME.Start]
    });
    next.chunks.push({
      type: "string" /* STRING */,
      fileType: cfg.fileType,
      name: RAX_CHUNK_NAME.ClassDidMountContent,
      content: `
        this._dataSourceEngine.reloadDataSource();
      `,
      linkAfter: [RAX_CHUNK_NAME.ClassDidMountBegin]
    });
    next.chunks.push({
      type: "string" /* STRING */,
      fileType: cfg.fileType,
      name: CLASS_DEFINE_CHUNK_NAME.InsPrivateMethod,
      content: `
_defineDataSourceConfig() {
  const __$$context = this._context;
  return (${generateCompositeType(
        {
          ...dataSourceConfig,
          list: [
            ...dataSourceItems.map((item) => {
              var _a3;
              return {
                errorHandler: {
                  type: "JSFunction",
                  value: `function (err){
              setTimeout(() => {
                this.setState({ __refresh: Date.now() + Math.random() });
              }, 0);
              throw err;
            }`
                },
                ...item,
                isInit: typeof item.isInit === "boolean" || typeof item.isInit === "undefined" ? (_a3 = item.isInit) != null ? _a3 : true : wrapAsFunction2(item.isInit, scope),
                options: wrapAsFunction2(item.options, scope)
              };
            })
          ]
        },
        scope,
        {
          handlers: {
            function: (jsFunc) => parseExpressionConvertThis2Context(jsFunc.value, "__$$context"),
            expression: (jsExpr) => parseExpressionConvertThis2Context(jsExpr.value, "__$$context")
          }
        }
      )});
}
      `,
      linkAfter: [RAX_CHUNK_NAME.ClassRenderEnd]
    });
    return next;
  };
  return plugin;
};
var containerInjectDataSourceEngine_default2 = pluginFactory33;
function wrapAsFunction2(value, scope) {
  if (isJSExpression7(value) || isJSFunction7(value)) {
    return {
      type: "JSExpression",
      value: `function(){ return ((${value.value}))}`
    };
  }
  return {
    type: "JSExpression",
    value: `function(){return((${generateCompositeType(value, scope)}))}`
  };
}

// src/plugins/component/rax/containerInjectUtils.ts
var pluginFactory34 = (config) => {
  const cfg = {
    fileType: "jsx" /* JSX */,
    ...config
  };
  const plugin = async (pre) => {
    var _a;
    const next = {
      ...pre
    };
    const ir = next.ir;
    const useRef = !!((_a = ir.analyzeResult) == null ? void 0 : _a.isUsingRef);
    next.chunks.push({
      type: "string" /* STRING */,
      fileType: cfg.fileType,
      name: COMMON_CHUNK_NAME.InternalDepsImport,
      content: `
        import __$$projectUtils${useRef ? ", { RefsManager }" : ""} from '../../utils';
      `,
      linkAfter: [COMMON_CHUNK_NAME.ExternalDepsImport]
    });
    next.chunks.push({
      type: "string" /* STRING */,
      fileType: cfg.fileType,
      name: CLASS_DEFINE_CHUNK_NAME.InsVar,
      content: "_utils = this._defineUtils();",
      linkAfter: [CLASS_DEFINE_CHUNK_NAME.Start]
    });
    next.chunks.push({
      type: "string" /* STRING */,
      fileType: cfg.fileType,
      name: CLASS_DEFINE_CHUNK_NAME.InsPrivateMethod,
      content: `
        _defineUtils() {
          return {
            ...__$$projectUtils,
          };
        }`,
      linkAfter: [RAX_CHUNK_NAME.ClassRenderEnd]
    });
    return next;
  };
  return plugin;
};
var containerInjectUtils_default2 = pluginFactory34;

// src/plugins/component/rax/jsx.ts
import {
  isJSExpression as isJSExpression8
} from "@alilc/lowcode-types";
import _6 from "lodash";
import changeCase9 from "change-case";
var pluginFactory35 = (config) => {
  const cfg = {
    fileType: "jsx" /* JSX */,
    ...config
  };
  const plugin = async (pre) => {
    const next = {
      ...pre
    };
    const ir = next.ir;
    const rootScope = Scope.createRootScope();
    const { tolerateEvalErrors = true, evalErrorsHandler = "" } = next.contextData;
    const componentsNameAliasMap = /* @__PURE__ */ new Map();
    next.chunks.forEach((chunk) => {
      if (isImportAliasDefineChunk(chunk)) {
        componentsNameAliasMap.set(chunk.ext.aliasName, chunk.ext.originalName);
      }
    });
    const mapComponentNameToAliasOrKeepIt = (componentName) => componentsNameAliasMap.get(componentName) || componentName;
    next.chunks = next.chunks.filter((chunk) => !isImportAliasDefineChunk(chunk));
    const customHandlers = {
      expression(input, scope) {
        return transformJsExpr(generateExpression(input, scope), scope, {
          dontWrapEval: !tolerateEvalErrors
        });
      },
      function(input, scope) {
        return transformThis2Context(input.value || "null", scope);
      }
    };
    const commonNodeGenerator = createNodeGenerator({
      handlers: customHandlers,
      tagMapping: mapComponentNameToAliasOrKeepIt,
      nodePlugins: [generateReactExprInJS, generateConditionReactCtrl, generateRaxLoopCtrl],
      attrPlugins: [generateNodeAttrForRax.bind({ cfg })]
    });
    const jsxContent = commonNodeGenerator(ir, rootScope);
    if (!cfg.ignoreMiniApp) {
      next.chunks.push({
        type: "string" /* STRING */,
        fileType: cfg.fileType,
        name: COMMON_CHUNK_NAME.ExternalDepsImport,
        content: "import { isMiniApp as __$$isMiniApp } from 'universal-env';",
        linkAfter: []
      });
    }
    next.chunks.push({
      type: "string" /* STRING */,
      fileType: cfg.fileType,
      name: RAX_CHUNK_NAME.ClassRenderPre,
      content: `
        const __$$context = this._context;
        const { state, setState, dataSourceMap, reloadDataSource, utils, constants, i18n, i18nFormat, getLocale, setLocale } = __$$context;
      `,
      linkAfter: [RAX_CHUNK_NAME.ClassRenderBegin]
    });
    next.chunks.push({
      type: "string" /* STRING */,
      fileType: cfg.fileType,
      name: RAX_CHUNK_NAME.ClassRenderJSX,
      content: `return ${jsxContent};`,
      linkAfter: [RAX_CHUNK_NAME.ClassRenderBegin, RAX_CHUNK_NAME.ClassRenderPre]
    });
    next.chunks.push({
      type: "string" /* STRING */,
      fileType: cfg.fileType,
      name: COMMON_CHUNK_NAME.CustomContent,
      content: [
        tolerateEvalErrors && `
        function __$$eval(expr) {
          try {
            return expr();
          } catch (error) {
            ${evalErrorsHandler}
          }
        }

        function __$$evalArray(expr) {
          const res = __$$eval(expr);
          return Array.isArray(res) ? res : [];
        }
        `,
        `
        function __$$createChildContext(oldContext, ext) {
          return Object.assign({}, oldContext, ext);
        }
      `
      ].filter(Boolean).join("\n"),
      linkAfter: [COMMON_CHUNK_NAME.FileExport]
    });
    return next;
    function generateRaxLoopCtrl(nodeItem, scope, config2, next2) {
      var _a, _b;
      if (nodeItem.loop) {
        const loopItemName = ((_a = nodeItem.loopArgs) == null ? void 0 : _a[0]) || "item";
        const loopIndexName = ((_b = nodeItem.loopArgs) == null ? void 0 : _b[1]) || "index";
        const subScope = scope.createSubScope([loopItemName, loopIndexName]);
        const pieces = next2 ? next2(nodeItem, subScope, config2) : [];
        const loopDataExpr = tolerateEvalErrors ? `__$$evalArray(() => (${transformThis2Context(
          generateCompositeType(nodeItem.loop, scope, { handlers: config2 == null ? void 0 : config2.handlers }),
          scope
        )}))` : `(${transformThis2Context(
          generateCompositeType(nodeItem.loop, scope, { handlers: config2 == null ? void 0 : config2.handlers }),
          scope
        )})`;
        pieces.unshift({
          value: `${loopDataExpr}.map((${loopItemName}, ${loopIndexName}) => ((__$$context) => (`,
          type: "NodeCodePieceBefore" /* BEFORE */
        });
        pieces.push({
          value: `))(__$$createChildContext(__$$context, { ${loopItemName}, ${loopIndexName} })))`,
          type: "NodeCodePieceAfter" /* AFTER */
        });
        return pieces;
      }
      return next2 ? next2(nodeItem, scope, config2) : [];
    }
  };
  return plugin;
};
var jsx_default2 = pluginFactory35;
function isImportAliasDefineChunk(chunk) {
  var _a;
  return chunk.name === COMMON_CHUNK_NAME.ImportAliasDefine && !!chunk.ext && typeof chunk.ext.aliasName === "string" && typeof chunk.ext.originalName === "string" && !!((_a = chunk.ext.dependency) == null ? void 0 : _a.componentName);
}
function generateNodeAttrForRax(attrData, scope, config, next) {
  if (!this.cfg.ignoreMiniApp && /^on/.test(attrData.attrName)) {
    return generateEventHandlerAttrForRax(attrData.attrName, attrData.attrValue, scope, config);
  }
  if (attrData.attrName === "ref") {
    return [
      {
        name: attrData.attrName,
        value: `__$$context._refsManager.linkRef('${attrData.attrValue}')`,
        type: "NodeCodePieceAttr" /* ATTR */
      }
    ];
  }
  return next ? next(attrData, scope, config) : [];
}
function generateEventHandlerAttrForRax(attrName, attrValue, scope, config) {
  var _a;
  const valueExpr = generateCompositeType(
    isJSExpression8(attrValue) ? { type: "JSFunction", value: attrValue.value } : attrValue,
    scope,
    {
      handlers: config == null ? void 0 : config.handlers
    }
  );
  const currentScopeVariables = ((_a = scope.bindings) == null ? void 0 : _a.getAllBindings()) || [];
  if (currentScopeVariables.length <= 0) {
    return [
      {
        type: "NodeCodePieceAttr" /* ATTR */,
        name: attrName,
        value: valueExpr
      }
    ];
  }
  const undeclaredVariablesInValueExpr = parseExpressionGetGlobalVariables(valueExpr);
  const referencedLocalVariables = _6.intersection(
    undeclaredVariablesInValueExpr,
    currentScopeVariables
  );
  if (referencedLocalVariables.length <= 0) {
    return [
      {
        type: "NodeCodePieceAttr" /* ATTR */,
        name: attrName,
        value: valueExpr
      }
    ];
  }
  const wrappedAttrValueExpr = [
    "(...__$$args) => {",
    "  if (__$$isMiniApp) {",
    "    const __$$event = __$$args[0];",
    ...referencedLocalVariables.map(
      (localVar) => `const ${localVar} = __$$event.target.dataset.${localVar};`
    ),
    `    return (${valueExpr}).apply(this, __$$args);`,
    "  } else {",
    `    return (${valueExpr}).apply(this, __$$args);`,
    "  }",
    "}"
  ].join("\n");
  return [
    ...referencedLocalVariables.map((localVar) => ({
      type: "NodeCodePieceAttr" /* ATTR */,
      name: `data-${changeCase9.snake(localVar)}`,
      value: localVar
    })),
    {
      type: "NodeCodePieceAttr" /* ATTR */,
      name: attrName,
      value: wrappedAttrValueExpr
    }
  ];
}

// src/plugins/component/rax/commonDeps.ts
var pluginFactory36 = () => {
  const plugin = async (pre) => {
    const next = {
      ...pre
    };
    next.chunks.push({
      type: "string" /* STRING */,
      fileType: "jsx" /* JSX */,
      name: COMMON_CHUNK_NAME.ExternalDepsImport,
      content: `
        // \u6CE8\u610F: \u51FA\u7801\u5F15\u64CE\u6CE8\u5165\u7684\u4E34\u65F6\u53D8\u91CF\u9ED8\u8BA4\u90FD\u4EE5 "__$$" \u5F00\u5934\uFF0C\u7981\u6B62\u5728\u642D\u5EFA\u7684\u4EE3\u7801\u4E2D\u76F4\u63A5\u8BBF\u95EE\u3002
        // \u4F8B\u5916\uFF1Arax \u6846\u67B6\u7684\u5BFC\u51FA\u540D\u548C\u5404\u79CD\u7EC4\u4EF6\u540D\u9664\u5916\u3002
        import { createElement, Component } from 'rax';
        import { getSearchParams as __$$getSearchParams } from 'rax-app';
      `,
      linkAfter: []
    });
    return next;
  };
  return plugin;
};
var commonDeps_default = pluginFactory36;

// src/plugins/project/framework/rax/template/files/.eslintignore.ts
function getFile33() {
  return [
    ["."],
    {
      name: ".eslintignore",
      ext: "",
      content: "node_modules/\nlib/\ndist/\nbuild/\ncoverage/\ndemo/\nes/\n.rax/\n"
    }
  ];
}

// src/plugins/project/framework/rax/template/files/.eslintrc.js.ts
function getFile34() {
  return [
    ["."],
    {
      name: ".eslintrc",
      ext: "js",
      content: "const { getESLintConfig } = require('@iceworks/spec');\n\n// https://www.npmjs.com/package/@iceworks/spec\nmodule.exports = {\n  ...getESLintConfig('rax'),\n  rules: {\n    'max-len': ['error', { code: 200 }],\n    'function-paren-newline': 'off',\n    '@typescript-eslint/indent': 'off',\n    'prettier/prettier': 'off',\n    'no-empty': 'off',\n    'no-unused-vars': 'off',\n    '@iceworks/best-practices/recommend-functional-component': 'off',\n  },\n};\n"
    }
  ];
}

// src/plugins/project/framework/rax/template/files/.gitignore.ts
function getFile35() {
  return [
    ["."],
    {
      name: ".gitignore",
      ext: "",
      content: "# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.\n\n*~\n*.swp\n*.log\n\n.DS_Store\n.idea/\n.temp/\n\nbuild/\ndist/\nlib/\ncoverage/\nnode_modules/\n.rax/\n\ntemplate.yml"
    }
  ];
}

// src/plugins/project/framework/rax/template/files/.prettierignore.ts
function getFile36() {
  return [
    ["."],
    {
      name: ".prettierignore",
      ext: "",
      content: "node_modules/\nlib/\ndist/\nbuild/\ncoverage/\ndemo/\nes/\n.rax/\n"
    }
  ];
}

// src/plugins/project/framework/rax/template/files/.prettierrc.js.ts
function getFile37() {
  return [
    ["."],
    {
      name: ".prettierrc",
      ext: "js",
      content: "const { getPrettierConfig } = require('@iceworks/spec');\n\nmodule.exports = getPrettierConfig('rax');\n"
    }
  ];
}

// src/plugins/project/framework/rax/template/files/.stylelintignore.ts
function getFile38() {
  return [
    ["."],
    {
      name: ".stylelintignore",
      ext: "",
      content: "node_modules/\nlib/\ndist/\nbuild/\ncoverage/\ndemo/\nes/\n.rax/\n"
    }
  ];
}

// src/plugins/project/framework/rax/template/files/.stylelintrc.js.ts
function getFile39() {
  return [
    ["."],
    {
      name: ".stylelintrc",
      ext: "js",
      content: "const { getStylelintConfig } = require('@iceworks/spec');\n\nmodule.exports = getStylelintConfig('rax');\n"
    }
  ];
}

// src/plugins/project/framework/rax/template/files/jsconfig.json.ts
function getFile40() {
  return [
    ["."],
    {
      name: "jsconfig",
      ext: "json",
      content: '{\n  "compilerOptions": {\n    "baseUrl": ".",\n    "jsx": "react",\n    "paths": {\n      "@/*": ["./src/*"],\n      "rax-app": [".rax/index.ts"]\n    }\n  }\n}\n'
    }
  ];
}

// src/plugins/project/framework/rax/template/files/README.md.ts
function getFile41() {
  return [
    ["."],
    {
      name: "README",
      ext: "md",
      content: "# rax-materials-basic-app\n\n## Getting Started\n\n### `npm run start`\n\nRuns the app in development mode.\n\nOpen [http://localhost:3333](http://localhost:3333) to view it in the browser.\n\nThe page will reload if you make edits.\n\n### `npm run build`\n\nBuilds the app for production to the `build` folder.\n"
    }
  ];
}

// src/plugins/project/framework/rax/template/files/tsconfig.json.ts
function getFile42() {
  return [
    ["."],
    {
      name: "tsconfig",
      ext: "json",
      content: '{\n  "compileOnSave": false,\n  "buildOnSave": false,\n  "compilerOptions": {\n    "baseUrl": ".",\n    "outDir": "build",\n    "module": "esnext",\n    "target": "es6",\n    "jsx": "preserve",\n    "jsxFactory": "createElement",\n    "moduleResolution": "node",\n    "allowSyntheticDefaultImports": true,\n    "lib": ["es6", "dom"],\n    "sourceMap": true,\n    "allowJs": true,\n    "rootDir": "./",\n    "forceConsistentCasingInFileNames": true,\n    "noImplicitReturns": true,\n    "noImplicitThis": true,\n    "noImplicitAny": false,\n    "importHelpers": true,\n    "strictNullChecks": true,\n    "suppressImplicitAnyIndexErrors": true,\n    "noUnusedLocals": true,\n    "skipLibCheck": true,\n    "paths": {\n      "@/*": ["./src/*"],\n      "rax-app": [".rax/index.ts"]\n    }\n  },\n  "include": ["src", ".rax"],\n  "exclude": ["node_modules", "build", "public"]\n}'
    }
  ];
}

// src/plugins/project/framework/rax/template/static-files.ts
function generateStaticFiles3(root = createResultDir(".")) {
  runFileGenerator(root, getFile33);
  runFileGenerator(root, getFile34);
  runFileGenerator(root, getFile35);
  runFileGenerator(root, getFile36);
  runFileGenerator(root, getFile37);
  runFileGenerator(root, getFile38);
  runFileGenerator(root, getFile39);
  runFileGenerator(root, getFile40);
  runFileGenerator(root, getFile41);
  runFileGenerator(root, getFile42);
  return root;
}

// src/plugins/project/framework/rax/template/index.ts
var raxAppTemplate = {
  slots: {
    components: {
      path: ["src", "components"]
    },
    pages: {
      path: ["src", "pages"]
    },
    router: {
      path: ["src"],
      fileName: "router"
    },
    entry: {
      path: ["src"],
      fileName: "app"
    },
    appConfig: {
      path: ["src"],
      fileName: "app"
    },
    buildConfig: {
      path: [],
      fileName: "build"
    },
    constants: {
      path: ["src"],
      fileName: "constants"
    },
    utils: {
      path: ["src"],
      fileName: "utils"
    },
    i18n: {
      path: ["src"],
      fileName: "i18n"
    },
    globalStyle: {
      path: ["src"],
      fileName: "global"
    },
    htmlEntry: {
      path: ["src", "document"],
      fileName: "index"
    },
    packageJSON: {
      path: [],
      fileName: "package"
    }
  },
  async generateTemplate() {
    return generateStaticFiles3();
  }
};
var template_default3 = raxAppTemplate;

// src/plugins/project/framework/rax/plugins/entry.ts
var pluginFactory37 = (cfg) => {
  const plugin = async (pre) => {
    const next = {
      ...pre
    };
    next.chunks.push({
      type: "string" /* STRING */,
      fileType: "js" /* JS */,
      name: COMMON_CHUNK_NAME.ExternalDepsImport,
      content: `
import { runApp } from 'rax-app';

import './global.${(cfg == null ? void 0 : cfg.globalStylesFileType) || "css"}';
`,
      linkAfter: []
    });
    const appConfig = (cfg == null ? void 0 : cfg.appConfig) || {};
    Object.assign(appConfig, {
      router: {
        mode: "hash",
        ...appConfig.router
      }
    });
    next.chunks.push({
      type: "string" /* STRING */,
      fileType: "js" /* JS */,
      name: COMMON_CHUNK_NAME.FileMainContent,
      content: `
runApp(${JSON.stringify(appConfig, null, 2)});
`,
      linkAfter: [
        COMMON_CHUNK_NAME.ExternalDepsImport,
        COMMON_CHUNK_NAME.InternalDepsImport,
        COMMON_CHUNK_NAME.ImportAliasDefine,
        COMMON_CHUNK_NAME.FileVarDefine,
        COMMON_CHUNK_NAME.FileUtilDefine
      ]
    });
    return next;
  };
  return plugin;
};
var entry_default2 = pluginFactory37;

// src/plugins/project/framework/rax/plugins/appConfig.ts
import changeCase10 from "change-case";
var pluginFactory38 = (cfg) => {
  const plugin = async (pre) => {
    var _a, _b, _c, _d, _e, _f;
    const next = {
      ...pre
    };
    const ir = next.ir;
    const routes = ((_b = (_a = ir.globalRouter) == null ? void 0 : _a.routes) == null ? void 0 : _b.map((route) => ({
      path: route.path,
      source: `pages/${ensureValidClassName(changeCase10.pascalCase(route.fileName))}/index`
    }))) || [{ path: "/", source: "pages/Home/index" }];
    next.chunks.push({
      type: "string" /* STRING */,
      fileType: "json" /* JSON */,
      name: COMMON_CHUNK_NAME.CustomContent,
      content: `
{
  "routes": ${JSON.stringify(routes, null, 2)},
  "window": {
    "title": ${JSON.stringify(
        (cfg == null ? void 0 : cfg.title) || ((_d = (_c = ir.project) == null ? void 0 : _c.meta) == null ? void 0 : _d.title) || ((_f = (_e = ir.project) == null ? void 0 : _e.meta) == null ? void 0 : _f.name) || ""
      )}
  }
}
      `,
      linkAfter: []
    });
    return next;
  };
  return plugin;
};
var appConfig_default2 = pluginFactory38;

// src/plugins/project/framework/rax/plugins/buildConfig.ts
var pluginFactory39 = (cfg) => {
  const plugin = async (pre) => {
    var _a, _b, _c, _d, _e;
    const next = {
      ...pre
    };
    const ir = next.ir;
    const miniAppBuildType = ((_a = cfg == null ? void 0 : cfg.buildConfig) == null ? void 0 : _a.miniAppBuildType) || ((_c = (_b = ir.project) == null ? void 0 : _b.config) == null ? void 0 : _c.miniAppBuildType);
    const targets = (cfg == null ? void 0 : cfg.targets) || ["web"];
    const buildCfg = {
      inlineStyle: false,
      plugins: [],
      targets,
      miniapp: miniAppBuildType ? {
        buildType: miniAppBuildType,
        ...(_d = cfg == null ? void 0 : cfg.buildConfig) == null ? void 0 : _d.miniapp
      } : (_e = cfg == null ? void 0 : cfg.buildConfig) == null ? void 0 : _e.miniapp,
      ...cfg == null ? void 0 : cfg.buildConfig
    };
    next.chunks.push({
      type: "string" /* STRING */,
      fileType: "json" /* JSON */,
      name: COMMON_CHUNK_NAME.CustomContent,
      content: `${JSON.stringify(buildCfg, null, 2)}
`,
      linkAfter: []
    });
    return next;
  };
  return plugin;
};
var buildConfig_default2 = pluginFactory39;

// src/plugins/project/framework/rax/plugins/entryDocument.ts
var pluginFactory40 = (cfg) => {
  const plugin = async (pre) => {
    var _a;
    const next = {
      ...pre
    };
    const ir = next.ir;
    next.chunks.push({
      type: "string" /* STRING */,
      fileType: "jsx" /* JSX */,
      name: COMMON_CHUNK_NAME.CustomContent,
      content: `
import { createElement } from 'rax';
import { Root, Style, Script } from 'rax-document';

function Document() {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no,viewport-fit=cover"
        />
        <title>${(cfg == null ? void 0 : cfg.title) || ((_a = ir == null ? void 0 : ir.meta) == null ? void 0 : _a.name) || "Rax App"}</title>
        <Style />
      </head>
      <body>
        {/* root container */}
        <Root />
        <Script />
      </body>
    </html>
  );
}

export default Document;
`,
      linkAfter: []
    });
    return next;
  };
  return plugin;
};
var entryDocument_default = pluginFactory40;

// src/plugins/project/framework/rax/plugins/globalStyle.ts
var pluginFactory41 = (config) => {
  const cfg = {
    fileType: "scss" /* SCSS */,
    ...config
  };
  const plugin = async (pre) => {
    const next = {
      ...pre
    };
    const ir = next.ir;
    next.chunks.push({
      type: "string" /* STRING */,
      fileType: cfg.fileType,
      name: COMMON_CHUNK_NAME.StyleDepsImport,
      content: "",
      linkAfter: []
    });
    next.chunks.push({
      type: "string" /* STRING */,
      fileType: cfg.fileType,
      name: COMMON_CHUNK_NAME.StyleCssContent,
      content: `
body {
  -webkit-font-smoothing: antialiased;
}
`,
      linkAfter: [COMMON_CHUNK_NAME.StyleDepsImport]
    });
    next.chunks.push({
      type: "string" /* STRING */,
      fileType: cfg.fileType,
      name: COMMON_CHUNK_NAME.StyleCssContent,
      content: ir.css || "",
      linkAfter: [COMMON_CHUNK_NAME.StyleDepsImport]
    });
    return next;
  };
  return plugin;
};
var globalStyle_default3 = pluginFactory41;

// src/utils/version.ts
var version_exports = {};
__export(version_exports, {
  calcCompatibleVersion: () => calcCompatibleVersion
});
import semver from "semver";
function calcCompatibleVersion(v1, v2) {
  if (!v1 && !v2) {
    return "*";
  }
  if (!v1 || v1 === "*") {
    return v2 || "*";
  }
  if (!v2 || v2 === "*") {
    return v1;
  }
  if (v1 === v2) {
    return v1;
  }
  if (!semver.intersects(v1, v2, { loose: true })) {
    throw new Error(`no compatible versions for "${v1}" and "${v2}"`);
  }
  if (semver.subset(v1, v2, { loose: true })) {
    return v1;
  }
  return v2;
}

// src/plugins/project/framework/rax/plugins/packageJSON.ts
var pluginFactory42 = (cfg) => {
  const plugin = async (pre) => {
    const next = {
      ...pre
    };
    const ir = next.ir;
    const npmDeps = getNpmDependencies(ir);
    const packageJson = {
      name: (cfg == null ? void 0 : cfg.packageName) || "rax-demo-app",
      private: true,
      version: (cfg == null ? void 0 : cfg.packageVersion) || "1.0.0",
      scripts: {
        start: "rax-app start",
        build: "rax-app build",
        eslint: "eslint --ext .js,.jsx ./",
        stylelint: 'stylelint "**/*.{css,scss,less}"',
        prettier: "prettier **/* --write",
        lint: "npm run eslint && npm run stylelint"
      },
      dependencies: {
        ...buildDataSourceDependencies(ir, cfg == null ? void 0 : cfg.datasourceConfig),
        "universal-env": "^3.2.0",
        "intl-messageformat": "^9.3.6",
        rax: "^1.1.0",
        "rax-document": "^0.1.6",
        ...npmDeps.reduce(
          (acc, npm) => ({
            ...acc,
            [npm.package]: npm.version || "*"
          }),
          {}
        )
      },
      devDependencies: {
        "@iceworks/spec": "^1.0.0",
        "rax-app": "^3.0.0",
        eslint: "^6.8.0",
        prettier: "^2.1.2",
        stylelint: "^13.7.2"
      }
    };
    next.chunks.push({
      type: "json" /* JSON */,
      fileType: "json" /* JSON */,
      name: COMMON_CHUNK_NAME.FileMainContent,
      content: packageJson,
      linkAfter: []
    });
    return next;
  };
  return plugin;
};
var packageJSON_default3 = pluginFactory42;
function getNpmDependencies(project) {
  const npmDeps = [];
  const npmNameToPkgMap = /* @__PURE__ */ new Map();
  const allDeps = project.packages;
  allDeps.forEach((dep) => {
    if (!isNpmInfo(dep)) {
      return;
    }
    const existing = npmNameToPkgMap.get(dep.package);
    if (!existing) {
      npmNameToPkgMap.set(dep.package, dep);
      npmDeps.push(dep);
      return;
    }
    if (existing.version !== dep.version) {
      try {
        npmNameToPkgMap.set(dep.package, {
          ...existing,
          version: calcCompatibleVersion(existing.version, dep.version)
        });
      } catch (e) {
        throw new Error(
          `Cannot find compatible version for ${dep.package}. Detail: ${getErrorMessage(e)}`
        );
      }
    }
  });
  return npmDeps;
}

// src/plugins/project/framework/rax/index.ts
var rax_default = {
  template: template_default3,
  plugins: {
    appConfig: appConfig_default2,
    buildConfig: buildConfig_default2,
    entry: entry_default2,
    entryDocument: entryDocument_default,
    globalStyle: globalStyle_default3,
    packageJSON: packageJSON_default3
  }
};

// src/solutions/rax-app.ts
function createRaxProjectBuilder(options) {
  return createProjectBuilder({
    inStrictMode: options == null ? void 0 : options.inStrictMode,
    extraContextData: { ...options },
    template: rax_default.template,
    plugins: {
      components: [
        commonDeps_default(),
        esmodule_default({ fileType: "jsx", useAliasName: false }),
        containerClass_default2(),
        containerInitState_default2(),
        containerMethods_default(),
        containerInjectContext_default2(),
        containerInjectDataSourceEngine_default2(options),
        containerInjectUtils_default2(),
        containerLifeCycle_default2(),
        jsx_default2(),
        css_default()
      ],
      pages: [
        commonDeps_default(),
        esmodule_default({ fileType: "jsx" }),
        containerClass_default2(),
        containerInitState_default2(),
        containerMethods_default(),
        containerInjectContext_default2(),
        containerInjectDataSourceEngine_default2(options),
        containerInjectUtils_default2(),
        containerLifeCycle_default2(),
        jsx_default2(),
        css_default()
      ],
      appConfig: [rax_default.plugins.appConfig(options)],
      buildConfig: [rax_default.plugins.buildConfig(options)],
      entry: [rax_default.plugins.entry(options)],
      constants: [constants_default()],
      utils: [esmodule_default(), utils_default("rax")],
      i18n: [i18n_default()],
      globalStyle: [
        rax_default.plugins.globalStyle({ fileType: (options == null ? void 0 : options.globalStylesFileType) || "css" })
      ],
      htmlEntry: [rax_default.plugins.entryDocument(options)],
      packageJSON: [rax_default.plugins.packageJSON(options)]
    },
    postProcessors: [prettier_default()],
    customizeBuilderOptions: options == null ? void 0 : options.customizeBuilderOptions
  });
}
var plugins3 = {
  containerClass: containerClass_default2,
  containerLifeCycles: containerLifeCycle_default2,
  containerMethods: containerMethods_default,
  containerInitState: containerInitState_default2,
  containerInjectContext: containerInjectContext_default2,
  containerInjectDataSourceEngine: containerInjectDataSourceEngine_default2,
  containerInjectUtils: containerInjectUtils_default2,
  jsx: jsx_default2,
  commonDeps: commonDeps_default,
  raxApp: rax_default
};

// src/plugins/common/requireUtils.ts
var pluginFactory43 = () => {
  const plugin = async (pre) => {
    const next = {
      ...pre
    };
    next.chunks.push({
      type: "string" /* STRING */,
      fileType: "jsx" /* JSX */,
      name: COMMON_CHUNK_NAME.InternalDepsImport,
      content: "import * from 'react';",
      linkAfter: []
    });
    return next;
  };
  return plugin;
};
var requireUtils_default = pluginFactory43;

// src/utils/index.ts
var utils_exports = {};
__export(utils_exports, {
  common: () => common_exports,
  compositeType: () => compositeType_exports,
  dataSource: () => dataSource_exports,
  expressionParser: () => expressionParser_exports,
  jsExpression: () => jsExpression_exports,
  jsSlot: () => jsSlot_exports,
  nodeToJSX: () => nodeToJSX_exports,
  pathHelper: () => pathHelper_exports,
  resultHelper: () => resultHelper_exports,
  schema: () => schema_exports,
  scope: () => Scope_exports,
  templateHelper: () => templateHelper_exports,
  validate: () => validate_exports,
  version: () => version_exports
});

// src/index.ts
var src_default = {
  createProjectBuilder,
  createModuleBuilder,
  solutions: {
    icejs: createIceJsProjectBuilder,
    icejs3: createIceJsProjectBuilder2,
    rax: createRaxProjectBuilder
  },
  solutionParts: {
    icejs: icejs_default,
    icejs3: icejs3_default,
    rax: rax_default
  },
  publishers: {
    disk: createDiskPublisher,
    zip: createZipPublisher
  },
  plugins: {
    common: {
      esmodule: esmodule_default,
      esModule: esmodule_default,
      requireUtils: requireUtils_default,
      styleImport: styleImport_default
    },
    style: {
      css: css_default
    },
    project: {
      constants: constants_default,
      i18n: i18n_default,
      utils: utils_default
    },
    icejs: {
      ...plugins
    },
    icejs3: {
      ...plugins2
    },
    rax: {
      ...plugins3
    },
    react: {
      ...plugins
    }
  },
  postprocessor: {
    prettier: prettier_default
  },
  utils: utils_exports,
  chunkNames: {
    COMMON_CHUNK_NAME,
    CLASS_DEFINE_CHUNK_NAME,
    REACT_CHUNK_NAME
  },
  defaultLinkAfter: {
    COMMON_DEFAULT_LINK_AFTER: DEFAULT_LINK_AFTER
  },
  constants: const_exports
};
export {
  BUILTIN_SLOT_NAMES,
  CLASS_DEFINE_CHUNK_NAME,
  COMMON_CHUNK_NAME,
  COMMON_SUB_MODULE_NAME,
  CONTAINER_TYPE,
  ChunkBuilder,
  ChunkType,
  CodeBuilder,
  CodeGeneratorError,
  CompatibilityError,
  ComponentValidationError,
  DEFAULT_LINK_AFTER,
  DependencyType,
  FILE_TYPE_FAMILY,
  FileType,
  InternalDependencyType,
  NATIVE_ELE_PKG,
  PIECE_TYPE,
  PluginType,
  ProjectBuilder,
  PublisherError,
  SUPPORT_SCHEMA_VERSION_LIST,
  SchemaParser,
  componentAnalyzer,
  createModuleBuilder,
  createProjectBuilder,
  src_default as default,
  groupChunks,
  isBuiltinSlotName
};
//# sourceMappingURL=index.js.map
