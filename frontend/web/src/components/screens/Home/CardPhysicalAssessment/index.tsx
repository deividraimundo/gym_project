import React from "react";

import moment from "moment";
import { IoAdd } from "react-icons/io5";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@apollo/client";

import Button from "@/components/Button";
import { MuscleAssesmentInput } from "@/types";
import { QUERY_MUSCLE_ASSESMENT_HISTORY_BY_USER } from "@/apollo/queries";
import { MUTATION_DELETE_MUSCLE_ASSESMENT } from "@/apollo/mutations";
import { calcularIMC } from "@/utils/utils";

const CardPhysicalAssessment: React.FC = () => {
  const router = useRouter();
  const { data, error, loading, refetch } = useQuery(
    QUERY_MUSCLE_ASSESMENT_HISTORY_BY_USER,
    {
      fetchPolicy: "network-only",
    }
  );

  const [deleteMuscleAssesment] = useMutation(MUTATION_DELETE_MUSCLE_ASSESMENT);

  const handleClick = () => {
    router.push("/cadmuscleassesment");
  };

  const handleEdit = (id: number) => {
    router.push("/cadmuscleassesment?id=" + id);
  };

  const handleDelete = async (id: number) => {
    if (!id) return;
    try {
      await deleteMuscleAssesment({
        variables: {
          id: id,
        },
      });
      refetch();
    } catch (err) {
      console.error("Erro ao deletar avaliacao fisica:", err);
    }
  };

  if (!!error) {
    return <p>ERRO AO BUSCAR AVALIAÇÕES FÍSICAS</p>;
  }

  if (loading) {
    return <p>Carregando...</p>;
  }

  const muscleAssesments: MuscleAssesmentInput[] =
    data.getHistoryMuscleAssesmentByUser;
  let justify = "justify-between";
  if (muscleAssesments.length > 0) justify = "";

  return (
    <section className={"card-container p-5 flex min-h-64 flex-col " + justify}>
      <header className="flex justify-between">
        <h1>Avaliação física</h1>
        <Button onClick={handleClick} width="2.5rem">
          <IoAdd size={23} />
        </Button>
      </header>

      {muscleAssesments?.length > 0 ? (
        muscleAssesments.map((it, idx) => (
          <div
            key={`muscle-assesment-${idx}`}
            className="mt-4 border-2 border-details-primary rounded-lg"
          >
            <header className="w-full p-4 rounded-tl-md rounded-tr-md bg-details-primary text-white font-semibold flex justify-between items-center">
              <p>
                {!!it?.personalTrainer
                  ? `Personal: ${it.personalTrainer} - `
                  : ""}{" "}
                Avaliação de {moment(it?.avaliationDate).format("DD/MM/YYYY")}
              </p>
              <div className="flex gap-3">
                <FaEdit
                  size={18}
                  className="cursor-pointer transform transition-transform duration-200 hover:scale-105"
                  onClick={() => handleEdit(it?.id)}
                />
                <FaTrash
                  onClick={() => handleDelete(it?.id)}
                  className="cursor-pointer text-errors-primary transform transition-transform duration-200 hover:scale-110"
                />
              </div>
            </header>
            <ol className="p-4 flex flex-col gap-2 list-disc list-inside">
              <li>Altura: {it.height} cm</li>
              <li>Peso: {it.weight} kg</li>
              <li>Peito: {it.chest} cm</li>
              <li>Biceps Esquerdo: {it.bicepsLeft} cm</li>
              <li>Biceps Direito: {it.bicepsRight} cm</li>
              <li>Panturrilha Esquerda: {it.calfLeft} cm</li>
              <li>Panturrilha Direita: {it.calfRight} cm</li>
              <li>Coxa Esquerdo: {it.thighLeft} cm</li>
              <li>Coxa Direito: {it.thighRight} cm</li>
              <li>Antebraço Esquerdo: {it.forearmLeft} cm</li>
              <li>Antebraço Direito: {it.forearmRight} cm</li>
              <li className="text-details-primary">
                {calcularIMC(it.weight, it.height)}
              </li>
            </ol>
          </div>
        ))
      ) : (
        <>
          <main className="flex justify-center items-center">
            <p className="w-56 leading-5 text-center">
              Adicione sua avaliação física para ter um histórico de sua
              evolução!
            </p>
          </main>

          <footer className="mx-auto">
            <Button onClick={handleClick} width="15rem">
              <IoAdd size={23} />
              <p>Adicionar Avaliação</p>
            </Button>
          </footer>
        </>
      )}
    </section>
  );
};

export default CardPhysicalAssessment;
