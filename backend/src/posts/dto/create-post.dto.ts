import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  title: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @MaxLength(2000)
  content: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  author: string;
}
