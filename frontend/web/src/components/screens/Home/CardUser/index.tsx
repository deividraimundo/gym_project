import React from "react";

// import { BiEditAlt } from "react-icons/bi";

import "./styles.css";

const CardUser: React.FC = () => {
  return (
    <aside className="card-container aside-card-user flex flex-col">
      <header className="header-card-user">
        {/* <button className="button-edit transitions">
          <BiEditAlt size={22} />
        </button> */}
      </header>
      <main className="h-72 w-full relative">
        <div className="main-card-user">
          <div className="image-card-user">
            <img src="/logo.png" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="name-card-user">Nome do usuário</p>
            <p>123456789</p>
          </div>
        </div>
      </main>
      <footer className="footer-card-user">
        <p>Deixou de ser frango em 25/08/2024</p>
      </footer>
    </aside>
  );
};

export default CardUser;
