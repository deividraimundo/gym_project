import React from "react";

import moment from "moment";
import { IoAdd } from "react-icons/io5";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@apollo/client";

import Button from "@/components/Button";
import { MedicalRestrictionsInput } from "@/types";
import { MUTATION_DELETE_MEDICAL_RESTRICTIONS } from "@/apollo/mutations";
import { QUERY_MEDICAL_RESTRICTIONS_BY_USER } from "@/apollo/queries";

const CardMedicalRestrictions: React.FC = () => {
  const router = useRouter();
  const { data, error, loading, refetch } = useQuery(
    QUERY_MEDICAL_RESTRICTIONS_BY_USER,
    {
      fetchPolicy: "network-only",
    }
  );

  const [deleteMedicalRestrictions] = useMutation(
    MUTATION_DELETE_MEDICAL_RESTRICTIONS
  );

  const handleClick = () => {
    router.push("/cadmedicalrestrictions");
  };

  const handleEdit = (id: number) => {
    router.push("/cadmedicalrestrictions?id=" + id);
  };

  const handleDelete = async (id: number) => {
    if (!id) return;
    try {
      await deleteMedicalRestrictions({
        variables: {
          id: id,
        },
      });
      refetch();
    } catch (err) {
      console.error("Erro ao deletar restricoes medicas:", err);
    }
  };

  if (!!error) {
    return <p>ERRO AO BUSCAR RESTRIÇÕES MÉDICAS</p>;
  }

  if (loading) {
    return <p>Carregando...</p>;
  }

  const medicalRestrictions: MedicalRestrictionsInput[] =
    data.getMedicalRestrictionsByUser;
  let justify = "justify-between";
  if (medicalRestrictions.length > 0) justify = "";

  return (
    <section className={"card-container p-5 flex min-h-64 flex-col " + justify}>
      <header className="flex justify-between">
        <h1>Restrições médicas</h1>
        <Button onClick={handleClick} width="2.5rem">
          <IoAdd size={23} />
        </Button>
      </header>

      {medicalRestrictions?.length > 0 ? (
        medicalRestrictions.map((it, idx) => (
          <div
            key={`muscle-assesment-${idx}`}
            className="mt-4 border-2 border-details-primary rounded-lg"
          >
            <header className="w-full p-4 rounded-tl-md rounded-tr-md bg-details-primary text-white font-semibold flex justify-between items-center">
              <p>Sequencial da Restrição: {it.id}</p>
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
              <li>Fumante: {it.smoker ? "Sim" : "Não"}</li>
              <li>Doença cardíaca: {it.heartDisease ? "Sim" : "Não"}</li>
              <li>Cirurgia: {it.surgery ? "Sim" : "Não"}</li>
              <li>Obs: {!!it.obs ? it.obs : "Não há observações!"}</li>
            </ol>
          </div>
        ))
      ) : (
        <>
          <main className="flex justify-center items-center">
            <p className="w-56 leading-5 text-center">
              Adicione sua restrição médica para acompanhamento!
            </p>
          </main>

          <footer className="mx-auto">
            <Button onClick={handleClick} width="15rem">
              <IoAdd size={23} />
              <p>Adicionar Restrição</p>
            </Button>
          </footer>
        </>
      )}
    </section>
  );
};

export default CardMedicalRestrictions;
