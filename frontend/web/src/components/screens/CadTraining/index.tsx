import React, { useState } from "react";

import { IoAdd } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";

import "./styles.css";

import { MUTATION_UPSERT_TRAINING } from "@/apollo/mutations";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { Exercices, Training } from "@/types";

interface CadTrainingProps {
  isEditing: boolean;
}

const CadTraining: React.FC<CadTrainingProps> = ({ isEditing }) => {
  const [form, setForm] = useState<Training>();
  const [exercice, setExercice] = useState<Exercices>();

  const [createTraining] = useMutation(MUTATION_UPSERT_TRAINING);

  const router = useRouter();

  const handleForm = (name: string, value: unknown) => {
    setForm((old) => ({ ...old, [name]: value }));
  };

  const handleExercice = (name: string, value: unknown) => {
    setExercice((old) => ({ ...old, [name]: value }));
  };

  const addExercice = (ev: React.MouseEvent<Element, MouseEvent>) => {
    ev.preventDefault();
    ev.stopPropagation();
    setForm((old) => ({
      ...old,
      exercices: [...(old?.exercices ?? []), { ...exercice }],
    }));
  };

  const removeExercice = (
    ev: React.MouseEvent<Element, MouseEvent>,
    idx: number
  ) => {
    ev.preventDefault();
    ev.stopPropagation();
    const newEx = form?.exercices?.filter((_, i) => i !== idx);
    setForm((old) => ({
      ...old,
      exercices: [...(newEx ?? [])],
    }));
  };

  const back = () => {
    router.push("/");
  };

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault(); // Previne o comportamento padrão do formulário

    try {
      await createTraining({
        variables: {
          data: {
            form,
          },
        },
      });
      setForm(undefined); // Limpa o input após o envio
    } catch (err) {
      console.error("Erro ao criar treino:", err);
    }
  };

  return (
    <div className="container-training main-container">
      <h1 className="sub-title mb-4">Cadastro de treino</h1>
      <form onSubmit={handleSubmit}>
        <section className="card-container p-5 flex justify-center gap-4 mb-10">
          <Input
            text="Título do treino"
            type="text"
            placeholder="Digite o título do treino..."
            onChange={(ev) => handleForm("title", ev.currentTarget)}
          />

          <Input
            text="Objetivo"
            type="text"
            placeholder="Hipertrofia, força,..."
            onChange={(ev) => handleForm("objetive", ev.currentTarget)}
          />

          <Input
            text="Data de início"
            type="text"
            onChange={(ev) => handleForm("initialDate", ev.currentTarget)}
            disabled
          />
        </section>

        <section className="card-container p-5 flex flex-col gap-4 mb-10">
          <div className="flex justify-center items-end gap-4">
            <Input
              value={exercice?.name}
              text="Exercício"
              type="text"
              placeholder="Digite o exercício..."
              onChange={(ev) => handleExercice("name", ev.target.value)}
            />

            <Input
              value={exercice?.repetitions}
              text="Repetição"
              type="number"
              placeholder="Quantidade de repetições..."
              onChange={(ev) => handleExercice("repetitions", ev.target.value)}
            />

            <Input
              value={exercice?.series}
              text="Série"
              type="number"
              placeholder="Quantidade de séries..."
              onChange={(ev) => handleExercice("series", ev.target.value)}
            />

            <Input
              value={exercice?.rest}
              text="Descanso (segundos)"
              type="number"
              placeholder="Tempo de descanço..."
              onChange={(ev) => handleExercice("rest", ev.target.value)}
            />
          </div>

          <div className="flex justify-center">
            <Button
              onClick={addExercice}
              width="36px"
              disabled={
                !exercice?.name ||
                !exercice?.repetitions ||
                !exercice?.rest ||
                !exercice?.series
              }
            >
              <IoAdd size={23} />
            </Button>
          </div>
        </section>

        {!!form?.exercices?.length && (
          <section className="card-container p-5 flex flex-col gap-4">
            <h1 className="text-center text-xl font-bold">Exercícios</h1>
            <div className="grid grid-cols-3 gap-4">
              {form?.exercices?.map((it, idx) => (
                <div className="border rounded p-4 border-details-primary flex gap-4 items-center justify-between">
                  <p>
                    {it.name}, {it?.repetitions} Repetições, {it?.series}{" "}
                    séries, descanso {it?.rest} segundos
                  </p>
                  <Button
                    onClick={(ev) => removeExercice(ev, idx)}
                    width="36px"
                  >
                    <FaTrash size={15} title="clique para remover" />
                  </Button>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="flex gap-4">
          <button
            className="text-button-default-color bg-button-default-background hover:text-button-default-hover-color hover:bg-button-default-hover-background h-9 border-none rounded-[4px] cursor-pointer text-[16px] text-base font-semibold tracking-widest w-[12rem] disabled:cursor-not-allowed disabled:text-button-disabled-color disabled:bg-button-disabled-background"
            type="submit"
            disabled={!form?.exercices?.length}
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

export default CadTraining;
