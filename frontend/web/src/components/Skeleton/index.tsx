import { ComponentProps } from "react";

import { twMerge } from "tailwind-merge";

export function Skeleton({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={twMerge("bg-element animate-pulse rounded-md", className)}
      {...props}
    />
  );
}
