import React from "react";

import Input from "@/components/Input";

const Step1: React.FC = () => {
  return (
    <div className="flex flex-col gap-5">
      <Input
        text="Nome"
        type="text"
        onChange={() => null}
        placeholder="Seu nome"
      />
      <Input
        text="Sobrenome"
        type="text"
        onChange={() => null}
        placeholder="Sua sobrenome"
      />
    </div>
  );
};

export default Step1;
