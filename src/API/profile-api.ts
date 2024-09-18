import { Photos, Profile } from "../Types/types";
import { ResponseType, instance } from "./api";

type SavePhoto = 
{
    photos: Photos
}

export const profileAPI = {
    getProfile: (id: number | null) => {
      return instance.get<Profile>(`/profile/${id}`);
    },
    getStatus: (id: number) => {
      return instance.get<string>(`/profile/status/${id}`);
    },
    updateStatus: (status: string) => {
      return instance.put<ResponseType>("/profile/status", { status });
    },
    sendPhoto: (image: any) =>
    {
      var formData = new FormData();
      formData.append("image", image)
      return instance.put<ResponseType<SavePhoto>>('/profile/photo', formData)
    },
    saveProfile: (data: Profile) =>
    {
      return instance.put<ResponseType<Profile>>('/profile', data)
    }
  };