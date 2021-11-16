import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";

import { ModalContext } from "../context/Modal.context";
import { SEMANTIC_COLOR, Z_INDEX } from "../assets/constants";
import { getImageUrl } from "../api/fireBase";

const Container = styled.div`
  top: 20%;
  left: 20%;
  width: 400px;
  position: fixed;
  z-index: ${Z_INDEX.modal};
  padding: 16px;
  background-color: ${SEMANTIC_COLOR.background};
  color: ${SEMANTIC_COLOR.textDark};
  box-shadow: 0 2px 6px 1px rgba(50, 50, 50, 0.5);
`;

const ImageContainer = styled.div`
  background-size: 175px 244px;
  background-position: -38px -36px;
  background-color: transparent;
  border: 2px solid white;
  border-radius: 4px;
  height: 100px;
  width: 100px;
  margin: 8px 0;
  position: relative;
`;

const CardModal: React.FC = () => {
  const [imageUrl, setImageUrl] = useState("");
  const { isVisible, cardToShow } = useContext(ModalContext);

  useEffect(() => {
    if (cardToShow.name.length > 0) {
      getImageUrl(cardToShow.set_code, cardToShow.code).then((url) => {
        setImageUrl(url);
      });
    } else {
      setImageUrl("");
    }
  }, [cardToShow]);

  if (isVisible) {
    return (
      <Container>
        <h2>{cardToShow.name}</h2>
        <ImageContainer style={{ backgroundImage: `url(${imageUrl})` }} />

        <p>{cardToShow.text}</p>
      </Container>
    );
  } else {
    return null;
  }
};

export default CardModal;
