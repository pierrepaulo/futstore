import { Address } from "@/types/address";
import {
  ChangeEvent,
  FormEvent,
  startTransition,
  useState,
  useTransition,
} from "react";
import z from "zod";

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
  const [pending, startTransition] = useTransition();

  if (!open) return null;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      setError(result.error.issues[0]?.message || "Preencha todos os campos");
      return;
    }
    setError("");
    startTransition(async () => {
      try {
        await onAdd(form);
        setForm(emptyAddress);
      } catch (err: any) {
        setError(err?.message || "Erro ao salvar o endreço");
      }
    });
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/80 z-50">
      <button
        disabled={pending}
        className="absolute top-2 right-4 text-4xl text-white cursor-pointer"
        onClick={onClose}
      >
        &times;
      </button>
      <div className="bg-white p-6 rounded w-[90vw] max-w-md md:max-w-2xl">
        <h2 className="text-2xl font-bold mb-4"> Adicionar Endereço</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            type="text"
            name="zipcode"
            value={form.zipcode}
            onChange={handleChange}
            placeholder="Digite o CEP"
            disabled={pending}
            className="border border-gray-200 px-3 py-2 rounded outline-0"
          />
          <input
            type="text"
            name="street"
            value={form.street}
            onChange={handleChange}
            placeholder="Digite a rua"
            disabled={pending}
            className="border border-gray-200 px-3 py-2 rounded outline-0"
          />
          <input
            type="text"
            name="number"
            value={form.number}
            onChange={handleChange}
            placeholder="Digite o numero"
            disabled={pending}
            className="border border-gray-200 px-3 py-2 rounded outline-0"
          />
          <input
            type="text"
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="Digite a cidade"
            disabled={pending}
            className="border border-gray-200 px-3 py-2 rounded outline-0"
          />
          <input
            type="text"
            name="state"
            value={form.state}
            onChange={handleChange}
            placeholder="Digite o estado"
            disabled={pending}
            className="border border-gray-200 px-3 py-2 rounded outline-0"
          />
          <input
            type="text"
            name="country"
            value={form.country}
            onChange={handleChange}
            placeholder="Digite o pais"
            disabled={pending}
            className="border border-gray-200 px-3 py-2 rounded outline-0"
          />
          <input
            type="text"
            name="complement"
            value={form.complement}
            onChange={handleChange}
            placeholder="Digite o complemento"
            disabled={pending}
            className="border border-gray-200 px-3 py-2 rounded outline-0"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white p-4 rounded-sm"
            disabled={pending}
          >
            Adicionar
          </button>
        </form>
      </div>
    </div>
  );
};
