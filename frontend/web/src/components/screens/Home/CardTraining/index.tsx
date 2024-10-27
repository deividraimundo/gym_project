import React from "react";

import { IoAdd } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@apollo/client";

import Button from "@/components/Button";
import { QUERY_TRAINING_BY_ID_USER } from "@/apollo/queries";
import { TrainingInputCustom } from "@/types";
import { FaEdit, FaTrash } from "react-icons/fa";
import { MUTATION_DELETE_TRAINING } from "@/apollo/mutations";

const CardTraining: React.FC = () => {
  const router = useRouter();
  const { data, error, loading, refetch } = useQuery(
    QUERY_TRAINING_BY_ID_USER,
    {
      fetchPolicy: "network-only",
    }
  );

  const [deleteTraining] = useMutation(MUTATION_DELETE_TRAINING);

  const handleClick = () => {
    router.push("/cadtraining");
  };

  const handleEdit = (id: number) => {
    router.push("/cadtraining?id=" + id);
  };

  const handleDelete = async (id: number) => {
    if (!id) return;
    try {
      await deleteTraining({
        variables: {
          id: id,
        },
      });
      refetch();
    } catch (err) {
      console.error("Erro ao deletar treino:", err);
    }
  };

  if (!!error) {
    return <p>ERRO AO BUSCAR TREINOS</p>;
  }

  if (loading) {
    return <p>Carregando...</p>;
  }

  const trainings: TrainingInputCustom[] = data.getTrainingsByUser;
  let justify = "justify-between";
  if (trainings.length > 0) justify = "";

  return (
    <section className={"card-container p-5 flex min-h-64 flex-col " + justify}>
      <header className="flex justify-between">
        <h1>Treinos</h1>
        <Button onClick={handleClick} width="2.5rem">
          <IoAdd size={23} />
        </Button>
      </header>

      {trainings?.length > 0 ? (
        trainings.map((it, idx) => (
          <div
            key={`training-${idx}`}
            className="mt-4 border-2 border-details-primary rounded-lg"
          >
            <header className="w-full p-4 rounded-tl-md rounded-tr-md bg-details-primary text-white font-semibold flex justify-between items-center">
              <p>{it?.self?.title}</p>
              <div className="flex gap-3">
                <FaEdit
                  size={18}
                  className="cursor-pointer transform transition-transform duration-200 hover:scale-105"
                  onClick={() => handleEdit(it?.self?.id)}
                />
                <FaTrash
                  onClick={() => handleDelete(it?.self?.id)}
                  className="cursor-pointer text-errors-primary transform transition-transform duration-200 hover:scale-110"
                />
              </div>
            </header>
            <ol className="p-4 flex flex-col gap-2 list-decimal list-inside">
              {it?.exercices?.map((ex, idxEx) => (
                <li
                  key={`exercicio-${idxEx}`}
                >{`${ex.name} - ${ex.repetitions} repetições - ${ex.series} séries - ${ex.rest}s `}</li>
              ))}
            </ol>
          </div>
        ))
      ) : (
        <>
          <main className="flex justify-center items-center">
            <p className="w-56 leading-5 text-center">
              Você ainda não tem treinos, adicione um para deixar de ser frango!
            </p>
          </main>

          <footer className="mx-auto">
            <Button onClick={handleClick} width="15rem">
              <IoAdd size={23} />
              <p>Adicionar Treino</p>
            </Button>
          </footer>
        </>
      )}
    </section>
  );
};

export default CardTraining;
