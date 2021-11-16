import React from "react";
import { ReactComponent as Icon } from "../assets/deckList.svg";

const DeckListIcon: React.FC<{ style?: React.CSSProperties }> = (props) => {
  return <Icon {...props} />;
};

export default DeckListIcon;
