
import axios from "axios";
import { UsersType } from "../Types/types";


export const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0",
});
export 
type ItemsType = 
{
  items: Array<UsersType>
  totalCount: number
  error: string | null
}

export enum ResultCode {
  Sucess = 0,
  Error = 1, 
}

export enum ResultCodeCaptcha 
{
  Captcha = 10,
}

export type ResponseType<D = {}, RC = ResultCode> = 
{
    url: string;
    data: D
    messages:  Array<string>
    resultCode: RC
}

