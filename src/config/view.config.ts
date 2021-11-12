// 这里提供给cli处理，模块引入不能使用 @ 重命名， 请始终使用相对路径
import { ViewConfigAdapter } from 'cli/src/config';

export const VIEW_CONFIG: ViewConfigAdapter = {
  dirs: [
    {
      name: 'report-year-detail',
      type: 'Crud'
    }
  ]
};
