export type Posts = {
  id: number;
  message: string;
  likeCount: number;
};

export type Photos = {
  small: string | null;
  large: string | null;
};

export type Contacts = {
  github: string;
  vk: string;
  facebook: string;
  instagram: string;
  twitter: string;
  website: string;
  youtube: string;
  mainlink: string;
};

export type Profile = {
  userId: number;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  contacts: Contacts;
  photos: Photos;
  aboutMe: string,
 
};

export type UsersType = {
  id: number;
  name: string;
  status: string;
  photos: Photos;
  followed: boolean;
};
