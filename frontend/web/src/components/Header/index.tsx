import React from "react";

import { CgLogOff } from "react-icons/cg";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";

import "./styles.css";

import Logo from "../Logo";
import Circle from "../Circle";
import { LOGOFF } from "@/apollo/mutations";

const Header: React.FC = () => {
  const [logoff] = useMutation(LOGOFF);
  const router = useRouter();

  const handleLogoff = () => {
    try {
      logoff();
    } catch (error) {
      console.error(error);
    } finally {
      router.push("/sign-in");
    }
  };

  return (
    <header className="container-header">
      <div className="div-header main-container">
        <Logo />
        <div className="right-header div-header">
          <Circle handleClick={handleLogoff}>
            <CgLogOff title="Clique para deslogar" />
          </Circle>
        </div>
      </div>
    </header>
  );
};

export default Header;
