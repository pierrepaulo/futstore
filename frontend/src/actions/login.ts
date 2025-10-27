"use server";

import { api } from "@/libs/axios";

type LoginData = {
  email: string;
  password: string;
};
export const login = async ({
  email,
  password,
}: LoginData): Promise<{ error: string | null; token?: string }> => {
  try {
    const response = await api.post("/user/login", { email, password });
    if (response.status === 200 && response.data.token) {
      return {
        error: null,
        token: response.data.token,
      };
    }
  } catch {}
  return { error: "Acesso negado" };
};
