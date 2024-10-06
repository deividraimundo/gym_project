import React from "react";

import { IoAdd } from "react-icons/io5";

import Button from "@/components/Button";

const CardPhysicalAssessment: React.FC = () => {
  return (
    <section className="card-container p-5 flex justify-between h-64">
      <header>
        <h1>Avaliação física</h1>
      </header>

      <main className="flex justify-center items-center">
        <p className="w-56 leading-5 text-center">
          Adicione sua avaliação física para ter um histórico de sua evolução!
        </p>
      </main>

      <footer className="mx-auto">
        <Button onClick={null} width="15rem">
          <IoAdd size={23} />
          <p>Adicionar Avaliação</p>
        </Button>
      </footer>
    </section>
  );
};

export default CardPhysicalAssessment;
