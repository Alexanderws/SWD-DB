import React from "react";
import { ReactComponent as DiceSvg } from "../assets/dice.svg";

const DiceIcon: React.FC<{ style?: React.CSSProperties }> = (props) => {
  return <DiceSvg {...props} />;
};

export default DiceIcon;
