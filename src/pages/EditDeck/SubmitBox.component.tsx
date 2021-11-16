import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

import { COLOR, FONT_SIZE, SEMANTIC_COLOR } from "../../assets/constants";
import { DeckContext } from "../../context/Deck.context";
import { Deck } from "../../types/index";

import { Heading2, Row } from "../../components/Common.component";
import ActionButton from "../../components/ActionButton.component";
import { saveDeck } from "../../api/fireBase";

const Container = styled.div`
  background-color: ${COLOR.blueFactionDark};
  color: ${SEMANTIC_COLOR.textBright};
  width: 100%;
  padding: 16px;
  border-radius: 0px;
  margin-top: 32px;
`;

const NameInput = styled.input`
  background-color: rgba(255, 255, 255, 0.2);
  border: none;
  font-family: "Open Sans", sans-serif;
  border-bottom: 2px solid ${SEMANTIC_COLOR.textBright};
  padding: 4px;
  color: ${SEMANTIC_COLOR.textBright};
  line-height: 28px;
  width: 100%;
  font-size: ${FONT_SIZE.large};
  font-weight: 600;

  &:-webkit-autofill {
    box-shadow: none;
    -webkit-box-shadow: 0 0 0 30px rgba(255, 255, 255, 0.2) inset;
  }
  &:hover {
    background-color: rgba(255, 255, 255, 0.4);
  }
`;

const SubmitBox: React.FC = () => {
  const { activeDeck, setName, setId, resetDeck } = useContext(DeckContext);

  const handleSubmitClick = () => {
    // VALIDATE
    const deckToSave: Deck = {
      ...activeDeck,
      id: activeDeck.id.length === 0 ? uuidv4() : activeDeck.id,
    };
    console.log("handleSubmitClick - deckToSave.id:", deckToSave.id);
    saveDeck(deckToSave);
    resetDeck();
  };

  return (
    <Container>
      <Heading2 style={{ marginTop: 0, color: SEMANTIC_COLOR.textBright }}>
        DECK NAME
      </Heading2>
      <NameInput
        maxLength={60}
        name="deck-name"
        value={activeDeck.name}
        onChange={(event) => {
          setName(event.currentTarget.value);
        }}
      />
      <Row style={{ justifyContent: "space-between", marginTop: "32px" }}>
        <ActionButton type="cancel" onClick={() => {}}>
          CANCEL
        </ActionButton>
        <ActionButton onClick={handleSubmitClick}>SAVE DECK</ActionButton>
      </Row>
    </Container>
  );
};

export default SubmitBox;
