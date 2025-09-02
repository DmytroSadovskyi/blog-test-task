import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  author: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(500)
  text: string;
}
