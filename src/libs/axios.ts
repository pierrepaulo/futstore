import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEX_PUBLIC_API_BASE as string,
});
