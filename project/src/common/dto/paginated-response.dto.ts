export abstract class PaginatedResponseDto<T> {
  data: T[];
  total: number;
  nextPage: number | null;
  previousPage: number | null;
  lastPage: number;
}