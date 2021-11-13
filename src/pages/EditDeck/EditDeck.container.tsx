import React from "react";
import styled from "styled-components";

import { Card } from "../../types/index";

import { DeckContextProvider } from "../../context/Deck.context";
import DeckForm from "./DeckForm.component";
import CardCollection from "./CardCollection.component";

import { cards } from "../../awakenings.json";
import { BREAK_POINT } from "../../assets/constants";

// TODO: Mediaquery -> if large screen = X%, else max width in column
const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 64px;

  @media (max-width: ${BREAK_POINT.medium}) {
    flex-direction: column;
    gap: 32px;
  }
`;

const LeftContainer = styled.div`
  width: 100%;
  max-width: 608px;
`;
const RightContainer = styled.div`
  width: 100%;
`;

const EditDeckPage: React.FC = () => {
  // const { isLoading, isError, data: allCards } = useQuery("cards", fetchCards);

  // if (isLoading) {
  //   return <span>Loading...</span>;
  // }

  // if (isError) {
  //   return <span>Error: </span>;
  // }

  return (
    <DeckContextProvider>
      <MainContainer>
        <LeftContainer>
          <DeckForm />
        </LeftContainer>
        <RightContainer>
          <CardCollection cards={cards as Card[]} />
        </RightContainer>
      </MainContainer>
    </DeckContextProvider>
  );
};

export default EditDeckPage;
