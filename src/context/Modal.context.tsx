import React, { useState, createContext } from "react";

import { Card } from "../types/index";

interface ModalContextInterface {
  isVisible: boolean;
  cardToShow: Card;
  showModal: (card: Card) => void;
  hideModal: () => void;
}

const EMPTY_CARD: Card = {
  affiliation_code: "",
  code: "",
  deck_limit: 0,
  faction_code: "",
  has_die: false,
  has_errata: false,
  is_unique: false,
  name: "",
  position: 0,
  rarity_code: "",
  set_code: "",
  text: "",
  ttscardid: "",
  type_code: "",
};

export const ModalContext = createContext<ModalContextInterface>(
  {} as ModalContextInterface
);
ModalContext.displayName = "ModalContext";

export const ModalContextProvider: React.FC = (props) => {
  const [cardToShow, setCardToShow] = useState<Card>(EMPTY_CARD);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const showModal = (card: Card) => {
    setCardToShow(card);
    setIsVisible(true);
  };

  const hideModal = () => {
    setCardToShow(EMPTY_CARD);
    setIsVisible(false);
  };

  const initialContext: ModalContextInterface = {
    isVisible: isVisible,
    cardToShow: cardToShow,
    showModal: showModal,
    hideModal: hideModal,
  };

  return (
    <ModalContext.Provider value={initialContext}>
      {props.children}
    </ModalContext.Provider>
  );
};
