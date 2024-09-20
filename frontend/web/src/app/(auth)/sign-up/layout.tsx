"use client";
import { useState } from "react";

import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { CgShapeTriangle } from "react-icons/cg";

import Button from "@/components/Button";
import Stepbar from "@/components/Stepbar";
import Step1 from "@/components/screens/SignUp/Step1";
import Step2 from "@/components/screens/SignUp/Step2";
import Step3 from "@/components/screens/SignUp/Step3";

export default function SignUpLayout() {
  const [step, setStep] = useState<number>(1);

  const handleStep = (newStep: number) => {
    setStep(newStep);
  };

  return (
    <>
      <div className="flex justify-start items-center gap-4">
        <Link href={"/"} className="hover:scale-110 cursor-pointer">
          <FaArrowLeft />
        </Link>
        <h2 className="sub-title">Se inscreva</h2>
      </div>

      <Stepbar empty={3} nonEmpty={step} handleStep={handleStep} />

      <div className="flex flex-col gap-5">
        {step === 1 && <Step1 />}
        {step === 2 && <Step2 />}
        {step === 3 && <Step3 />}
      </div>

      <div className="flex gap-4">
        <Button onClick={() => handleStep(step + 1)} width="100%">
          <p>{step === 3 ? "Cadastrar" : "Continuar"}</p>
          <CgShapeTriangle size={20} className="rotate-90" />
        </Button>
      </div>
    </>
  );
}
