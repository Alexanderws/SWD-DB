import React, { useContext } from "react";
import styled from "styled-components";

import { COLOR, FONT_SIZE, SEMANTIC_COLOR } from "../../assets/constants";
import { getFactionColor } from "../../assets/utils";
import { Deck, Card } from "../../types/index";
import { DeckContext } from "../../context/Deck.context";

import {
  LinedHeadingContainer,
  Heading2,
  Row,
  Column,
} from "../../components/Common.component";
import ActionButton from "../../components/ActionButton.component";

const Container = styled.div`
  background-color: ${COLOR.yellowSoft};
  color: ${SEMANTIC_COLOR.textDark};
  width: 100%;
  padding: 16px;
  border-radius: 4px;
  margin-top: 32px;
`;

const NameInput = styled.input`
  background-color: rgba(255, 255, 255, 0.2);
  border: none;
  border-bottom: 2px solid ${SEMANTIC_COLOR.textDark};
  padding: 8px 4px;
  color: ${SEMANTIC_COLOR.textDark};
  line-height: 28px;
  width: 100%;
  font-size: ${FONT_SIZE.large};
  font-weight: 500;

  &:-webkit-autofill {
    box-shadow: none;
    -webkit-box-shadow: 0 0 0 30px rgba(255, 255, 255, 0.2) inset;
  }
  &:hover {
    border-bottom: 2px solid ${COLOR.redEspresso};
    background-color: rgba(255, 255, 255, 0.4);
  }
`;

const SubmitBox: React.FC = () => {
  const { activeDeck, setName } = useContext(DeckContext);

  return (
    <Container>
      <Heading2 style={{ marginTop: 0 }}>DECK NAME</Heading2>
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
        <ActionButton onClick={() => {}}>SAVE DECK</ActionButton>
      </Row>
    </Container>
  );
};

export default SubmitBox;
