import CodeGen from '@alilc/lowcode-code-generator';

import examplePlugin from './plugins/example';

export default function createMyNewlowcodeProjectBuilder() {
  return CodeGen.createProjectBuilder({
    template: CodeGen.solutionParts.icejs.template,
    plugins: {
      components: [
        CodeGen.plugins.icejs.reactCommonDeps(),
        CodeGen.plugins.common.esModule({ fileType: 'jsx' }),
        CodeGen.plugins.common.styleImport(),
        CodeGen.plugins.icejs.containerClass(),
        CodeGen.plugins.icejs.containerInjectContext(),
        CodeGen.plugins.icejs.containerInjectUtils(),
        CodeGen.plugins.icejs.containerInjectDataSourceEngine(),
        CodeGen.plugins.icejs.containerInjectI18n(),
        CodeGen.plugins.icejs.containerInjectConstants(),
        CodeGen.plugins.icejs.containerInitState(),
        CodeGen.plugins.icejs.containerLifeCycle(),
        CodeGen.plugins.icejs.containerMethod(),
        examplePlugin(),
        CodeGen.plugins.icejs.jsx({
          nodeTypeMapping: {
            Div: 'div',
            Component: 'div',
            Page: 'div',
            Block: 'div',
          },
        }),
        CodeGen.plugins.style.css(),
      ],
      pages: [
        CodeGen.plugins.icejs.reactCommonDeps(),
        CodeGen.plugins.common.esModule({ fileType: 'jsx' }),
        CodeGen.plugins.common.styleImport(),
        CodeGen.plugins.icejs.containerClass(),
        CodeGen.plugins.icejs.containerInjectContext(),
        CodeGen.plugins.icejs.containerInjectUtils(),
        CodeGen.plugins.icejs.containerInjectDataSourceEngine(),
        CodeGen.plugins.icejs.containerInjectI18n(),
        CodeGen.plugins.icejs.containerInjectConstants(),
        CodeGen.plugins.icejs.containerInitState(),
        CodeGen.plugins.icejs.containerLifeCycle(),
        CodeGen.plugins.icejs.containerMethod(),
        examplePlugin(),
        CodeGen.plugins.icejs.jsx({
          nodeTypeMapping: {
            Div: 'div',
            Component: 'div',
            Page: 'div',
            Block: 'div',
          },
        }),
        CodeGen.plugins.style.css(),
      ],
      router: [
        CodeGen.plugins.common.esModule(),
        CodeGen.solutionParts.icejs.plugins.router(),
      ],
      entry: [CodeGen.solutionParts.icejs.plugins.entry()],
      constants: [CodeGen.plugins.project.constants()],
      utils: [
        CodeGen.plugins.common.esModule(),
        CodeGen.plugins.project.utils('react'),
      ],
      i18n: [CodeGen.plugins.project.i18n()],
      globalStyle: [CodeGen.solutionParts.icejs.plugins.globalStyle()],
      htmlEntry: [CodeGen.solutionParts.icejs.plugins.entryHtml()],
      packageJSON: [CodeGen.solutionParts.icejs.plugins.packageJSON()],
    },
    postProcessors: [CodeGen.postprocessor.prettier()],
  });
}
