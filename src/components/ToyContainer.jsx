import React from "react";
import ToyCard from "./ToyCard";

function ToyContainer({ toys, onToyUpdated, onToyDeleted }) {
  return (
    <div id="toy-collection">
      {toys.map((toy) => (
        <ToyCard
          key={toy.id}
          toy={toy}
          onToyUpdated={onToyUpdated}
          onToyDeleted={onToyDeleted}
        />
      ))}
    </div>
  );
}

export default ToyContainer;
