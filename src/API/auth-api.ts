import { ResponseType, ResultCode, ResultCodeCaptcha, instance } from "./api";

export type meAPIType = {
  id: number;
  email: string;
  login: string;
};

export type LoginType = {
  userId: number;
};

type GetCaptcha = {
  url: string;
};

export const authAPI = {
  getLogin: () => {
    return instance
      .get<ResponseType<meAPIType>>("/auth/me")
      .then((res) => res.data);
  },
  sendData: (
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: null | string
  ) => {
    return instance
      .post<ResponseType<LoginType, ResultCode | ResultCodeCaptcha>>(
        "/auth/login",
        { email, password, rememberMe, captcha }
      )
      .then((res) => res.data);
  },
  logout: () => {
    return instance.delete("/auth/login");
  },
  getCaptcha() {
    return instance.get<ResponseType<GetCaptcha>>("/security/get-captcha-url");
  },
};
