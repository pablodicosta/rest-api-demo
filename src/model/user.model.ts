import { IsString, IsUrl } from "class-validator";

export class User {

  _id?: string;

  @IsString()
  name: string;

  @IsUrl()
  avatar: string;
}