"use client";
import Logo from "@/components/Logo";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className=" w-screen h-screen flex">
      <aside className="w-1/2 bg-details-primary animate-pulse"></aside>
      <div className="w-1/2 flex justify-center items-center">
        <div className="w-72 flex flex-col gap-5 min-h-[415px]">
          <Logo />
          {children}
        </div>
      </div>
    </main>
  );
}
