import React, { Dispatch, SetStateAction, useState } from "react";

import Input from "@/components/Input";
import { SignUpInput } from "@/app/(auth)/sign-up/layout";

interface Step2Props {
  data: SignUpInput;
  handleData: (name: string, value: string) => void;
  confirmPassword: string;
  setConfirmPassword: Dispatch<SetStateAction<string>>;
}

const Step3: React.FC<Step2Props> = ({
  data,
  handleData,
  confirmPassword,
  setConfirmPassword,
}) => {
  return (
    <div className="flex flex-col gap-5">
      <Input
        text="Senha"
        type="password"
        value={data?.password ?? ""}
        onChange={(ev) => handleData("password", ev.target.value)}
        placeholder="Sua senha"
      />
      <Input
        text="Repita a senha"
        type="password"
        value={confirmPassword ?? ""}
        onChange={(ev) => setConfirmPassword(ev.target.value)}
        placeholder="Sua senha"
      />
    </div>
  );
};

export default Step3;
