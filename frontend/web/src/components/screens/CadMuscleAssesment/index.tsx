import React, { useEffect, useState } from "react";

import moment from "moment";
import cloneDeep from "lodash/cloneDeep";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation, useQuery } from "@apollo/client";

import "./styles.css";

import Input from "@/components/Input";
import Button from "@/components/Button";
import { MuscleAssesmentInput } from "@/types";
import { QUERY_MUSCLE_ASSESMENT_BY_ID } from "@/apollo/queries";
import { MUTATION_UPSERT_MUSCLE_ASSESMENT } from "@/apollo/mutations";

const CadMuscleAssesment: React.FC = ({}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [createMuscleAssesment] = useMutation(MUTATION_UPSERT_MUSCLE_ASSESMENT);
  const [form, setForm] = useState<MuscleAssesmentInput>({
    id: 0,
    idUser: 0,
    avaliationDate: new Date(),
    bicepsLeft: 0,
    bicepsRight: 0,
    calfLeft: 0,
    calfRight: 0,
    chest: 0,
    forearmLeft: 0,
    forearmRight: 0,
    thighLeft: 0,
    thighRight: 0,
    personalTrainer: "",
    height: 0,
    weight: 0,
  });

  const { data, error, loading } = useQuery(QUERY_MUSCLE_ASSESMENT_BY_ID, {
    fetchPolicy: "network-only",
    variables: {
      id: Number(id),
    },
  });

  const handleForm = (name: string, value: unknown) => {
    const data: MuscleAssesmentInput = cloneDeep(form);
    const newMuscleAssesment: MuscleAssesmentInput = {
      ...data,
      [name]: value,
    };
    setForm(newMuscleAssesment);
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
      await createMuscleAssesment({
        variables: {
          data: form,
        },
      });
      setForm({
        id: 0,
        idUser: 0,
        avaliationDate: new Date(),
        bicepsLeft: 0,
        bicepsRight: 0,
        calfLeft: 0,
        calfRight: 0,
        chest: 0,
        forearmLeft: 0,
        forearmRight: 0,
        thighLeft: 0,
        thighRight: 0,
        personalTrainer: "",
        height: 0,
        weight: 0,
      }); // Limpa o input após o envio
      back();
    } catch (err) {
      console.error("Erro ao criar avalicao fisica:", err);
    }
  };

  useEffect(() => {
    if (loading || !!error || !data || form?.id !== 0) return;
    setForm(data?.getMuscleAssesmentById);
  }, [data, error, loading]);

  return (
    <div className="mt-10 main-container">
      <h1 className="sub-title mb-4">Cadastro de avaliação física</h1>
      <form onSubmit={handleSubmit}>
        <section className="card-container p-5 flex justify-center gap-4 mb-10 flex-col">
          <div className="row">
            <Input
              text="Altura (cm)"
              type="number"
              placeholder="Altura..."
              onChange={(ev) => handleForm("height", ev.target.value)}
              value={form?.height ?? ""}
            />

            <Input
              text="Peso (kg)"
              type="number"
              placeholder="Peso..."
              onChange={(ev) => handleForm("weight", ev.target.value)}
              value={form?.weight ?? ""}
            />
          </div>
          <div className="row">
            <Input
              text="Avaliador fisico"
              type="text"
              placeholder="Digite o nome do avaliador fisico..."
              onChange={(ev) => handleForm("personalTrainer", ev.target.value)}
              value={form?.personalTrainer ?? ""}
            />

            <Input
              text="Data avaliação"
              type="text"
              onChange={(ev) => handleForm("avaliationDate", ev.target.value)}
              disabled
              value={moment(form?.avaliationDate).format("DD/MM/YYYY") ?? ""}
            />
          </div>
          <div className="row">
            <Input
              text="Biceps Esquerdo em centimentros (cm)"
              type="number"
              placeholder="Biceps esquerdo..."
              onChange={(ev) => handleForm("bicepsLeft", ev.target.value)}
              value={form?.bicepsLeft ?? ""}
            />

            <Input
              text="Biceps Direito em centimentros (cm)"
              type="number"
              placeholder="Biceps Direito..."
              onChange={(ev) => handleForm("bicepsRight", ev.target.value)}
              value={form?.bicepsRight ?? ""}
            />
          </div>
          <div className="row">
            <Input
              text="Panturrilha Esquerdo em centimentros (cm)"
              type="number"
              placeholder="Panturrilha esquerdo..."
              onChange={(ev) => handleForm("calfLeft", ev.target.value)}
              value={form?.calfLeft ?? ""}
            />

            <Input
              text="Panturrilha Direito em centimentros (cm)"
              type="number"
              placeholder="Panturrilha Direito..."
              onChange={(ev) => handleForm("calfRight", ev.target.value)}
              value={form?.calfRight ?? ""}
            />
          </div>
          <div className="row">
            <Input
              text="Coxa Esquerda em centimentros (cm)"
              type="number"
              placeholder="Coxa esquerda..."
              onChange={(ev) => handleForm("thighLeft", ev.target.value)}
              value={form?.thighLeft ?? ""}
            />

            <Input
              text="Coxa Direita em centimentros (cm)"
              type="number"
              placeholder="Coxa Direita..."
              onChange={(ev) => handleForm("thighRight", ev.target.value)}
              value={form?.thighRight ?? ""}
            />
          </div>
          <div className="row">
            <Input
              text="Antebraço Esquerdo em centimentros (cm)"
              type="number"
              placeholder="Antebraço esquerdo..."
              onChange={(ev) => handleForm("forearmLeft", ev.target.value)}
              value={form?.forearmLeft ?? ""}
            />

            <Input
              text="Antebraço Direito em centimentros (cm)"
              type="number"
              placeholder="Antebraço Direito..."
              onChange={(ev) => handleForm("forearmRight", ev.target.value)}
              value={form?.forearmRight ?? ""}
            />
          </div>
          <div className="row">
            <Input
              text="Peito em centimentros (cm)"
              type="number"
              placeholder="Peito..."
              onChange={(ev) => handleForm("chest", ev.target.value)}
              value={form?.chest ?? ""}
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
