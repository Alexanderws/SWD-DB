import React, { useContext, useState, useEffect } from "react";

import { Deck, Card } from "../../types/index";
import { DeckContext } from "../../context/Deck.context";

const DrawDeck = () => {
  const { activeDeck } = useContext(DeckContext);
  const [cardAndQuantity, setCardAndQuantity] = useState<{
    [key: string]: number;
  }>({});

  useEffect(() => {
    setCardAndQuantity(getCardQuantities(activeDeck.drawDeck));
  }, [activeDeck.drawDeck]);

  const getCardQuantities = (
    cards: Card[]
  ): {
    [key: string]: number;
  } => {
    let counted: { [key: string]: number } = {};
    cards.forEach((card) => {
      let count = counted[card.name] ?? 0;
      counted[card.name] = count + 1;
    });
    return counted;
  };

  return (
    <div>
      {Object.keys(cardAndQuantity).map((key) => {
        return (
          <div key={key}>
            {cardAndQuantity[key]}x {key}
          </div>
        );
      })}
    </div>
  );
};

export default DrawDeck;
