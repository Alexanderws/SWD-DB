import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";

import { COLOR, FONT_SIZE } from "../../assets/constants";
import { Deck, Card } from "../../types/index";
import { DeckContext } from "../../context/Deck.context";

import { Row, Column, Heading2 } from "../../components/Common.component";
import Characters from "./Characters.component";
import DrawDeck from "./DrawDeck.component";
import DeckStats from "./DeckStats.component";
import HorizontanCardDisplay from "./HorizontalCardDisplay.component";
import SubmitBox from "./SubmitBox.component";

const NameInput = styled.input`
  background-color: ${COLOR.whitePearl};
  border: none;
  border-bottom: 2px solid ${COLOR.gray};
  padding: 8px 8px 4px 0;
  line-height: 28px;
  width: 100%;
  font-size: ${FONT_SIZE.large};
  font-weight: 500;

  &:-webkit-autofill {
    box-shadow: none;
    -webkit-box-shadow: 0 0 0 30px ${COLOR.grayBright} inset;
  }
  &:hover {
    border-bottom: 2px solid ${COLOR.redEspresso};
    background-color: ${COLOR.white};
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
    <div style={{ width: "fit-content" }}>
      <Heading2>DETAILS</Heading2>
      <Row style={{ gap: "32px", justifyContent: "space-between" }}>
        <DeckStats />
        <Column style={{ gap: "16px", marginTop: "-5px" }}>
          <HorizontanCardDisplay card={activeDeck.battleField} />
          {activeDeck.plot && <HorizontanCardDisplay card={activeDeck.plot} />}
        </Column>
      </Row>
      <Characters />
      <DrawDeck />
      <SubmitBox />
    </div>
  );
};

export default DeckForm;
