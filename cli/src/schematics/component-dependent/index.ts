import { InsertChange } from './../../utils/change';
import { CliConfig } from '../../config';
import {
  url,
  Rule,
  applyTemplates,
  move,
  chain,
  mergeWith,
  MergeStrategy,
  apply,
  Tree
} from '@angular-devkit/schematics';
import { setConfigToOptions } from '../../utils/options';
import { normalize, join } from 'path';
import { strings } from '@angular-devkit/core';
import { readIntoSourceFile } from '../../utils/file';
import ts = require('typescript');
import {
  findNodes,
  getObjectField,
  insertImport,
  isImported
} from '../../utils/ast-utils';

/**
 * 将组件注入到父级页面
 * @param options 配置项
 */
function injectComponentToHost(options: CliConfig): Rule {
  return (host: Tree) => {
    const classifyName = `Bs${strings.classify(options.name)}`;
    const dasherizeName = `bs-${strings.dasherize(options.name)}`;

    const hostFilePath = options.isInnerComponent
      ? join(options.hostPath, `${strings.dasherize(options.hostName)}.vue`)
      : join(
          options.hostPath,
          'src',
          `The${strings.classify(options.hostName)}.vue`
        );
    const hostSource = readIntoSourceFile(host, hostFilePath);

    const hostRecorder = host.beginUpdate(hostFilePath);

    // 注入import语句
    if (
      isImported(
        hostSource,
        classifyName,
        `./components/${strings.dasherize(options.name)}/${strings.dasherize(
          options.name
        )}.vue`
      )
    )
      return host;
    const change = insertImport(
      hostSource,
      hostFilePath,
      classifyName,
      `./components/${strings.dasherize(options.name)}/${strings.dasherize(
        options.name
      )}.vue`,
      true
    );
    if (change instanceof InsertChange) {
      hostRecorder.insertLeft(change.pos, change.toAdd);
    }

    // 注入 compoent引用
    const componentCallExpressionNodes = findNodes(
      hostSource,
      ts.SyntaxKind.ClassDeclaration
    )
      .filter((node) => (node as ts.ClassDeclaration).decorators)
      .map((node) => (node as ts.ClassDeclaration).decorators![0].expression)
      .filter((node) => {
        return (
          ((node as ts.CallExpression).expression as ts.Identifier)
            .escapedText === 'Component'
        );
      });
    if (!componentCallExpressionNodes.length) return host;
    let insertCode = '';
    let pos = 0;
    const callExpressionArgs = (componentCallExpressionNodes[0] as ts.CallExpression)
      .arguments;
    if (!callExpressionArgs.length) {
      // @Component()
      insertCode = `{
  components: {
    ${classifyName} // <${dasherizeName}>
  }
}`;
      pos = componentCallExpressionNodes[0].end - 1;
    } else if (
      !getObjectField(
        callExpressionArgs[0] as ts.ObjectLiteralExpression,
        'components'
      ).length
    ) {
      // @Component({}) 或者 @Component({ ...其它不包含components属性 })
      insertCode = `
  components: {
    ${classifyName} // <${dasherizeName}>
  }
`;
      pos = callExpressionArgs[0].pos + 1;
    } else {
      const componentProperty = (callExpressionArgs[0] as ts.ObjectLiteralExpression).properties.find(
        (node) => node.name && node.name.getText() === 'components'
      ) as ts.PropertyAssignment;
      const hasOtherComponents = !!(componentProperty!
        .initializer as ts.ObjectLiteralExpression).properties.length;
      insertCode = hasOtherComponents
        ? `
    ${classifyName}, // <${dasherizeName}>`
        : `
    ${classifyName} // <${dasherizeName}>
  `;
      pos = componentProperty!.initializer.pos + 2;
    }

    const hostChange = new InsertChange(hostFilePath, pos, insertCode);
    hostRecorder.insertLeft(hostChange.pos, hostChange.toAdd);
    host.commitUpdate(hostRecorder);
    return host;
  };
}

export function dependentComponent(options: CliConfig): Rule {
  return () => {
    // 设置默认和用户配置
    options = setConfigToOptions(options);

    const hostPathArr = options.hostPath.split('/');
    const hostName = strings.dasherize(hostPathArr[hostPathArr.length - 1]);
    const isInnerComponent = options.hostPath.includes('components');
    options.hostName = hostName;
    options.isInnerComponent = isInnerComponent;

    const movePath = normalize(
      isInnerComponent
        ? `${options.hostPath}/components`
        : `${options.hostPath}/src/components`
    );
    const templateSource = apply(url('./templates'), [
      applyTemplates({
        ...strings,
        ...options,
        withHostFilePrefix: (s: string) =>
          `${strings.classify(options.businessComponentPrefix)}${s}`
      }),
      move(movePath)
    ]);
    return chain([
      injectComponentToHost(options),
      mergeWith(templateSource, MergeStrategy.Overwrite)
    ]);
  };
}
