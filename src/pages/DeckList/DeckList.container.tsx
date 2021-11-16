import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { Column, Heading2 } from "../../components/Common.component";
import { COLOR, SEMANTIC_COLOR, FONT_SIZE } from "../../assets/constants";
import { getDecks } from "../../api/fireBase";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
`;

const LinkButton = styled(Link)`
  color: ${COLOR.whitePearl};
  font-size: ${FONT_SIZE.default};
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 20px;
  text-decoration: none;
  display: flex;
  align-items: center;
  background-color: ${SEMANTIC_COLOR.accent};

  :hover {
    text-decoration: underline;
  }
`;

const DeckList = () => {
  const { isLoading, isError, data: decks } = useQuery("decks", getDecks);

  if (isError) {
    return <div>SÅRRI BÅRRI</div>;
  }

  if (isLoading) {
    return <div>VENT...</div>;
  }

  console.log("data:", decks);

  return (
    <Container>
      <Column>
        <Heading2>Your decks</Heading2>
        <ul>
          {decks?.map((deck) => {
            console.log("deck:", deck);
            return <li>{deck.name}</li>;
          })}
        </ul>
      </Column>
      <div>
        <LinkButton to="/deck">Create new deck</LinkButton>
      </div>
    </Container>
  );
};

export default DeckList;
