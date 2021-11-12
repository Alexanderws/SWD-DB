import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";

import { DeckContext } from "../../context/Deck.context";
import { Card } from "../../types/index";
import { COLOR } from "../../assets/constants";

import { Row } from "../../components/Common.component";

const THCell = styled.th`
  text-align: left;
  padding: 4px 0;
`;

const TDCell = styled.td`
  text-align: left;
  padding: 4px;
`;

const SortButton = styled.button`
  font-weight: 600;
  padding: 4px;
  border: none;
  background-color: transparent;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const ButtonContainer = styled.button<{ add?: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 3px;
  background-color: ${COLOR.white};
  border: 1px solid ${COLOR.black};
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover  {
    cursor: pointer;
  }
`;

const AddButtonLine = styled.div`
  width: 2px;
  height: 10px;
  position: absolute;
  background-color: ${COLOR.black};
`;

const AddRemoveButton: React.FC<{
  style?: React.CSSProperties;
  add?: boolean;
  onClick?: () => void;
}> = (props) => {
  return (
    <ButtonContainer {...props}>
      <AddButtonLine style={{ transform: "rotate(90deg)" }} />
      {props.add && <AddButtonLine />}
    </ButtonContainer>
  );
};

const CardTable: React.FC<{ cards: Card[] }> = ({ cards }) => {
  const [sortedCards, setSortedCards] = useState<Card[]>([]);
  const [activeComparator, setActiveComparator] = useState<[string, boolean]>([
    "name",
    true,
  ]);

  const { addCard, removeCard } = useContext(DeckContext);

  useEffect(() => {
    let sorted = sortCards(cards, activeComparator[0]);
    if (!activeComparator[1]) {
      sorted.reverse();
    }
    setSortedCards(sorted);
  }, [cards]);

  const handleSortClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const comparator = event.currentTarget.dataset.sort ?? "name";
    if (comparator === activeComparator[0]) {
      setActiveComparator((prevState) => [prevState[0], false]);
      setSortedCards((prevState) => [...prevState].reverse());
    } else {
      setActiveComparator([comparator, true]);
      setSortedCards((prevState) => sortCards(prevState, comparator));
    }
  };

  const sortCards = (cardsToSort: Card[], comparator: string): Card[] => {
    return cardsToSort.sort((cardA, cardB) => {
      let a = cardA[comparator];
      let b = cardB[comparator];
      if (comparator === "cp") {
        a = cardA["cost"] ?? cardA["points"];
        b = cardB["cost"] ?? cardB["points"];
      }
      return a > b ? 1 : a < b ? -1 : 0;
    });
  };

  return (
    <table style={{ width: "100%" }}>
      <thead>
        <tr>
          <THCell>
            <SortButton data-sort="deck_limit" onClick={handleSortClick}>
              Quantity
            </SortButton>
          </THCell>
          <THCell>
            <SortButton data-sort="name" onClick={handleSortClick}>
              Name
            </SortButton>
          </THCell>
          <THCell>
            <SortButton
              data-sort="has_die"
              title="Has die"
              onClick={handleSortClick}
            >
              <span className="icon-die"></span>
            </SortButton>
          </THCell>
          <THCell className="cost">
            <SortButton
              data-sort="cp"
              title="Points/Cost"
              onClick={handleSortClick}
            >
              C.
            </SortButton>
          </THCell>
          <THCell>
            <SortButton
              data-sort="health"
              title="Health"
              onClick={handleSortClick}
            >
              H.
            </SortButton>
          </THCell>
          <THCell>
            <SortButton
              data-sort="type_code"
              title="Type"
              onClick={handleSortClick}
            >
              T.
            </SortButton>
          </THCell>
          <THCell>
            <SortButton
              data-sort="faction_code"
              title="Color"
              onClick={handleSortClick}
            >
              C.
            </SortButton>
          </THCell>
        </tr>
      </thead>
      <tbody>
        {sortedCards.map((card) => {
          return (
            <tr key={card.ttscardid}>
              <TDCell style={{ textAlign: "left" }}>
                <Row>
                  <AddRemoveButton
                    onClick={() => {
                      removeCard(card);
                    }}
                  />
                  <AddRemoveButton
                    add={true}
                    onClick={() => {
                      addCard(card);
                    }}
                  />
                </Row>
              </TDCell>
              <TDCell>{card.name}</TDCell>
              <TDCell>{card.has_die}</TDCell>
              <TDCell>{card.cost ?? card.points ?? 0}</TDCell>
              <TDCell>{card.health ?? ""}</TDCell>
              <TDCell>{card.type_code}</TDCell>
              <TDCell>{card.faction_code}</TDCell>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default CardTable;
