import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { COLOR, FONT_SIZE, SEMANTIC_COLOR } from "../assets/constants";
import { getFactionColor } from "../assets/utils";
import { DeckContext } from "../context/Deck.context";

import DagobahIcon from "../components/DagobahIcon.component";
import { Column, Row, Heading2 } from "../components/Common.component";
import { AuthContext } from "../context/Auth.context";

const Container = styled.div`
  width: 100%;
  height: 60px;
  background-color: ${SEMANTIC_COLOR.header};
  color: ${COLOR.whitePearl};
  padding: 0px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  margin: 0;
  font-size: ${FONT_SIZE.xLarge};
  padding-bottom: 2px;
  margin-left: 12px;
  font-weight: 600;
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

const Header = () => {
  const { activeUser, signOutUser } = useContext(AuthContext);

  return (
    <Container>
      <Row style={{ alignItems: "center" }}>
        <DagobahIcon />
        <Title>DAGOBAH</Title>
      </Row>
      <StyledLink to="/decks">MY DECKS</StyledLink>
      <StyledLink to="/collection">MY COLLECTION</StyledLink>
      <StyledLink to="/decklists">DECKLISTS</StyledLink>
      {activeUser ? (
        <Column>
          <span>{activeUser.email}</span>
          <button onClick={signOutUser}>Sign out</button>
        </Column>
      ) : (
        <StyledLink to="/signin">Sign in/sign up</StyledLink>
      )}
    </Container>
  );
};

export default Header;
