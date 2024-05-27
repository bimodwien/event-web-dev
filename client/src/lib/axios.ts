import axios from "axios";
import { getCookie } from "cookies-next";

export function axiosInstance() {
  const token = getCookie("auth") || "";
  return axios.create({
    baseURL: "http://localhost:8001",
    headers: {
      Authorization: "Bearer" + token,
    },
  });
}