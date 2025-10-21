"use server";

import { api } from "@/libs/axios";

type RegisterData = {
  name: string;
  email: string;
  password: string;
};
export const register = async ({
  name,
  email,
  password,
}: RegisterData): Promise<{ error: string | null }> => {
  try {
    const response = await api.post("/user/register", {
      name,
      email,
      password,
    });
    if (response.status === 201 && response.data.user) {
      return { error: null };
    }
  } catch {}
  return { error: "Ocorreu um erro" };
};
