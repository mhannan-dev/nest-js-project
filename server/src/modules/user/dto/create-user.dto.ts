import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsEnum,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { UserType } from '../user-type.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  @IsNotEmpty()
  email: string;

  @IsEnum(UserType)
  @IsNotEmpty()
  type: UserType;

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;
}
