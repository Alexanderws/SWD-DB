import React, { useContext } from "react";
import styled from "styled-components";

import { COLOR, FONT_SIZE } from "../../assets/constants";
import { DeckContext } from "../../context/Deck.context";
import { FormatContext } from "../../context/Format.context";

import { Column, Row } from "../../components/Common.component";
import HorizontalCardDisplay from "./HorizontalCardDisplay.component";

const StatsContainer = styled.div`
  background-color: ${COLOR.gray};
  border-radius: 0px;
  gap: 20px;
  color: ${COLOR.blackMuted};
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  min-width: 250px;
  padding: 16px;
  width: 100%;
`;

const VLine = styled.div`
  width: 2px;
  border-radius: 2px;
  background-color: ${COLOR.grayLight};
`;

const StatsHeader = styled.h3`
  font-size: ${FONT_SIZE.default};
  font-weight: 700;
`;

const StatsLabel = styled.p`
  font-size: ${FONT_SIZE.default};
  color: ${COLOR.grayDark};
  font-weight: 600;
  margin: 8px 0;
`;

const StatsField = styled.p`
  margin: 8px 0;
`;

const DeckOverview: React.FC = () => {
  const { activeDeck } = useContext(DeckContext);
  const { getSetName, getFormatName } = useContext(FormatContext);

  const characterPoints = activeDeck.characters.reduce((prev, slot) => {
    return prev + slot.pointsArray[slot.count - 1];
  }, 0);

  const characterDice = activeDeck.characters.reduce((prev, slot) => {
    return prev + (slot.card.has_die ? slot.count : 0);
  }, 0);

  const drawCards = activeDeck.drawDeck.reduce((prev, slot) => {
    return prev + slot.count;
  }, 0);

  const drawDice = activeDeck.drawDeck.reduce((prev, slot) => {
    return prev + (slot.card.has_die ? slot.count : 0);
  }, 0);

  let includedSets: string[] = [];
  activeDeck.characters.forEach((slot) => {
    includedSets.push(slot.card.set_code);
  });
  activeDeck.drawDeck.forEach((slot) => {
    includedSets.push(slot.card.set_code);
  });
  activeDeck.battleField && includedSets.push(activeDeck.battleField.set_code);
  activeDeck.plot && includedSets.push(activeDeck.plot.set_code);

  return (
    <StatsContainer>
      <Column>
        <StatsHeader>OVERVIEW</StatsHeader>
        <Row style={{ gap: "32px" }}>
          <Column>
            <StatsLabel>Characters</StatsLabel>
            <StatsLabel>Draw deck</StatsLabel>
            <StatsLabel>Format</StatsLabel>
            <StatsLabel>Sets</StatsLabel>
          </Column>
          <Column>
            <StatsField>
              <strong>{characterPoints}</strong> points,{" "}
              <strong>{characterDice}</strong> dice
            </StatsField>
            <StatsField>
              <strong>{drawCards}</strong> cards, <strong>{drawDice}</strong>{" "}
              dice
            </StatsField>
            <StatsField>
              <span style={{ fontWeight: 600 }}>
                {getFormatName(activeDeck.formatCode)}
              </span>
            </StatsField>
            <div
              style={{
                display: "flex",
                gap: "8px",
                flexWrap: "wrap",
                marginTop: "8px",
                marginBottom: "16px",
              }}
            >
              {Array.from(new Set(includedSets)).map((set) => {
                return (
                  <span style={{ fontWeight: 600 }}>{getSetName(set)}</span>
                );
              })}
            </div>
          </Column>
        </Row>
      </Column>
      <VLine />
      <Column style={{ gap: "16px", marginTop: "-5px" }}>
        <HorizontalCardDisplay card={activeDeck.battleField} />
        {activeDeck.plot && <HorizontalCardDisplay card={activeDeck.plot} />}
      </Column>
    </StatsContainer>
  );
};

export default DeckOverview;
