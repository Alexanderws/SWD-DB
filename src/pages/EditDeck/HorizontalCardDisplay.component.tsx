import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { COLOR, FONT_SIZE } from "../../assets/constants";
import { getFactionColor } from "../../assets/utils";
import { Card } from "../../types/index";
import { getImageUrl } from "../../api/fireBase";

import { Heading3, Column } from "../../components/Common.component";

const CardContainer = styled.div`
  min-height: 90px;
  min-width: 170px;
  background-color: ${COLOR.grayFaction};
  border-radius: 4px;
  padding: 4px;
`;

const ImageContainer = styled.div<{ horizontal: boolean }>`
  background-size: ${({ horizontal }) =>
    horizontal ? "244px 175px" : "175px 244px"};
  background-position: ${({ horizontal }) =>
    horizontal ? "-42px -36px" : "-6px -20px"};
  background-color: transparent;
  border: 2px solid white;
  border-radius: 4px;
  height: 100%;
  width: 100%;
  position: relative;
`;

const TitleContainer = styled.div`
  height: 20px;
  border-radius: 4px 0 4px 0;
  background-color: white;
  position: absolute;
  bottom: -2px;
  right: -2px;
  display: flex;
  padding: 0 4px;
  font-size: ${FONT_SIZE.small};
  justify-content: space-between;
  align-items: center;
  line-height: 20px;
  font-weight: 600;
`;

const HorizontanCardDisplay: React.FC<{ card?: Card }> = ({ card }) => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (card) {
      getImageUrl(card.set_code, card.code).then((url) => {
        setImageUrl(url);
      });
    }
  }, [card]);

  return (
    <Column style={{ alignItems: "flex-end" }}>
      <Heading3>{card?.type_code.toUpperCase() ?? "BATTLEFIELD"}</Heading3>
      <CardContainer
        style={{
          backgroundColor: card?.faction_code
            ? getFactionColor(card.faction_code)
            : "rgba(0, 0, 0, 0.1)",
        }}
      >
        <ImageContainer
          horizontal={card?.type_code === "battlefield"}
          style={{ backgroundImage: `url(${imageUrl})` }}
        >
          {card?.name && <TitleContainer>{card.name}</TitleContainer>}
        </ImageContainer>
      </CardContainer>
    </Column>
  );
};

export default HorizontanCardDisplay;
