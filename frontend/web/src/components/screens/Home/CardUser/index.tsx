import React from "react";

// import { BiEditAlt } from "react-icons/bi";

import "./styles.css";
import useMe from "@/lib/use-me";

const CardUser: React.FC = () => {
  const me = useMe();
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
            <p className="name-card-user">{`${me?.me?.name} ${me?.me?.lastName}`}</p>
            <p>{me?.me?.email}</p>
          </div>
        </div>
      </main>
      <footer className="footer-card-user">
        <p>Deixou de ser frango!</p>
      </footer>
    </aside>
  );
};

export default CardUser;
