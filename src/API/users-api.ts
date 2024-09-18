import { AxiosPromise } from "axios";
import { instance, ItemsType, ResponseType } from "./api";

export const usersAPI = {
    getUsers: (currentPage: number, pageSize: number, search: string = ' ', friend: null | string = null) => {
      return instance.get<ItemsType>(`/users?page=${currentPage}&count=${pageSize}&term=${search}` + (friend === null ? " " : `&friend=${friend}`));
    },
    unfollow: (id: number) => {
      return instance.delete<ResponseType>("/follow/" + id) as AxiosPromise<ResponseType>;
    },
    follow: (id: number) => {
      return instance.post<ResponseType>("/follow/" + id);
    },
  };
  
   