import { FunctionalComponentAdapter } from '@/core/dtos/component-functional.dto';

export interface FlBreadcrumbItemAdapter {
  label: string;
  // 以下是 Element UI Attrs 和 events
  // @see https://element.eleme.cn/#/zh-CN/component/breadcrumb#breadcrumb-item-attributes
  to?: string | object;
  replace?: boolean;
}

export interface FlBreadcrumbAdapter extends FunctionalComponentAdapter {
  items: FlBreadcrumbItemAdapter[];
  on?: {};
  // 以下是 Element UI Attrs 和 events
  // @see https://element.eleme.cn/#/zh-CN/component/breadcrumb#breadcrumb-attributes
  separator?: string;
  separatorClass?: string;
}
