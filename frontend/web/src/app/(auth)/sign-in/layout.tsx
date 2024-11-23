"use client";
import React, { FormEvent, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import Button from "@/components/Button";
import Input from "@/components/Input";
import { useMutation } from "@apollo/client";
import { SIGN_IN } from "@/apollo/mutations";
import { ME } from "@/apollo/queries";

interface SignInInput {
  username: string;
  password: string;
}

export default function SignInLayout() {
  const [data, setData] = useState<SignInInput>({ username: "", password: "" });
  const router = useRouter();
  const [signIn] = useMutation(SIGN_IN, {
    variables: { data: data },
    refetchQueries: [{ query: ME }],
  });

  const handleChangeSignIn = (name: string, value: string) => {
    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSignIn = (ev: FormEvent<HTMLElement>) => {
    ev.preventDefault();
    ev.stopPropagation();
    try {
      signIn();
    } catch (error) {
      console.error(error);
    } finally {
      router.push("/");
    }
  };

  const handleSignUp = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    ev.preventDefault();
    ev.stopPropagation();
    router.push("/sign-up");
  };

  return (
    <form onSubmit={handleSignIn}>
      <h2 className="sub-title">Acesse sua conta</h2>
      <div className="flex flex-col gap-5">
        <Input
          text="Nome"
          type="text"
          onChange={(ev) => handleChangeSignIn("username", ev.target.value)}
          placeholder="Seu Nome"
          value={data?.username ?? ""}
        />
        <Input
          text="Senha"
          type="password"
          onChange={(ev) => handleChangeSignIn("password", ev.target.value)}
          placeholder="Sua senha"
          value={data?.password ?? ""}
        />
        <Button
          type="submit"
          width="100%"
          onClick={() => null}
          disabled={!data?.username || !data?.password}
        >
          Entrar
        </Button>

        <hr className="divider" />

        <footer className="card-container w-full p-4 flex-col gap-2">
          <p className="text">Não tem uma conta?</p>
          <Link
            href={"/sign-up"}
            onClick={handleSignUp}
            className="text-hyperlink"
          >
            Se inscreva gratuitamente
          </Link>
        </footer>
      </div>
    </form>
  );
}
