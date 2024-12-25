import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty({ message: 'The content must not be empty' })
  @Length(1, 255, {
    message: 'The content must be between 1 and 255 characters',
  })
  content: string;

  @IsString()
  @IsNotEmpty({ message: 'The author must not be empty' })
  author: string;
}
