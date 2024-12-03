import { ArrayNotEmpty, IsArray, IsString } from 'class-validator';

export class CreateFeedDto {
  @IsString()
  content: string;

  @IsString({ each: true })
  @IsArray()
  @ArrayNotEmpty()
  images: string[];

  @IsString({ each: true })
  @IsArray()
  captions: string[];

  @IsString({ each: true })
  @IsArray()
  hashtags: string[];
}
