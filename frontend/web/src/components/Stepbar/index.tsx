import React from "react";

import { tv } from "tailwind-variants";
import { twMerge } from "tailwind-merge";

interface StepbarProps {
  empty: number;
  nonEmpty: number;
  handleStep: (step: number) => void;
}

const stepbar = tv({
  variants: {
    color: {
      empty: "bg-divider",
      nonEmpty: "bg-details-primary",
    },
    cursor: {
      pointer: "cursor-pointer",
      normal: "cursor-normal",
    },
  },
});

const Stepbar: React.FC<StepbarProps> = ({ empty, nonEmpty, handleStep }) => {
  const handleClick = (step: number) => {
    if (step === 0) {
      return;
    }
    handleStep(step);
  };

  return (
    <div className="grid grid-cols-3 gap-7">
      {Array.from({ length: empty }).map((_, idx) => (
        <hr
          key={`step-${idx}`}
          className={twMerge(
            "border-none rounded-sm bg-divider col-span-1 h-[5px]",
            stepbar({
              color: idx < nonEmpty ? "nonEmpty" : "empty",
              className: idx == nonEmpty - 1 ? "animate-pulse" : null,
              cursor: idx < nonEmpty ? "pointer" : "normal",
            })
          )}
          onClick={() => handleClick(idx < nonEmpty ? idx + 1 : 0)}
        />
      ))}
    </div>
  );
};

export default Stepbar;
