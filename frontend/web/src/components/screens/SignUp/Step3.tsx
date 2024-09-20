import React from "react";

import Input from "@/components/Input";

const Step3: React.FC = () => {
  return (
    <div className="flex flex-col gap-5">
      <Input
        text="Senha"
        type="password"
        onChange={() => null}
        placeholder="Seu senha"
      />
      <Input
        text="Repita a senha"
        type="password"
        onChange={() => null}
        placeholder="Sua senha"
      />
    </div>
  );
};

export default Step3;
