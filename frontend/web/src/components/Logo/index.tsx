import React from "react";

import Image from "next/image";

const Logo: React.FC = () => {
  return (
    <div>
      <Image
        alt=""
        src="/logo.png"
        width={230}
        height={75}
        className="relative -left-2"
      />
    </div>
  );
};

export default Logo;
