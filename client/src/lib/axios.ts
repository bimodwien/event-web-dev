import axios, { AxiosInstance } from "axios";
import { getCookie } from "cookies-next";

export function axiosInstance(): AxiosInstance {
  const token = getCookie("access_token") || "";
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASED_VPS,
    // baseURL: process.env.NEXT_PUBLIC_API_BASED_URL_LOCAL,
    headers: {
      Authorization: "Bearer " + token,
    },
    withCredentials: true,
  });
}
