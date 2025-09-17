"use client";

import { login } from "@/actions/login";
import { setAuthCookie } from "@/actions/set-auth-cookie";
import { useAuthStore } from "@/store/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ChangeEvent, FormEvent, useState, useTransition } from "react";
import z from "zod";

const schema = z.object({
  email: z.email({ message: "E-mail invalido" }),
  password: z
    .string()
    .min(6, { message: "Senha deve ter pelo menos 6 caracteres" }),
});
type ErrorStructure = {
  email?: string;
  password?: string;
  form?: string;
};

export const LoginForm = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<ErrorStructure>({});
  const [pending, startTranstion] = useTransition();
  const authStore = useAuthStore((state) => state);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }));
    setErrors((errors) => ({
      ...errors,
      [e.target.name]: undefined,
      form: undefined,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      const fieldErrors: any = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0]] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    startTranstion(async () => {
      const res = await login(form);
      if (res.error) {
        setErrors({ form: res.error });
      } else if (res.token) {
        await setAuthCookie(res.token);
        authStore.setToken(res.token);
        redirect("/");
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-200 p-8 rounded-sm "
    >
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <div className="mb-4">
        <label className="mb-1">Email</label>
        <input
          autoFocus
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full border border-gray-200 rounded-sm px-3 py-2 outline-none transition
               focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
          disabled={pending}
        />
        {errors.email && (
          <div className="text-red-500 text-sm mt-1">{errors.email} </div>
        )}
      </div>
      <div className="mb-4">
        <label className="mb-1">Senha</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          className="w-full border border-gray-200 rounded-sm px-3 py-2 outline-none transition
               focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
          disabled={pending}
        />
        {errors.password && (
          <div className="text-red-500 text-sm mt-1">{errors.password} </div>
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-sm"
        disabled={pending}
      >
        {pending ? "Entrando..." : "Entrar"}
      </button>
      {errors.form && (
        <div className="text-red-500 text-sm mt-1">{errors.form} </div>
      )}
      <div className="text-center text-sm">
        <Link href={"/register"} className="text-gray-500 text-sm">
          Ainda nao tem conta? Se Cadastre
        </Link>
      </div>
    </form>
  );
};
