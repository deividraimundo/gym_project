import React from "react";

import "./styles.css";

interface CircleProps {
  children?: React.ReactNode;
  handleClick: () => void;
}

const Circle: React.FC<CircleProps> = ({ children, handleClick }) => {
  return (
    <div
      className="container-circle transitions w-full h-full"
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

export default Circle;
