import { IsString, IsMongoId, IsArray } from 'class-validator';

export class Article {

  _id?: string;

  @IsMongoId()
  userId: string;

  @IsString()
  title: string;

  @IsString()
  text: string;

  @IsArray()
  @IsString({ each: true })
  tags: string[];

}
