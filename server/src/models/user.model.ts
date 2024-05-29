"use strict";

export type TUser = {
  id?: number;
  name?: string;
  username?: string;
  birthdate?: Date;
  address?: string;
  gender?: string;
  email?: string;
  password?: string;
  imageProfile?: Buffer;
  role?: string;
  referralCode?: string;
  referenceCode?: string;
  pointBalance?: number;
  pointExpiry?: Date;
};

export type TDecode = {
  type: string;
  user: TUser;
};
