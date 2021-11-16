import React from "react";
import { ReactComponent as Icon } from "../assets/collection.svg";

const CollectionIcon: React.FC<{ style?: React.CSSProperties }> = (props) => {
  return <Icon {...props} />;
};

export default CollectionIcon;
