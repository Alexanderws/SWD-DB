import React from "react";
import styled from "styled-components";

import { COLOR, FONT_SIZE } from "../assets/constants";

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
  font-weight: 600;
  margin: 32px 0 16px;
  padding: 0;
`;

export const Heading3 = styled.h3`
  color: ${COLOR.blueMarine};
  font-size: ${FONT_SIZE.default};
  font-weight: 600;
  margin-bottom: 8px;
  padding: 0;
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
