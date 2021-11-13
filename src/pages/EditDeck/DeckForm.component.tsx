import React, { useContext } from "react";

import { DeckContext } from "../../context/Deck.context";

import { Row, Column, Heading2 } from "../../components/Common.component";
import Characters from "./Characters.component";
import DrawDeck from "./DrawDeck.component";
import DeckStats from "./DeckStats.component";
import HorizontanCardDisplay from "./HorizontalCardDisplay.component";
import SubmitBox from "./SubmitBox.component";

const DeckForm: React.FC = () => {
  const { activeDeck } = useContext(DeckContext);

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
