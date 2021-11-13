import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";

import { Deck, Card } from "../../types/index";
import { DeckContext } from "../../context/Deck.context";
import {
  Row,
  Column,
  Heading2,
  Heading3,
} from "../../components/Common.component";

const CategoryContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: left;
  flex-wrap: wrap;
  gap: 0 32px;
`;

const DrawDeck = () => {
  const CARD_TYPES = ["event", "upgrade", "downgrade", "support"];
  const { activeDeck } = useContext(DeckContext);

  return (
    <>
      <Heading2>DRAW DECK</Heading2>
      <Row style={{ gap: "32px" }}>
        <Column style={{ gap: "16px", minWidth: "180px" }}>
          {["upgrade", "downgrade"].map((TYPE) => {
            if (
              activeDeck.drawDeck.some((slot) => slot.card.type_code === TYPE)
            ) {
              return (
                <div>
                  <Heading3>{TYPE.toUpperCase()}</Heading3>
                  {activeDeck.drawDeck
                    .filter((cardSlot) => cardSlot.card.type_code === TYPE)
                    .sort((slotA, slotB) =>
                      slotA.card.name > slotB.card.name
                        ? 1
                        : slotA.card.name < slotB.card.name
                        ? -1
                        : 0
                    )
                    .map((cardSlot) => {
                      return (
                        <div key={cardSlot.card.name}>
                          {cardSlot.count}x {cardSlot.card.name}
                        </div>
                      );
                    })}
                </div>
              );
            } else {
              return;
            }
          })}
        </Column>
        <Column style={{ gap: "16px", minWidth: "180px" }}>
          {["support", "event"].map((TYPE) => {
            if (
              activeDeck.drawDeck.some((slot) => slot.card.type_code === TYPE)
            ) {
              return (
                <div>
                  <Heading3>{TYPE.toUpperCase()}</Heading3>
                  {activeDeck.drawDeck
                    .filter((cardSlot) => cardSlot.card.type_code === TYPE)
                    .sort((slotA, slotB) =>
                      slotA.card.name > slotB.card.name
                        ? 1
                        : slotA.card.name < slotB.card.name
                        ? -1
                        : 0
                    )
                    .map((cardSlot) => {
                      return (
                        <div key={cardSlot.card.name}>
                          {cardSlot.count}x {cardSlot.card.name}
                        </div>
                      );
                    })}
                </div>
              );
            } else {
              return;
            }
          })}
        </Column>
      </Row>
    </>
  );
};

export default DrawDeck;
