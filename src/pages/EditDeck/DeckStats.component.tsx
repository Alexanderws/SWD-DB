import React, { useContext } from "react";
import styled from "styled-components";

import { COLOR, FONT_SIZE } from "../../assets/constants";
import { Deck, Card } from "../../types/index";
import { DeckContext } from "../../context/Deck.context";

import { LinedHeadingContainer, Row } from "../../components/Common.component";

const StatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${COLOR.brownLeather};
  border-radius: 4px;
  padding: 16px;
  color: ${COLOR.white};
  width: 100%;
`;

const StatsHeader = styled.h3`
  font-size: ${FONT_SIZE.default};
  font-weight: 700;
`;

const StatsLabel = styled.h4`
  font-size: ${FONT_SIZE.default};
  font-weight: 600;
  color: rgba(255, 255, 255, 0.5);
`;

const DeckStats: React.FC = () => {
  const { activeDeck, setName } = useContext(DeckContext);

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
      <LinedHeadingContainer>
        <StatsHeader>STATS</StatsHeader>
      </LinedHeadingContainer>
      <Row style={{ justifyContent: "space-between" }}>
        <StatsLabel>Characters</StatsLabel>
        <p>
          <strong>{characterPoints}</strong> points,{" "}
          <strong>{characterDice}</strong> dice
        </p>
      </Row>
      <Row style={{ justifyContent: "space-between" }}>
        <StatsLabel>Draw deck</StatsLabel>
        <p>
          <strong>{drawCards}</strong> cards, <strong>{drawDice}</strong> dice
        </p>
      </Row>
      <Row style={{ justifyContent: "space-between" }}>
        <StatsLabel>Format</StatsLabel>
        <p>
          <span style={{ fontWeight: 600 }}>{activeDeck.format}</span>
        </p>
      </Row>
      <Row style={{ justifyContent: "space-between" }}>
        <StatsLabel>Sets</StatsLabel>
        <div
          style={{
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
            marginBottom: "16px",
          }}
        >
          {Array.from(new Set(includedSets)).map((set) => {
            return <span style={{ fontWeight: 600 }}>{set}</span>;
          })}
        </div>
      </Row>
    </StatsContainer>
  );
};

export default DeckStats;
