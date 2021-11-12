import { CliConfig } from './../../config';
import {
  Rule,
  mergeWith,
  apply,
  url,
  move,
  MergeStrategy,
  applyTemplates,
  chain,
  noop,
  filter
} from '@angular-devkit/schematics';
import { normalize } from 'path';
import { strings } from '@angular-devkit/core';
import { join } from 'path';
import { setConfigToOptions } from '../../utils/options';
import { setViewRouter } from '../view';

export function crudTemplate(options: CliConfig): Rule {
  return () => {
    // 设置默认和用户配置
    options = setConfigToOptions(options);

    const dirPath = options.module
      ? join(options.viewPath, options.module)
      : options.viewPath; // 添加view文件夹所在的地址

    const movePath = normalize(dirPath);
    const templateSource = apply(url('./templates'), [
      options.module
        ? filter((path) => !path.endsWith('index.route.ts.template'))
        : noop(),
      applyTemplates({ ...strings, ...options }),
      move(movePath)
    ]);
    return chain([
      setViewRouter(options),
      mergeWith(templateSource, MergeStrategy.Overwrite)
    ]);
  };
}
