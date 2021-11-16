import React from "react";
import { ReactComponent as Icon } from "../assets/deck.svg";

const DeckIcon: React.FC<{ style?: React.CSSProperties }> = (props) => {
  return <Icon {...props} />;
};

export default DeckIcon;
