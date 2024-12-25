import { IsInt, Min } from 'class-validator';

export class PaginationDto {
  @IsInt()
  @Min(1, { message: 'page must not be less than 1' })
  page: number;

  @IsInt()
  @Min(1, { message: 'limit must not be less than 1' })
  limit: number;
}
