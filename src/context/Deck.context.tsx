import React, { useState, createContext } from "react";

import { Deck, Card } from "../types/index";

interface DeckContextInterface {
  activeDeck: Deck;
  loadDeck: (id: string) => void;
  addCard: (card: Card) => void;
  removeCard: (card: Card) => void;
  adjustPoints: (characterIndex: number, count: number) => void;
  setName: (name: string) => void;
}

const EMPTY_DECK: Deck = {
  id: "",
  name: "",
  characters: [],
  drawDeck: [],
  format: "Standard",
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

  const getPointsArray = (points: string): number[] => {
    const strings = points.split("/");
    return strings.map((num) => parseInt(num));
  };

  const adjustPoints = (characterIndex: number, count: number) => {
    setActiveDeck((prevState) => {
      return {
        ...prevState,
        characters: [
          ...prevState.characters.slice(0, characterIndex),
          {
            ...prevState.characters[characterIndex],
            count: count,
          },
          ...prevState.characters.slice(characterIndex + 1),
        ],
      };
    });
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
                {
                  card: card,
                  pointsArray: getPointsArray(card.points ?? "0"),
                  count: 1,
                },
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
          const currentCount =
            prevState.drawDeck.find((cardSlot) => cardSlot.card === card)
              ?.count ?? 0;
          console.log(`card: ${card.name} - currentCount: ${currentCount}`);
          if (add) {
            if (currentCount > 0) {
              let newDrawDeck = prevState.drawDeck.map((slot) => {
                if (slot.card === card) {
                  return { card: card, count: slot.count + 1 };
                }
                return slot;
              });
              console.log("newDrawdeck:", newDrawDeck);
              return {
                ...prevState,
                drawDeck: newDrawDeck,
              };
            }
            return {
              ...prevState,
              drawDeck: [
                ...prevState.drawDeck,
                {
                  card: card,
                  count: 1,
                },
              ],
            };
          } else {
            if (currentCount === 1) {
              const removeIndex = prevState.drawDeck.findIndex(
                (cardSlot) => cardSlot.card === card
              );
              return {
                ...prevState,
                drawDeck: [
                  ...prevState.drawDeck.slice(0, removeIndex),
                  ...prevState.drawDeck.slice(removeIndex + 1),
                ],
              };
            } else {
              let newDrawDeck = prevState.drawDeck.map((slot) => {
                if (slot.card === card) {
                  return { card: card, count: slot.count - 1 };
                }
                return slot;
              });
              return {
                ...prevState,
                drawDeck: newDrawDeck,
              };
            }
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
        !activeDeck.drawDeck.some((slot) => slot.card === card)) ||
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
    adjustPoints: adjustPoints,
    setName: setName,
  };

  return (
    <DeckContext.Provider value={initialContext}>
      {props.children}
    </DeckContext.Provider>
  );
};
