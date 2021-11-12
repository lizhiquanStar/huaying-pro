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
import {
  findNodes,
  insertImport,
  getTextIndentation
} from '../../utils/ast-utils';
import ts = require('typescript');
import { InsertChange } from '../../utils/change';

function setViewRouter(options: CliConfig): Rule {
  return (host: Tree) => {
    const classifyName = strings.classify(options.name);

    const routerPath = options.modulePath
      ? join(options.viewPath, options.modulePath, '/index.route.ts')
      : options.mainRouterPath;
    const routerSource = readIntoSourceFile(host, routerPath);
    const viewRouteName = `${classifyName}Routes`;
    const viewRoutePath = options.modulePath
      ? join('./', options.modulePath, '/index.route')
      : join(options.routerToViewPath, options.name, '/index.route');
    const change = insertImport(
      routerSource,
      routerPath,
      viewRouteName,
      viewRoutePath,
      true
    );
    const routerRecorder = host.beginUpdate(routerPath);
    if (change instanceof InsertChange) {
      routerRecorder.insertLeft(change.pos, change.toAdd);
    }

    // 默认最后一个带有routes属性的对象为Router对象
    const arrayNodes = findNodes(routerSource, ts.SyntaxKind.PropertyAssignment)
      .reverse()
      .filter((node: ts.PropertyAssignment) => {
        return node.getChildren().some((node) => node.getText() === 'routes');
      });
    if (arrayNodes && arrayNodes.length) {
      const routerNode = arrayNodes[0];
      const routesArrayNode = routerNode
        .getChildren()
        .find((node) => node.kind === ts.SyntaxKind.ArrayLiteralExpression);
      if (routesArrayNode) {
        const indentation = getTextIndentation(
          (routesArrayNode as ts.ArrayLiteralExpression).elements
            .find(
              (node) => node.kind === ts.SyntaxKind.ObjectLiteralExpression
            )!
            .getFullText()
        );
        const routesChange = new InsertChange(
          routerPath,
          routesArrayNode.pos + 2,
          `${indentation}...${viewRouteName},`
        );
        routerRecorder.insertLeft(routesChange.pos, routesChange.toAdd);
      }
    }

    host.commitUpdate(routerRecorder);
    return host;
  };
}

// function setModuleRouter(options: CliConfig): Rule {
//   return (host: Tree) => {
//     const classifyName = strings.classify(options.name);

//     const routerPath = join(options.viewPath, options.modulePath, '/index.route.ts');
//     const routerSource = readIntoSourceFile(host, routerPath);
//     const viewRouteName = `${classifyName}Routes`;
//     const viewRoutePath = join('./', options.modulePath, '/index.route');
//     const change = insertImport(
//       routerSource,
//       routerPath,
//       viewRouteName,
//       viewRoutePath,
//       true
//     );
//     const routerRecorder = host.beginUpdate(routerPath);
//     if (change instanceof InsertChange) {
//       routerRecorder.insertLeft(change.pos, change.toAdd);
//     }

//     // 默认最后一个export default导出的数组为该moduleRouter对象
//     const insertCode = `${viewRouteName}`;

//     const exportNodes = findNodes(
//       routerSource,
//       ts.SyntaxKind.ExportAssignment
//     );
//     if (exportNodes && exportNodes.length) {
//       const exportObjectNode = (exportNodes[0] as ts.ExportAssignment)
//         .expression as ts.ArrayLiteralExpression;
//       const hasOtherRoute = !!exportObjectNode
//         .elements.length;
//       const routerRecorder = host.beginUpdate(routerPath);
//       routerRecorder.insertLeft(
//         exportObjectNode.pos + 2,
//         `${insertCode}${hasOtherRoute ? ',' : ''}`
//       );

//       host.commitUpdate(routerRecorder);
//     }

//     return host;
//   }
// }

export function module(options: CliConfig): Rule {
  return () => {
    // 设置默认和用户配置
    options = setConfigToOptions(options);

    const movePath = normalize(options.viewPath);
    const templateSource = apply(url('./templates'), [
      applyTemplates({ ...strings, ...options }),
      move(movePath)
    ]);
    return chain([
      setViewRouter(options),
      mergeWith(templateSource, MergeStrategy.Overwrite)
    ]);
  };
}
