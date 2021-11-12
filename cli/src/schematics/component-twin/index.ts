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
import { normalize, join } from 'path';
import { strings } from '@angular-devkit/core';

export function twinComponent(options: CliConfig): Rule {
  return () => {
    // 设置默认和用户配置
    options = setConfigToOptions(options);

    const baseMovePath = normalize(options.baseComponentPath);
    const baseTemplateSource = apply(url(join('../component-base/templates')), [
      applyTemplates({
        ...strings,
        ...options
      }),
      move(baseMovePath)
    ]);

    const customizeMovePath = normalize(options.customizeComponentPath);
    const customizeTemplateSource = apply(url('./templates'), [
      applyTemplates({
        ...strings,
        ...options
      }),
      move(customizeMovePath)
    ]);
    return chain([
      mergeWith(baseTemplateSource, MergeStrategy.Overwrite),
      mergeWith(customizeTemplateSource, MergeStrategy.Overwrite)
    ]);
  };
}
