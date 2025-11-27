import React, { type JSX } from "react";
import Arrow from "./Arrow";
import Shop from "./Shop";
interface IconProps {
  bgColor: string;
  iconName: string;
}

const iconMap: Record<string, JSX.Element> = {
  Shop: <Shop />,
  Arrow: <Arrow/>,
};

const Icon: React.FC<IconProps> = ({ bgColor, iconName }) => {
  return (
    <div
      className="rounded-full  aspect-square h-[50px]   flex justify-center items-center"
      style={{ backgroundColor: bgColor }}
    >
      {iconMap[iconName] || null}
    </div>
  );
};

export default Icon;
