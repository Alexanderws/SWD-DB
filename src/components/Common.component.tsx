import React from "react";
import styled from "styled-components";

import { COLOR, SEMANTIC_COLOR, FONT_SIZE } from "../assets/constants";

export const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Heading2 = styled.h2`
  color: ${COLOR.blackMuted};
  font-size: ${FONT_SIZE.large};
  font-weight: 700;
  margin: 0 0 16px 0;
  padding: 0;
  white-space: nowrap;
`;

export const Heading3 = styled.h3`
  color: ${COLOR.blackMuted};
  font-size: ${FONT_SIZE.default};
  font-weight: 700;
  margin-bottom: 8px;
  padding: 0;
  white-space: nowrap;
`;

export const SectionContainer = styled.section`
  margin-bottom: 32px;
`;

const Separator = styled.div`
  width: 100%;
  height: 2px;
  background-color: ${COLOR.blackMuted};
`;

export const LinedHeadingContainer: React.FC<{ style?: React.CSSProperties }> =
  (props) => {
    return (
      <div style={{ display: "flex", alignItems: "flex-end", ...props.style }}>
        {props.children}
        <Separator style={{ marginLeft: "8px", marginBottom: "5px" }} />
      </div>
    );
  };

export const InputLabel = styled.label`
  color: ${COLOR.grayDark};
  font-weight: 600;
  font-size: ${FONT_SIZE.default};
  margin: 8px 0;
  text-transform: uppercase;
`;

export const TextInput = styled.input`
  background-color: rgba(255, 255, 255, 0.2);
  border: none;
  font-family: "Open Sans", sans-serif;
  border-bottom: 2px solid ${SEMANTIC_COLOR.textDark};
  padding: 4px 8px;
  color: ${SEMANTIC_COLOR.textDark};
  line-height: 28px;
  width: 100%;
  font-size: ${FONT_SIZE.large};
  font-weight: 600;

  &:-webkit-autofill {
    box-shadow: none;
    -webkit-box-shadow: 0 0 0 30px rgba(255, 255, 255, 0.2) inset;
  }
  &:hover {
    border-bottom: 2px solid ${COLOR.redEspresso};
    background-color: rgba(255, 255, 255, 0.4);
  }
`;
