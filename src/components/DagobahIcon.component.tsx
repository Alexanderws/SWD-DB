import React from "react";
import { ReactComponent as DagobahSvg } from "../assets/dagobah.svg";

const DagobahIcon: React.FC<{ style?: React.CSSProperties }> = (props) => {
  return <DagobahSvg {...props} />;
};

export default DagobahIcon;
