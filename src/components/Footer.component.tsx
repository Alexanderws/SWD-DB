import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { COLOR, FONT_SIZE, SEMANTIC_COLOR } from "../assets/constants";
import { getFactionColor } from "../assets/utils";
import { DeckContext } from "../context/Deck.context";

import { Column, Row, Heading2 } from "../components/Common.component";
import { AuthContext } from "../context/Auth.context";

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

const StyledLink = styled(Link)`
  color: ${COLOR.whitePearl};
  font-size: ${FONT_SIZE.default};
  font-weight: 600;
  text-decoration: none;

  :hover {
    text-decoration: underline;
  }
`;

const Footer = () => {
  const { activeUser, signOutUser } = useContext(AuthContext);

  return (
    <Container>
      <Title>DAGOBAH</Title>
      <Description>A Star Wars Destiny Deckbuilder</Description>
    </Container>
  );
};

export default Footer;
