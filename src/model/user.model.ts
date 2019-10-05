import { IsString, IsUrl } from 'class-validator';
import { prop } from '@typegoose/typegoose';

export class User {

  _id?: string;

  @prop({ unique: true })
  @IsString()
  name: string;

  @prop()
  @IsUrl()
  avatar: string;

}
