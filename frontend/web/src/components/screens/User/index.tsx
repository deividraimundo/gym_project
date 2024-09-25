import React from "react";

import "./styles.css";
import CardUser from "./CardUser";

const User: React.FC = () => {
  return (
    <div className="container-user main-container">
      <CardUser />
      <header className="w-3/4 card-container"></header>
    </div>
  );
};

export default User;
