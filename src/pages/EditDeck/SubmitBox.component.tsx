import React, { useContext } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router";

import { COLOR, FONT_SIZE, SEMANTIC_COLOR } from "../../assets/constants";
import { DeckContext } from "../../context/Deck.context";
import { FormatContext } from "../../context/Format.context";
import { Deck } from "../../types/index";

import { Heading3, Row } from "../../components/Common.component";
import ActionButton from "../../components/ActionButton.component";
import { saveDeck } from "../../api/fireBase";

const Container = styled.div`
  background-color: ${COLOR.blueFactionDark};
  color: ${SEMANTIC_COLOR.textBright};
  width: 100%;
  padding: 16px;
  border-radius: 0px;
  margin-top: 32px;
`;

const NameInput = styled.input`
  background-color: rgba(255, 255, 255, 0.1);
  border: none;
  font-family: "Open Sans", sans-serif;
  border-bottom: 2px solid ${SEMANTIC_COLOR.textBright};
  padding: 4px;
  color: ${SEMANTIC_COLOR.textBright};
  line-height: 28px;
  width: 100%;
  font-size: ${FONT_SIZE.large};
  font-weight: 600;
  margin-bottom: 16px;

  &:-webkit-autofill {
    box-shadow: none;
    -webkit-box-shadow: 0 0 0 30px rgba(255, 255, 255, 0.1) inset;
  }
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const FormatRowContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  flex-direction: row;
  height: 26px;
  display: flex;
  justify-content: space-between;
`;

const FormatButton = styled.button`
  border: none;
  height: 100%;
  width: 20%;
  display: inline-block;
  text-align: center;
  color: ${COLOR.white};
  margin: 0;
  font-weight: 500;
  cursor: pointer;
  background-color: transparent;

  :focus {
    outline: 1px solid ${COLOR.gray};
  }

  :hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  ${({ defaultChecked }) =>
    defaultChecked
      ? "background-color: rgba(255, 255, 255, 0.3); font-weight: 600; border-radius: 4px;"
      : ""};
`;

const SubmitBox: React.FC = () => {
  const { activeDeck, setFormat, setName, resetDeck } = useContext(DeckContext);
  const { allFormats } = useContext(FormatContext);

  const navigate = useNavigate();

  const handleSubmitClick = () => {
    // VALIDATE
    const deckToSave: Deck = {
      ...activeDeck,
      id: activeDeck.id.length === 0 ? uuidv4() : activeDeck.id,
    };
    saveDeck(deckToSave);
    resetDeck();
    navigate("/decks");
  };

  return (
    <Container>
      <Heading3 style={{ color: SEMANTIC_COLOR.textBright }}>
        DECK NAME
      </Heading3>
      <NameInput
        maxLength={60}
        name="deck-name"
        value={activeDeck.name}
        onChange={(event) => {
          setName(event.currentTarget.value);
        }}
      />
      <Heading3 style={{ color: SEMANTIC_COLOR.textBright }}>FORMAT</Heading3>
      <FormatRowContainer>
        {allFormats.map((format) => {
          return (
            <FormatButton
              key={format.code}
              onClick={() => {
                setFormat(format.code);
              }}
              value={format.name}
              defaultChecked={activeDeck.formatCode === format.code}
            >
              {format.name}
            </FormatButton>
          );
        })}
      </FormatRowContainer>
      <Row style={{ justifyContent: "space-between", marginTop: "48px" }}>
        <ActionButton type="cancel" onClick={() => {}}>
          CANCEL
        </ActionButton>
        <ActionButton onClick={handleSubmitClick}>SAVE DECK</ActionButton>
      </Row>
    </Container>
  );
};

export default SubmitBox;
