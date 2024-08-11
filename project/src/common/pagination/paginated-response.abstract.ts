export class PaginatedResponse<T> {
  data: T[];
  total: number;
  nextPage: number | null;
  previousPage: number | null;
  lastPage: number;
}