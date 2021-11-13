import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";

import { COLOR, FONT_SIZE } from "../../assets/constants";
import { getFactionColor } from "../../assets/utils";
import { Deck, Card } from "../../types/index";
import { DeckContext } from "../../context/Deck.context";

import { Column, Heading2 } from "../../components/Common.component";
import DiceIcon from "../../components/DiceIcon.component";

const CharacterRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

const CharacterContainer = styled.div`
  align-items: center;
  border-radius: 4px;
  display: inline-flex;
  flex-direction: column;
  min-height: 198px;
  justify-content: space-between;
  padding: 8px 8px 16px 8px;
  width: 140px;
`;

const Title = styled.div`
  color: ${COLOR.white};
  font-weight: 600;
  text-align: center;
`;

const SubTitle = styled.div`
  text-align: center;
  color: ${COLOR.white};
  font-weight: 400;
  font-size: ${FONT_SIZE.small};
`;

const ImageContainer = styled.div`
  background-color: transparent;
  border: 2px solid white;
  border-radius: 4px;
  height: 100px;
  width: 100px;
  margin: 8px 0;
  position: relative;
`;

const DiceContainer = styled.div`
  width: 30px;
  height: 18px;
  border-radius: 4px 0 4px 0;
  background-color: white;
  position: absolute;
  bottom: -2px;
  right: -2px;
  display: flex;
  padding: 0 3px 0 4px;
  font-size: ${FONT_SIZE.small};
  justify-content: space-between;
  align-items: center;
  line-height: 18px;
  font-weight: 600;
`;

const PointsRowContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 11px;
  flex-direction: row;
  height: 22px;
  display: flex;
  width: 100px;
`;

const PointsButton = styled.input`
  border: none;
  height: 100%;
  width: 100%;
  padding: 10px 0;
  text-align: center;
  color: rgba(0, 0, 0, 0.5);
  margin: 0;
  font-weight: 600;
  cursor: pointer;
  background-color: transparent;

  :focus {
    outline: 1px solid ${COLOR.gray};
  }

  ${({ defaultChecked }) =>
    defaultChecked
      ? "color: " +
        COLOR.black +
        "; background-color: " +
        COLOR.white +
        "; border-radius: 11px;"
      : ""};
`;

const Characters: React.FC = () => {
  const { activeDeck, adjustPoints } = useContext(DeckContext);

  return (
    <div>
      <Heading2>CHARACTERS</Heading2>
      <CharacterRow>
        {activeDeck.characters.map((character, characterIndex) => {
          const color = getFactionColor(character.card.faction_code);
          return (
            <CharacterContainer
              key={`${character.card.name}${characterIndex}`}
              style={{ backgroundColor: color }}
            >
              <Title>{character.card.name}</Title>
              {character.card.subtitle && (
                <SubTitle>{character.card.subtitle}</SubTitle>
              )}
              <Column>
                <ImageContainer>
                  {character.card.has_die && (
                    <DiceContainer>
                      {character.count}
                      <DiceIcon />
                    </DiceContainer>
                  )}
                </ImageContainer>
                <PointsRowContainer>
                  {character.pointsArray.map((points, pointsIndex) => {
                    return (
                      <PointsButton
                        key={`${character.card.name}${characterIndex}${pointsIndex}`}
                        onClick={() => {
                          adjustPoints(characterIndex, pointsIndex + 1);
                        }}
                        value={points}
                        readOnly
                        defaultChecked={character.count - 1 === pointsIndex}
                      />
                    );
                  })}
                </PointsRowContainer>
              </Column>
            </CharacterContainer>
          );
        })}
      </CharacterRow>
    </div>
  );
};

export default Characters;
