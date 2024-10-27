import React from "react";

import "./styles.css";
import Logo from "../Logo";
import Circle from "../Circle";

const Header: React.FC = () => {
  return (
    <header className="container-header">
      <div className="div-header main-container">
        <Logo />
        <div className="right-header div-header">
          <Circle>D</Circle>
        </div>
      </div>
    </header>
  );
};

export default Header;
