import React, { useEffect, useState } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load toys: ${response.status}`);
        }
        return response.json();
      })
      .then(setToys)
      .catch((error) => console.error("Error loading toys:", error));
  }, []);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  function handleToyAdded(newToy) {
    setToys((currentToys) => [...currentToys, newToy]);
  }

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
    <>
      <Header />
      {showForm ? <ToyForm onAddToy={handleToyAdded} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer
        toys={toys}
        onToyUpdated={handleToyUpdated}
        onToyDeleted={handleToyDeleted}
      />
    </>
  );
}

export default App;
