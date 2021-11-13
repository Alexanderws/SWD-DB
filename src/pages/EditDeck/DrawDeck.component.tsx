import React, { useContext } from "react";

import { DeckContext } from "../../context/Deck.context";
import {
  Row,
  Column,
  Heading2,
  Heading3,
} from "../../components/Common.component";

const DrawDeck = () => {
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
              return null;
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
              return null;
            }
          })}
        </Column>
      </Row>
    </>
  );
};

export default DrawDeck;
