import React, { useState } from "react";

import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";

import "./styles.css";

import { MUTATION_UPSERT_MUSCLE_ASSESMENT } from "@/apollo/mutations";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { MuscleAssesment } from "@/types";

const CadMuscleAssesment: React.FC = ({}) => {
  const [form, setForm] = useState<MuscleAssesment>();
  const [createMuscleAssesment] = useMutation(MUTATION_UPSERT_MUSCLE_ASSESMENT);

  const router = useRouter();

  const handleForm = (name: string, value: unknown) => {
    setForm((old) => ({ ...old, [name]: value }));
  };

  const back = () => {
    router.push("http://localhost:3000/");
  };

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault(); // Previne o comportamento padrão do formulário

    try {
      await createMuscleAssesment({
        variables: {
          data: {
            form,
          },
        },
      });
      setForm(undefined); // Limpa o input após o envio
    } catch (err) {
      console.error("Erro ao criar avalicao fisica:", err);
    }
  };

  return (
    <div className="mt-10 main-container">
      <h1 className="sub-title mb-4">Cadastro de avaliação física</h1>
      <form onSubmit={handleSubmit}>
        <section className="card-container p-5 flex justify-center gap-4 mb-10 flex-col">
          <div className="row">
            <Input
              text="Avaliador fisico"
              type="text"
              placeholder="Digite o nome do avaliador fisico..."
              onChange={(ev) => handleForm("personalTrainer", ev.currentTarget)}
            />

            <Input
              text="Data avaliação"
              type="text"
              onChange={(ev) => handleForm("avaliationDate", ev.currentTarget)}
              disabled
            />
          </div>
          <div className="row">
            <Input
              text="Biceps Esquerdo em centimentros (cm)"
              type="number"
              placeholder="Biceps esquerdo..."
              onChange={(ev) => handleForm("bicepsLeft", ev.currentTarget)}
            />

            <Input
              text="Biceps Direito em centimentros (cm)"
              type="number"
              placeholder="Biceps Direito..."
              onChange={(ev) => handleForm("bicepsRight", ev.currentTarget)}
            />
          </div>
          <div className="row">
            <Input
              text="Panturrilha Esquerdo em centimentros (cm)"
              type="number"
              placeholder="Panturrilha esquerdo..."
              onChange={(ev) => handleForm("calfLeft", ev.currentTarget)}
            />

            <Input
              text="Panturrilha Direito em centimentros (cm)"
              type="number"
              placeholder="Panturrilha Direito..."
              onChange={(ev) => handleForm("calfRight", ev.currentTarget)}
            />
          </div>
          <div className="row">
            <Input
              text="Coxa Esquerda em centimentros (cm)"
              type="number"
              placeholder="Coxa esquerda..."
              onChange={(ev) => handleForm("thighLeft", ev.currentTarget)}
            />

            <Input
              text="Coxa Direita em centimentros (cm)"
              type="number"
              placeholder="Coxa Direita..."
              onChange={(ev) => handleForm("thighRight", ev.currentTarget)}
            />
          </div>
          <div className="row">
            <Input
              text="Antebraço Esquerdo em centimentros (cm)"
              type="number"
              placeholder="Antebraço esquerdo..."
              onChange={(ev) => handleForm("forearmLeft", ev.currentTarget)}
            />

            <Input
              text="Antebraço Direito em centimentros (cm)"
              type="number"
              placeholder="Antebraço Direito..."
              onChange={(ev) => handleForm("forearmRight", ev.currentTarget)}
            />
          </div>
          <div className="row">
            <Input
              text="Peito em centimentros (cm)"
              type="number"
              placeholder="Peito..."
              onChange={(ev) => handleForm("chest", ev.currentTarget)}
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

export default CadMuscleAssesment;
