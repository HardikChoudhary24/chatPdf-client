import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";
import Cookies from "universal-cookie";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
const cookies = new Cookies();

export const userApi = axios.create({
  baseURL: "http://localhost:8080/api/users",
  headers: {
    Authorization: `Bearer ${cookies.get("chatpdf_token")}`,
  },
});
export const projectApi = axios.create({
  baseURL: "http://localhost:8080/api/project",
  headers: {
    Authorization: `Bearer ${cookies.get("chatpdf_token")}`,
  },
});
