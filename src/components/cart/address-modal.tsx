import { Address } from "@/types/adress";
import { ChangeEvent, FormEvent, useState, useTransition } from "react";
import { z } from "zod";

const schema = z.object({
  zipcode: z.string().min(1, "CEP é obrigatorio"),
  street: z.string().min(1, "Rua é obrigatoria"),
  number: z.string().min(1, "Numero é obrigatorio"),
  city: z.string().min(1, "Cidade é obrigatoria"),
  state: z.string().min(1, "Estado é obrigatorio"),
  country: z.string().min(1, "Pais é obrigatorio"),
  complement: z.string().optional(),
});

type Props = {
  open: boolean;
  onClose: () => void;
  onAdd: (address: Address) => Promise<void>;
};

export const AddressModal = ({ open, onClose, onAdd }: Props) => {
  const emptyAddress: Address = {
    zipcode: "",
    street: "",
    number: "",
    city: "",
    state: "",
    country: "",
    complement: "",
  };
  const [form, setForm] = useState<Address>(emptyAddress);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  if (!open) return null;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const result = schema.safeParse(form);
    if (!result.success) {
      setError(result.error.issues[0]?.message ?? "Preencha todos os campos");
      return;
    }

    setError("");
    try {
      await onAdd(form);
      startTransition(() => {
        setForm(emptyAddress);
        onClose();
      });
    } catch (err: any) {
      setError(err?.message ?? "Erro ao salvar o endereço");
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/90 z-50">
      <button
        disabled={isPending}
        className="cursor-pointer absolute top-2 right-4 text-4xl text-white"
        onClick={onClose}
        aria-label="Fechar"
      >
        &times;
      </button>

      <div className="bg-white p-6 rounded w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Adicionar Endereço</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            name="zipcode"
            value={form.zipcode}
            onChange={handleChange}
            placeholder="Digite o cep"
            disabled={isPending}
            className="border border-gray-200 px-3 py-2 rounded outline-0"
          />
          <input
            name="street"
            value={form.street}
            onChange={handleChange}
            placeholder="Digite a rua"
            disabled={isPending}
            className="border border-gray-200 px-3 py-2 rounded outline-0"
          />
          <input
            name="number"
            value={form.number}
            onChange={handleChange}
            placeholder="Digite o numero"
            disabled={isPending}
            className="border border-gray-200 px-3 py-2 rounded outline-0"
          />
          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="Digite a cidade"
            disabled={isPending}
            className="border border-gray-200 px-3 py-2 rounded outline-0"
          />
          <input
            name="state"
            value={form.state}
            onChange={handleChange}
            placeholder="Digite o estado"
            disabled={isPending}
            className="border border-gray-200 px-3 py-2 rounded outline-0"
          />
          <input
            name="country"
            value={form.country}
            onChange={handleChange}
            placeholder="Digite o pais"
            disabled={isPending}
            className="border border-gray-200 px-3 py-2 rounded outline-0"
          />
          <input
            name="complement"
            value={form.complement}
            onChange={handleChange}
            placeholder="Digite o complemento"
            disabled={isPending}
            className="border border-gray-200 px-3 py-2 rounded outline-0"
          />

          <button
            type="submit"
            className="w-full mt-4 bg-blue-600 text-white p-4 rounded-sm"
            disabled={isPending}
          >
            {isPending ? "Salvando..." : "Adicionar"}
          </button>

          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        </form>
      </div>
    </div>
  );
};
