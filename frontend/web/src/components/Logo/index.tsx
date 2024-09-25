import React from "react";

import Image from "next/image";

import "./styles.css";

interface LogoProps {
  withText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ withText }) => {
  return (
    <div className="container-logo">
      <Image
        alt=""
        src="/logo.png"
        width={230}
        height={75}
        className="image-logo"
      />
      {withText && <h1 className="text-logo">ChickenShape</h1>}
    </div>
  );
};

export default Logo;
