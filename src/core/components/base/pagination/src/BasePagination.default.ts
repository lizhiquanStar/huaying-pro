import { PaginationAdapter } from './BasePagination.adapter';

export const PAFINATION_DEFAULT: PaginationAdapter = {
  layout: 'total, sizes, prev, pager, next, jumper',
  pageSizes: [10, 20, 30, 40, 50, 100],
  currentPage: 1,
  pageSize: 10,
  total: 0,
  disabled: false,
  hideOnSinglePage: false
};
