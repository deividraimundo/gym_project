"use client";
import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { CgShapeTriangle } from "react-icons/cg";

import Button from "@/components/Button";
import Stepbar from "@/components/Stepbar";
import Step1 from "@/components/screens/SignUp/Step1";
import Step2 from "@/components/screens/SignUp/Step2";
import Step3 from "@/components/screens/SignUp/Step3";
import { useMutation } from "@apollo/client";
import { SIGN_UP } from "@/apollo/mutations";

export interface SignUpInput {
  id: number;
  name: string;
  lastName: string;
  email: string;
  password: string;
}

export default function SignUpLayout() {
  const router = useRouter();
  const [step, setStep] = useState<number>(1);
  const [err, setErr] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [data, setData] = useState<SignUpInput>({
    id: 0,
    email: "",
    lastName: "",
    name: "",
    password: "",
  });
  const [signIn] = useMutation(SIGN_UP, {
    variables: { data: data },
  });

  const handleStep = (newStep: number) => {
    if (newStep === 2 && (!data?.name || !data?.lastName)) {
      setErr("Por favor, preencha todos os campos do formulário!");
      return;
    } else if (newStep === 3 && data?.password !== confirmPassword) {
      setErr("As senhas não coincidem!");
      return;
    }
    setErr("");
    setStep(newStep);
  };

  const handleData = (name: string, value: string) => {
    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSignIn = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    ev.preventDefault();
    ev.stopPropagation();
    router.push("/sign-in");
  };

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    ev.stopPropagation();
    const newStep = step + 1;
    if (newStep === 2 && (!data?.name || !data?.lastName)) {
      setErr("Por favor, preencha todos os campos do formulário!");
      return;
    } else if (newStep === 3 && data?.password !== confirmPassword) {
      setErr("As senhas não coincidem!");
      return;
    }
    setErr("");
    setStep(newStep);

    if (
      step !== 3 ||
      !data?.name ||
      !data?.lastName ||
      !data?.email ||
      !data?.password
    ) {
      return;
    }
    signIn();
    router.push("/sign-in");
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="flex justify-start items-center gap-4">
        <Link
          href={"/"}
          onClick={handleSignIn}
          className="hover:scale-110 cursor-pointer"
        >
          <FaArrowLeft />
        </Link>
        <h2 className="sub-title">Se inscreva</h2>
      </div>

      <Stepbar empty={3} nonEmpty={step} handleStep={handleStep} />

      <div className="flex flex-col gap-5">
        {step === 1 && <Step1 data={data} handleData={handleData} />}
        {step === 2 && <Step2 data={data} handleData={handleData} />}
        {step === 3 && (
          <Step3
            data={data}
            handleData={handleData}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
          />
        )}
      </div>

      {!!err && <p className="text-errors-primary">{err}</p>}

      <div className="flex gap-4">
        <Button
          onClick={() => null}
          width="100%"
          type="submit"
          disabled={
            step === 3 &&
            (!data?.name || !data?.lastName || !data?.email || !data?.password)
          }
        >
          <p>{step === 3 ? "Cadastrar" : "Continuar"}</p>
          <CgShapeTriangle size={20} className="rotate-90" />
        </Button>
      </div>
    </form>
  );
}
