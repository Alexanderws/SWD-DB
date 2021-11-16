import React from "react";

import { SectionContainer, Heading2 } from "../../components/Common.component";
import Characters from "./Characters.component";
import DrawDeck from "./DrawDeck.component";
import DeckOverview from "./DeckOverview.component";
import SubmitBox from "./SubmitBox.component";

const DeckForm: React.FC = () => {
  return (
    <div style={{ width: "fit-content" }}>
      <SectionContainer>
        <Heading2>DETAILS</Heading2>
        <DeckOverview />
      </SectionContainer>
      <SectionContainer>
        <Characters />
      </SectionContainer>
      <SectionContainer>
        <DrawDeck />
      </SectionContainer>
      <SubmitBox />
    </div>
  );
};

export default DeckForm;
