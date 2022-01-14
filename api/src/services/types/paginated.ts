type Paginated<T = unknown> = {
  page: number;
  pageSize: number;
  rows: T[];
  totalRows: number;
  hasNext: boolean;
  search?: string;
};

export default Paginated;
