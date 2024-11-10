import React from "react";

import Input from "@/components/Input";
import { SignUpInput } from "@/app/(auth)/sign-up/layout";

interface Step2Props {
  data: SignUpInput;
  handleData: (name: string, value: string) => void;
}

const Step2: React.FC<Step2Props> = ({ data, handleData }) => {
  return (
    <div className="flex flex-col gap-5">
      <Input
        text="E-mail"
        type="email"
        value={data?.email ?? ""}
        onChange={(ev) => handleData("email", ev.target.value)}
        placeholder="Seu e-mail"
      />
    </div>
  );
};

export default Step2;
