import React from "react";
import styled from "styled-components";

import { COLOR } from "../../assets/constants";
import { Deck, Card } from "../../types/index";

const CharacterContainer = styled.div`
  width: 140px;
  height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border-radius: 4px;
  align-items: center;
`;

const CharacterImage = styled.div`
  border-radius: 4px;
  height: 100px;
  width: 100px;
  background-color: gray;
`;

const CharacterTitle = styled.div`
  font-weight: 500;
  color: ${COLOR.white};
`;

const Characters: React.FC<{ characters: { card: Card; quantity: number }[] }> =
  ({ characters }) => {
    const getCardColor = (color: string) => {
      switch (color) {
        case "blue":
          return COLOR.blueDestiny;
          break;
        case "red":
          return COLOR.redDestiny;
          break;
        case "yellow":
          return COLOR.yellowDestiny;
          break;
        case "gray":
          return COLOR.grayDestiny;
          break;
        default:
          return COLOR.grayDestiny;
      }
    };

    return (
      <div>
        <h3>Characters</h3>
        {characters.map((character) => {
          const color = getCardColor(character.card.faction_code);
          return (
            <CharacterContainer style={{ backgroundColor: color }}>
              <CharacterTitle>{character.card.name}</CharacterTitle>
              <CharacterImage />
            </CharacterContainer>
          );
        })}
      </div>
    );
  };

export default Characters;
