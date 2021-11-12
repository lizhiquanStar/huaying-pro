import { CliConfig } from './../config';
import { CLI_DEFAULT_CONFIG } from '../config';

const defaultsDeep = require('lodash/defaultsDeep');

export function setConfigToOptions(options: CliConfig): CliConfig {
  return defaultsDeep(options, CLI_DEFAULT_CONFIG);
}
