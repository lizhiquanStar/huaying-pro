import { CliConfig } from '../../config';
import {
  url,
  Rule,
  applyTemplates,
  move,
  chain,
  mergeWith,
  MergeStrategy,
  apply
} from '@angular-devkit/schematics';
import { setConfigToOptions } from '../../utils/options';
import { normalize } from 'path';
import { strings } from '@angular-devkit/core';

export function uiComponent(options: CliConfig): Rule {
  return () => {
    // 设置默认和用户配置
    options = setConfigToOptions(options);

    const hostPathArr = options.hostPath.split('/');
    const hostName = strings.dasherize(hostPathArr[hostPathArr.length - 1]);
    options.hostName = hostName;

    const movePath = normalize(options.hostPath);
    const templateSource = apply(url('./templates'), [
      applyTemplates({
        ...strings,
        ...options,
        withHostFilePrefix: (s: string) => `The${s}`
      }),
      move(movePath)
    ]);
    return chain([mergeWith(templateSource, MergeStrategy.Overwrite)]);
  };
}
