import React, { useEffect, useState } from "react";

import moment from "moment";
import cloneDeep from "lodash/cloneDeep";
import { IoAdd } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation, useQuery } from "@apollo/client";

import "./styles.css";

import { MUTATION_UPSERT_TRAINING } from "@/apollo/mutations";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { Exercices, TrainingInput, TrainingInputCustom } from "@/types";
import { QUERY_TRAINING_BY_ID } from "@/apollo/queries";

const CadTraining: React.FC = () => {
  const [exercice, setExercice] = useState<Exercices>({
    id: 0,
    idTraining: 0,
    name: "",
    repetitions: 0,
    rest: 0,
    series: 0,
  });
  const [createTraining] = useMutation(MUTATION_UPSERT_TRAINING);
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const { data, error, loading } = useQuery(QUERY_TRAINING_BY_ID, {
    fetchPolicy: "network-only",
    variables: {
      id: Number(id),
    },
  });
  const [form, setForm] = useState<TrainingInputCustom>({
    self: {
      id: 0,
      idUser: 0,
      endDate: new Date(),
      initialDate: new Date(),
      objetive: "",
      subTitle: "Undefined",
      title: "",
    },
    exercices: [],
    idsDelExercices: [],
  });

  const handleForm = (name: string, value: unknown) => {
    const data: TrainingInputCustom = cloneDeep(form);
    const newTrainingInput: TrainingInput = {
      ...data.self,
      [name]: value,
    };
    data.self = newTrainingInput;
    setForm(data);
  };

  const handleExercice = (name: string, value: unknown) => {
    setExercice((old) => ({ ...old, [name]: value }));
  };

  const addExercice = (ev: React.MouseEvent<Element, MouseEvent>) => {
    ev.preventDefault();
    ev.stopPropagation();
    const data: TrainingInputCustom = cloneDeep(form);
    data.exercices = [...(data?.exercices ?? []), { ...exercice }];
    setForm(data);
  };

  const removeExercice = (
    ev: React.MouseEvent<Element, MouseEvent>,
    idx: number
  ) => {
    ev.preventDefault();
    ev.stopPropagation();
    const data: TrainingInputCustom = cloneDeep(form);
    const newEx = form?.exercices?.filter((_, i) => i !== idx);
    data.exercices = newEx ?? [];
    setForm(data);
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
      await createTraining({
        variables: {
          data: form,
        },
      });
      setForm({
        self: {
          id: 0,
          idUser: 0,
          endDate: new Date(),
          initialDate: new Date(),
          objetive: "",
          subTitle: "Undefined",
          title: "",
        },
        exercices: [],
        idsDelExercices: [],
      }); // Limpa o input após o envio
      back();
    } catch (err) {
      console.error("Erro ao criar treino:", err);
    }
  };

  useEffect(() => {
    if (loading || !!error || !data || form?.self?.id !== 0) return;
    setForm({
      self: data?.getTrainingById?.self,
      exercices: data?.getTrainingById?.exercices,
      idsDelExercices: [],
    });
  }, [data, error, loading]);

  return (
    <div className="container-training main-container">
      <h1 className="sub-title mb-4">Cadastro de treino</h1>
      <form onSubmit={handleSubmit}>
        <section className="card-container p-5 flex justify-center gap-4 mb-10">
          <Input
            text="Título do treino"
            type="text"
            placeholder="Digite o título do treino..."
            onChange={(ev) => handleForm("title", ev.target.value)}
            value={form?.self?.title ?? ""}
          />

          <Input
            text="Objetivo"
            type="text"
            placeholder="Hipertrofia, força,..."
            onChange={(ev) => handleForm("objetive", ev.target.value)}
            value={form?.self?.objetive ?? ""}
          />

          <Input
            text="Data de início"
            type="text"
            onChange={(ev) => handleForm("initialDate", ev.target.value)}
            value={moment(form?.self?.initialDate).format("DD/MM/YYYY")}
            disabled
          />
        </section>

        <section className="card-container p-5 flex flex-col gap-4 mb-10">
          <div className="flex justify-center items-end gap-4">
            <Input
              value={exercice?.name ?? ""}
              text="Exercício"
              type="text"
              placeholder="Digite o exercício..."
              onChange={(ev) => handleExercice("name", ev.target.value)}
            />

            <Input
              value={exercice?.repetitions ?? ""}
              text="Repetição"
              type="number"
              placeholder="Quantidade de repetições..."
              onChange={(ev) => handleExercice("repetitions", ev.target.value)}
            />

            <Input
              value={exercice?.series ?? ""}
              text="Série"
              type="number"
              placeholder="Quantidade de séries..."
              onChange={(ev) => handleExercice("series", ev.target.value)}
            />

            <Input
              value={exercice?.rest ?? ""}
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
                <div
                  key={`card-${idx}`}
                  className="border rounded p-4 border-details-primary flex gap-4 items-center justify-between"
                >
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

        <div className="flex gap-4 mt-10">
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
