import { PaginatedResponseDto } from "../dto/paginated-response.dto";

export function paginateResponse<T>(data: [result: T[], total: number], page: number, limit: number): PaginatedResponseDto<T> {
  const [result, total] = data;
  const lastPage = Math.ceil(total / limit);
  const nextPage = page + 1 > lastPage ? null : page + 1;
  const prevPage = page - 1 < 1 ? null : page - 1;
  return {
    data: [...result],
    total: total,
    nextPage: nextPage,
    previousPage: prevPage,
    lastPage: lastPage,
  }
}