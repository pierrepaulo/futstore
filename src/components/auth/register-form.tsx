"use client";

import { login } from "@/actions/login";
import { register } from "@/actions/register";
import { setAuthCookie } from "@/actions/set-auth-cookie";
import { useAuthStore } from "@/store/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ChangeEvent, FormEvent, useState, useTransition } from "react";
import z, { string } from "zod";

const schema = z
  .object({
    name: z
      .string()
      .min(2, { message: "Nome deve ter pelo menos 2 caracteres" }),
    email: z.email({ message: "E-mail inválido" }),
    password: z
      .string()
      .min(6, { message: "Senha deve ter pelo menos 6 caracteres" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas devem ser iguais",
    path: ["confirmPassword"],
  });

type ErrorStructure = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  form?: string;
};

export const RegisterForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<ErrorStructure>({});
  const [pending, startTransition] = useTransition();
  const authStore = useAuthStore((state) => state);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }));
    setErrors((error) => ({
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
    startTransition(async () => {
      const res = await register(form);
      if (res.error) {
        setErrors({ form: res.error });
      } else {
        redirect("/login");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-sm ">
      <h2 className="text-xl font-bold mb-4">Cadastro</h2>
      <div className="mb-4">
        <label className="mb-1">Nome</label>
        <input
          autoFocus
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border border-gray-200 rounded-sm px-3 py-3"
          disabled={pending}
        />
        {errors.name && (
          <div className="text-red-500 text-sm mt-1">{errors.name} </div>
        )}
      </div>
      <div className="mb-4">
        <label className="mb-1">E-mail</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full border border-gray-200 rounded-sm px-3 py-3"
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
          className="w-full border border-gray-200 rounded-sm px-3 py-3"
          disabled={pending}
        />
        {errors.password && (
          <div className="text-red-500 text-sm mt-1">{errors.password} </div>
        )}
      </div>
      <div className="mb-4">
        <label className="mb-1">Confirmar Senha</label>
        <input
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          className="w-full border border-gray-200 rounded-sm px-3 py-3"
          disabled={pending}
        />
        {errors.confirmPassword && (
          <div className="text-red-500 text-sm mt-1">
            {errors.confirmPassword}{" "}
          </div>
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 py-2 rounded text-white"
        disabled={pending}
      >
        {pending ? "Cadastrando..." : "Cadastrar"}
      </button>
      {errors.form && (
        <div className="text-red-500 text-sm mt-1">{errors.form} </div>
      )}
      <div className="text-center mt-4">
        <Link href={"/login"} className="text-gray-500 text-sm">
          Já tem conta? Faça login
        </Link>
      </div>
    </form>
  );
};
