import React, { useState, useEffect } from "react";
import styled, { StyledComponent } from "styled-components";

import { COLOR } from "../../assets/constants";
import { Card } from "../../types/index";

import CardTable from "./CardTable.component";

export const SegmentedButton: StyledComponent<
  "input",
  React.CSSProperties
> = styled.input`
  padding: 4px 8px;
  color: ${COLOR.black};
  border: solid 1px ${COLOR.black};
  border-right: none;
  margin: 0;
  text-transform: capitalize;
  background-color: ${COLOR.white};
  font-weight: 500;
  cursor: pointer;
  &:first-child {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }
  &:last-child {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    border-right: solid 1px ${COLOR.black};
  }
  &:disabled {
    color: ${COLOR.gray};
    border: solid 1px ${COLOR.gray};
    ${({ defaultChecked }) =>
      defaultChecked
        ? "color: " + COLOR.white + "; background-color: " + COLOR.gray + ";"
        : ""};
  }
  ${({ defaultChecked }) =>
    defaultChecked
      ? "color: " +
        COLOR.white +
        "; font-weight: 600; background-color: " +
        COLOR.black +
        ";"
      : ""};
`;

const CardCollection: React.FC<{ cards: Card[] }> = ({ cards }) => {
  const [filteredCards, setFilteredCards] = useState<Card[]>([]);
  const [selectedAffiliations, setSelectedAffiliations] = useState<string[]>(
    []
  );
  const [selectedFactions, setSelectedFactions] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const AFFILIATIONS = ["hero", "neutral", "villain"];
  const FACTIONS = ["blue", "red", "yellow", "gray"];
  const TYPES = [
    "character",
    "battlefield",
    "plot",
    "upgrade",
    "downgrade",
    "support",
    "event",
  ];
  const handleAffiliationClick = (
    event: React.MouseEvent<HTMLInputElement>
  ) => {
    const clickedAffiliation = event.currentTarget.value;
    if (selectedAffiliations.includes(clickedAffiliation)) {
      setSelectedAffiliations((prevState) =>
        prevState.filter((affiliation) => affiliation !== clickedAffiliation)
      );
    } else {
      setSelectedAffiliations((prevState) => [
        ...prevState,
        clickedAffiliation,
      ]);
    }
  };

  const handleFactionClick = (event: React.MouseEvent<HTMLInputElement>) => {
    const clickedFaction = event.currentTarget.value;
    if (selectedFactions.includes(clickedFaction)) {
      setSelectedFactions((prevState) =>
        prevState.filter((faction) => faction !== clickedFaction)
      );
    } else {
      setSelectedFactions((prevState) => [...prevState, clickedFaction]);
    }
  };

  const handleTypeClick = (event: React.MouseEvent<HTMLInputElement>) => {
    const clickedType = event.currentTarget.value;
    if (selectedTypes.includes(clickedType)) {
      setSelectedTypes((prevState) =>
        prevState.filter((type) => type !== clickedType)
      );
    } else {
      setSelectedTypes((prevState) => [...prevState, clickedType]);
    }
  };

  useEffect(() => {
    setFilteredCards(cards);
  }, [cards]);

  useEffect(() => {
    setFilteredCards(
      cards.filter(
        (card) =>
          (!selectedAffiliations.length ||
            selectedAffiliations.includes(card.affiliation_code)) &&
          (!selectedFactions.length ||
            selectedFactions.includes(card.faction_code)) &&
          (!selectedTypes.length || selectedTypes.includes(card.type_code))
      )
    );
  }, [selectedAffiliations, selectedFactions, selectedTypes, cards]);

  return (
    <div>
      <div>
        {AFFILIATIONS.map((affiliation) => {
          return (
            <SegmentedButton
              key={affiliation}
              type="button"
              name={affiliation}
              value={affiliation}
              onClick={handleAffiliationClick}
              defaultChecked={selectedAffiliations.includes(affiliation)}
            />
          );
        })}
      </div>
      <div>
        {FACTIONS.map((faction) => {
          return (
            <SegmentedButton
              key={faction}
              type="button"
              name={faction}
              value={faction}
              onClick={handleFactionClick}
              defaultChecked={selectedFactions.includes(faction)}
            />
          );
        })}
      </div>
      <div>
        {TYPES.map((type) => {
          return (
            <SegmentedButton
              key={type}
              type="button"
              name={type}
              value={type}
              onClick={handleTypeClick}
              defaultChecked={selectedTypes.includes(type)}
            />
          );
        })}
      </div>
      <div>
        <CardTable cards={filteredCards} />
      </div>
    </div>
  );
};

export default CardCollection;
