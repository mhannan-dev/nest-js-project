import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  type?: string;

  @IsString()
  @MinLength(6)
  @IsOptional()
  password?: string;
}
