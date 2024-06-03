import { Dispatch } from "@reduxjs/toolkit";
import { axiosInstance } from "@/lib/axios";
import { login } from "../slices/user.slice";
import { TUser } from "@/models/user.model";
import { deleteCookie, getCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";

export const userLogin = ({ username, password }: TUser) => {
  return async (dispatch: Dispatch) => {
    try {
      await axiosInstance().post(
        "/users/v2",
        {
          username,
          password,
        },
        { withCredentials: true }
      );
      const access_token = getCookie("access_token") || "";
      if (access_token) {
        const user: TUser = jwtDecode(access_token);
        dispatch(login(user));
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);

        deleteCookie("access_token");
        alert("Wrong Email/password");

        return error.message;
      }
    }
  };
};

export function keepLogin() {
  return async function dispatch(dispatch: Dispatch) {
    try {
      const token = getCookie("access_token");
      const decode = jwtDecode(token!) as { user: TUser };

      if (token) {
        dispatch(login(decode?.user));
      }
    } catch (error) {
      console.log(error);
      deleteCookie("access_token");
    }
  };
}
