import React from "react";
import { useState, useEffect } from "react";

import ToyCard from "./ToyCard";

function ToyContainer() {
  const [toys, setToys] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((response) => response.json())
      .then((data) => setToys(data));
  }, []);

  function handleToyUpdated(updatedToy) {
    setToys((currentToys) =>
      currentToys.map((toy) =>
        toy.id === updatedToy.id ? updatedToy : toy
      )
    );
  }

  function handleToyDeleted(deletedToyId) {
    setToys((currentToys) =>
      currentToys.filter((toy) => toy.id !== deletedToyId)
    );
  }

  return (
    <div id="toy-collection">
      {toys.map((toy) => (
        <ToyCard
          key={toy.id}
          toy={toy}
          onToyUpdated={handleToyUpdated}
          onToyDeleted={handleToyDeleted}
        />
      ))}
    </div>
  );
}

export default ToyContainer;
