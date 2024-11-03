import React from "react";

import "./styles.css";
import CardUser from "./CardUser";
import CardTraining from "./CardTraining";
import CardPhysicalAssessment from "./CardPhysicalAssessment";
import CardMedicalRestrictions from "./CardMedicalRestrictions";

const Home: React.FC = () => {
  return (
    <div className="container-user main-container">
      <CardUser />
      <main className="container-card">
        <CardTraining />
        <CardPhysicalAssessment />
        <CardMedicalRestrictions />
      </main>
    </div>
  );
};

export default Home;
