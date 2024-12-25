import { IsString, MinLength } from 'class-validator';

export class CreateQuizDto {
  @IsString()
  @MinLength(3, { message: 'Title must be at least 3 characters long' })
  title: string;

  @IsString()
  @MinLength(3, { message: 'There must be at least one question' })
  @IsString()
  question: string;
}
