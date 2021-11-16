import React from "react";
import styled from "styled-components";

import { COLOR, FONT_SIZE, SEMANTIC_COLOR } from "../assets/constants";

const Container = styled.div`
  width: 100%;
  height: 60px;
  background-color: ${SEMANTIC_COLOR.footer};
  color: ${COLOR.blueMarine};
  padding: 0px 40px;
  display: flex;
  align-items: center;
`;

const Title = styled.div`
  font-size: ${FONT_SIZE.large};
  font-weight: 600;
`;

const Description = styled.div`
  margin-left: 16px;
  font-size: ${FONT_SIZE.large};
  font-weight: 400;
`;

const Footer = () => {
  return (
    <Container>
      <Title>DAGOBAH</Title>
      <Description>A Star Wars Destiny Deckbuilder</Description>
    </Container>
  );
};

export default Footer;
