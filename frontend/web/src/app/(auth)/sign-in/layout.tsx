"use client";
import React from "react";

import Link from "next/link";

import Button from "@/components/Button";
import Input from "@/components/Input";

export default function SignInLayout() {
  return (
    <>
      <h2 className="sub-title">Acesse sua conta</h2>
      <div className="flex flex-col gap-5">
        <Input
          text="Nome"
          type="text"
          onChange={() => null}
          placeholder="Seu Nome"
        />
        <Input
          text="Senha"
          type="text"
          onChange={() => null}
          placeholder="Sua senha"
        />
        <Button onClick={() => null} width="100%">
          Entrar
        </Button>

        <hr className="divider" />

        <footer className="card-container w-full p-4">
          <p className="text">Não tem uma conta?</p>
          <Link href={"/sign-up"} className="text-hyperlink">
            Se inscreva gratuitamente
          </Link>
        </footer>
      </div>
    </>
  );
}
