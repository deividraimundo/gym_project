import React from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";

import "./styles.css";

interface LogoProps {
  withText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ withText }) => {
  const router = useRouter();

  const handleHome = () => {
    router.push("/");
  };

  return (
    <div className="container-logo">
      <Image
        alt=""
        src="/logo.png"
        width={230}
        height={75}
        className="image-logo hover:scale-105 cursor-pointer"
        onClick={handleHome}
      />
      {withText && <h1 className="text-logo">ChickenShape</h1>}
    </div>
  );
};

export default Logo;
