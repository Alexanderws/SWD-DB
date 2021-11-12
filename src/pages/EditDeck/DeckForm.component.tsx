import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";

import { COLOR, FONT_SIZE } from "../../assets/constants";
import { Deck, Card } from "../../types/index";
import { DeckContext } from "../../context/Deck.context";

import Characters from "./Characters.component";
import DrawDeck from "./DrawDeck.component";

const NameInput = styled.input`
  background-color: ${COLOR.grayBright};
  border: none;
  border-bottom: 2px solid ${COLOR.gray};
  padding: 8px 8px 4px;
  line-height: 28px;
  width: 100%;
  font-size: ${FONT_SIZE.large};
  font-weight: 500;

  &:-webkit-autofill {
    box-shadow: none;
    -webkit-box-shadow: 0 0 0 30px ${COLOR.grayBright} inset;
  }
  &:hover {
    border-bottom: 2px solid ${COLOR.black};
  }
`;

const FieldLabel = styled.label`
  color: ${COLOR.gray};
  display: block;
  font-weight: 700;
  padding: 8px 0;
`;

const DeckForm: React.FC = () => {
  const { activeDeck, setName } = useContext(DeckContext);

  // name field
  // format selection
  // stats, battlefield
  // characters
  // cards table, sorted by type
  // save-btn

  return (
    <div style={{ width: "100%" }}>
      <h2>DECK</h2>
      <FieldLabel htmlFor="deck-name">Name</FieldLabel>
      <NameInput
        maxLength={60}
        name="deck-name"
        value={activeDeck.name}
        onChange={(event) => {
          setName(event.currentTarget.value);
        }}
      />
      <Characters characters={activeDeck.characters} />
      <h3>Draw deck</h3>
      <DrawDeck />
    </div>
  );
};

export default DeckForm;
