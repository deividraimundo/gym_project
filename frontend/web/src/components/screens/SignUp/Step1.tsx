import React from "react";

import Input from "@/components/Input";
import { SignUpInput } from "@/app/(auth)/sign-up/layout";

interface Step1Props {
  data: SignUpInput;
  handleData: (name: string, value: string) => void;
}

const Step1: React.FC<Step1Props> = ({ data, handleData }) => {
  return (
    <div className="flex flex-col gap-5">
      <Input
        text="Nome"
        type="text"
        value={data?.name ?? ""}
        onChange={(ev) => handleData("name", ev.target.value)}
        placeholder="Seu nome"
      />
      <Input
        text="Sobrenome"
        type="text"
        value={data?.lastName ?? ""}
        onChange={(ev) => handleData("lastName", ev.target.value)}
        placeholder="Sua sobrenome"
      />
    </div>
  );
};

export default Step1;
