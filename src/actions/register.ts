"use server";
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
  //requisição para fazer cadastro
  return { error: null };
};
