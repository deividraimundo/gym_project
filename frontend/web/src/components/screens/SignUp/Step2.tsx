import React from "react";

import Input from "@/components/Input";

const Step2: React.FC = () => {
  return (
    <div className="flex flex-col gap-5">
      <Input
        text="E-mail"
        type="email"
        onChange={() => null}
        placeholder="Seu e-mail"
      />
    </div>
  );
};

export default Step2;
