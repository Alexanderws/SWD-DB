import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

import { getDecks } from "../../api/fireBase";

const DeckList = () => {
  const { isLoading, isError, data: decks } = useQuery("decks", getDecks);

  if (isError) {
    return <div>SÅRRI BÅRRI</div>;
  }

  if (isLoading) {
    return <div>VENT...</div>;
  }

  console.log("data:", decks);

  return (
    <div>
      <h1>Your decks</h1>
      {decks?.map((deck) => {
        console.log("deck:", deck);
        return <p>{deck.name}</p>;
      })}
      <div>
        <Link to="/deck">Create new deck</Link>
      </div>
    </div>
  );
};

export default DeckList;
