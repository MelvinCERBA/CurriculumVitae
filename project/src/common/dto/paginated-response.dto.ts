export abstract class PaginatedResponseDto<T> {
  data: T[];
  total: number;
  current_page: number;
  limit: number;
}