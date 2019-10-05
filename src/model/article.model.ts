import { IsString, IsMongoId, IsArray } from 'class-validator';
import { prop, arrayProp } from '@typegoose/typegoose';

export class Article {

  _id?: string;

  @prop()
  @IsMongoId()
  userId: string;

  @prop({ unique: true })
  @IsString()
  title: string;

  @prop()
  @IsString()
  text: string;

  @arrayProp({ items: String })
  @IsArray()
  @IsString({ each: true })
  tags: string[];

}
