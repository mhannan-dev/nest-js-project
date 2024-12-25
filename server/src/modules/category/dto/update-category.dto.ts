import {
  IsString,
  IsOptional,
  IsBoolean,
  IsNumber,
  MinLength,
} from 'class-validator';

export class UpdateCategoryDto {
  @IsString()
  @IsOptional()
  @MinLength(3, { message: 'Name must be at least 3 characters long' })
  name?: string;

  @IsString()
  @IsOptional()
  slug?: string;

  @IsNumber()
  @IsOptional()
  parent_id?: number;

  @IsBoolean()
  @IsOptional()
  status?: boolean;
}
