import React, { ButtonHTMLAttributes } from "react";
import styled from "styled-components";

import { COLOR, SEMANTIC_COLOR, FONT_SIZE } from "../assets/constants";

const ButtonContainer = styled.div`
  padding: 0 16px;
  height: 38px;
  line-height: 38px;
  font-size: ${FONT_SIZE.default};
  font-weight: 600;
  border-radius: 4px;
  border: none;

  :hover {
    cursor: pointer;
    text-decoration: underline;
  }

  &.primary {
    background-color: ${SEMANTIC_COLOR.buttonPrimary};
    color: ${COLOR.white};
  }

  &.cancel {
    background-color: transparent;
    border: 2px solid ${SEMANTIC_COLOR.buttonCancel};
    line-height: 34px;
    color: ${SEMANTIC_COLOR.buttonCancel};
  }
`;

const ActionButton: React.FC<{
  onClick?: () => void;
  type?: "primary" | "secondary" | "cancel" | "destructive";
  style?: React.CSSProperties;
}> = (props) => {
  const { type = "primary", ...otherProps } = props;

  return (
    <ButtonContainer className={type} {...otherProps}>
      {props.children}
    </ButtonContainer>
  );
};

export default ActionButton;
