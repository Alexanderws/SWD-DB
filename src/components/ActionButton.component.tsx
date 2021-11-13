import React, { ButtonHTMLAttributes } from "react";
import styled from "styled-components";

const ActionButton: React.FC<{
  onClick: () => void;
  style?: React.CSSProperties;
}> = (props) => {
  return <button {...props}>{props.children}</button>;
};

export default ActionButton;
