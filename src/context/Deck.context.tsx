import React, { useState, createContext } from "react";

import { Deck, Card } from "../types/index";

interface DeckContextInterface {
  activeDeck: Deck;
  loadDeck: (id: string) => void;
  addCard: (card: Card) => void;
  removeCard: (card: Card) => void;
  setName: (name: string) => void;
}

const EMPTY_DECK: Deck = {
  id: "",
  name: "",
  characters: [],
  drawDeck: [],
};

export const DeckContext = createContext<DeckContextInterface>(
  {} as DeckContextInterface
);
DeckContext.displayName = "DeckContext";

export const DeckContextProvider: React.FC = (props) => {
  const [activeDeck, setActiveDeck] = useState<Deck>(EMPTY_DECK);

  const loadDeck = (id: string) => {
    // load deck from db, set as active
  };

  const addRemoveCard = (card: Card, add: boolean) => {
    switch (card.type_code) {
      case "character": {
        setActiveDeck((prevState) => {
          if (add) {
            return {
              ...prevState,
              characters: [
                ...prevState.characters,
                { card: card, quantity: 1 },
              ],
            };
          } else {
            const removeIndex = prevState.characters.findIndex(
              (character) => character.card === card
            );
            return {
              ...prevState,
              characters: [
                ...prevState.characters.slice(0, removeIndex),
                ...prevState.characters.slice(removeIndex + 1),
              ],
            };
          }
        });
        break;
      }
      case "battlefield": {
        setActiveDeck((prevState) => {
          return {
            ...prevState,
            battleField: add ? card : undefined,
          };
        });
        break;
      }
      case "plot": {
        setActiveDeck((prevState) => {
          return {
            ...prevState,
            plot: add ? card : undefined,
          };
        });
        break;
      }
      default: {
        setActiveDeck((prevState) => {
          if (add) {
            return {
              ...prevState,
              drawDeck: [...prevState.drawDeck, card],
            };
          } else {
            const removeIndex = prevState.drawDeck.indexOf(card);
            return {
              ...prevState,
              drawDeck: [
                ...prevState.drawDeck.slice(0, removeIndex),
                ...prevState.drawDeck.slice(removeIndex + 1),
              ],
            };
          }
        });
        break;
      }
    }
  };

  const addCard = (card: Card) => {
    addRemoveCard(card, true);
  };

  const removeCard = (card: Card) => {
    if (
      (["upgrade", "downgrade", "support", "event"].includes(card.type_code) &&
        !activeDeck.drawDeck.includes(card)) ||
      (card.type_code === "character" &&
        !activeDeck.characters.some((character) => character.card === card))
    ) {
      return;
    }
    addRemoveCard(card, false);
  };

  const setName = (newName: string) => {
    setActiveDeck((prevState) => {
      return {
        ...prevState,
        name: newName,
      };
    });
  };

  const initialContext: DeckContextInterface = {
    activeDeck: activeDeck,
    loadDeck: loadDeck,
    addCard: addCard,
    removeCard: removeCard,
    setName: setName,
  };

  return (
    <DeckContext.Provider value={initialContext}>
      {props.children}
    </DeckContext.Provider>
  );
};
