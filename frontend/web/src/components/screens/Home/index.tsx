import React from "react";

import "./styles.css";
import CardUser from "./CardUser";
import CardTraining from "./CardTraining";
import CardPhysicalAssessment from "./CardPhysicalAssessment";

const Home: React.FC = () => {
  return (
    <div className="container-user main-container">
      <CardUser />
      <main className="container-card">
        <CardTraining />
        <CardPhysicalAssessment />
      </main>
    </div>
  );
};

export default Home;
