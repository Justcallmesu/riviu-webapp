import { BaseModel } from "../globals/Base";

export interface BaseUser extends BaseModel {
  username: string;
  name: string;
  password: string;
}

export interface RegisterUserDto {
  name: string;
  username: string;
  password: string;
  confirmPasword: string;
}

export interface LoginUserDto {
  name: string;
  username: string;
}
