import React, { useEffect, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";
import { cloneDeep } from "lodash";
import { useMutation, useQuery } from "@apollo/client";

import "./styles.css";

import Input from "@/components/Input";
import Button from "@/components/Button";
import { MedicalRestrictionsInput } from "@/types";
import { QUERY_MEDICAL_RESTRICTIONS_BY_ID } from "@/apollo/queries";
import { MUTATION_UPSERT_MEDICAL_RESTRICTIONS } from "@/apollo/mutations";

const CadMedicalRestrictions: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [createMedicalRestrictions] = useMutation(
    MUTATION_UPSERT_MEDICAL_RESTRICTIONS
  );
  const [form, setForm] = useState<MedicalRestrictionsInput>({
    id: 0,
    idUser: 0,
    heartDisease: false,
    smoker: false,
    surgery: false,
    obs: "",
  });

  const { data, error, loading } = useQuery(QUERY_MEDICAL_RESTRICTIONS_BY_ID, {
    fetchPolicy: "network-only",
    variables: {
      id: Number(id),
    },
  });

  const handleForm = (name: string, value: unknown) => {
    const data: MedicalRestrictionsInput = cloneDeep(form);
    const newMedicalRestrictions: MedicalRestrictionsInput = {
      ...data,
      [name]: value,
    };
    setForm(newMedicalRestrictions);
  };

  const back = (ev?: React.MouseEvent) => {
    if (!!ev) {
      ev.preventDefault();
      ev.stopPropagation();
    }
    router.push("/");
  };

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault(); // Previne o comportamento padrão do formulário

    try {
      await createMedicalRestrictions({
        variables: {
          data: form,
        },
      });
      setForm({
        id: 0,
        idUser: 0,
        heartDisease: false,
        smoker: false,
        surgery: false,
        obs: "",
      }); // Limpa o input após o envio
      back();
    } catch (err) {
      console.error("Erro ao criar avalicao fisica:", err);
    }
  };

  useEffect(() => {
    if (loading || !!error || !data || form?.id !== 0) return;
    setForm(data?.getMedicalRestrictionsById);
  }, [data, error, loading]);

  return (
    <div className="mt-10 main-container">
      <h1 className="sub-title mb-4">Cadastro de avaliação física</h1>
      <form onSubmit={handleSubmit}>
        <section className="card-container p-5 flex justify-center gap-4 mb-10 flex-col">
          <div className="row">
            <label
              htmlFor="smoker"
              className=" flex flex-row gap-2 text-sm items-center"
            >
              <p>Fumante?</p>
              <input
                type="checkbox"
                onChange={() => handleForm("smoker", !form?.smoker)}
                checked={form?.smoker ?? false}
              />
            </label>
          </div>
          <div className="row">
            <label
              htmlFor="heartDisease"
              className=" flex flex-row gap-2 text-sm items-center"
            >
              <p>Doença cardíaca?</p>
              <input
                type="checkbox"
                onChange={() => handleForm("heartDisease", !form?.heartDisease)}
                checked={form?.heartDisease ?? false}
              />
            </label>
          </div>
          <div className="row">
            <label
              htmlFor="surgery"
              className=" flex flex-row gap-2 text-sm items-center"
            >
              <p>Já fez cirurgia?</p>
              <input
                type="checkbox"
                onChange={() => handleForm("surgery", !form?.surgery)}
                checked={form?.surgery ?? false}
              />
            </label>
          </div>
          <div className="row">
            <Input
              text="Breve observação"
              type="text"
              placeholder="Digite uma breve observação..."
              onChange={(ev) => handleForm("obs", ev.target.value)}
              value={form?.obs ?? ""}
            />
          </div>
        </section>

        <div className="flex gap-4">
          <button
            className="text-button-default-color bg-button-default-background hover:text-button-default-hover-color hover:bg-button-default-hover-background h-9 border-none rounded-[4px] cursor-pointer text-[16px] text-base font-semibold tracking-widest w-[12rem] disabled:cursor-not-allowed disabled:text-button-disabled-color disabled:bg-button-disabled-background"
            type="submit"
            disabled={!form}
          >
            <p>Enviar</p>
          </button>
          <Button onClick={back} color="primary" width="12rem">
            <p>Voltar</p>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CadMedicalRestrictions;
