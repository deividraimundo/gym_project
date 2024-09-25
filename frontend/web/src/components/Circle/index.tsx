import React from "react";

import "./styles.css";

interface CircleProps {
  children?: React.ReactNode;
}

const Circle: React.FC<CircleProps> = ({ children }) => {
  return <div className="container-circle transitions">{children}</div>;
};

export default Circle;
