import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { COLOR, FONT_SIZE, SEMANTIC_COLOR } from "../assets/constants";

import DagobahIcon from "../components/DagobahIcon.component";
import DeckIcon from "../components/DeckIcon.component";
import CollectionIcon from "../components/CollectionIcon.component";
import DeckListIcon from "../components/DeckListIcon.component";
import { Column, Row } from "../components/Common.component";
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
  display: flex;
  align-items: center;

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
      <StyledLink to="/decks">
        <DeckIcon style={{ marginRight: "4px", marginBottom: "-2px" }} />
        MY DECKS
      </StyledLink>
      <StyledLink to="/collection">
        <CollectionIcon style={{ marginRight: "4px", marginBottom: "-2px" }} />
        MY COLLECTION
      </StyledLink>
      <StyledLink to="/decklists">
        <DeckListIcon style={{ marginRight: "4px", marginBottom: "-2px" }} />
        DECKLISTS
      </StyledLink>
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
