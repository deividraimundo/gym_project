"use client";
import React from "react";

import { redirect } from "next/navigation";

import Header from "@/components/Header";
import useMe from "@/lib/use-me";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const me = useMe();
  if (me.loading) return <h1>Carregando...</h1>;
  if (!me?.me) {
    redirect("/sign-in");
  }

  return (
    <>
      <Header />
      {children}
    </>
  );
}
