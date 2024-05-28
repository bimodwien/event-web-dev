import axios, { AxiosInstance } from "axios";
import { getCookie } from "cookies-next";

export function axiosInstance(): AxiosInstance {
  const token = getCookie("auth") || "";
  return axios.create({
    baseURL: "http://localhost:8001",
    headers: {
      Authorization: "Bearer" + token,
    },
    withCredentials: true,
  });
}
