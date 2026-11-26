import React from "react";

function ToyCard({ toy, onToyUpdated }) {
  
  const increaseLikes = () => {
    fetch(`http://localhost:3001/toys/${toy.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes: toy.likes + 1 }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to update likes: ${response.status}`);
        }
        return response.json();
      })
      .then(onToyUpdated)
      .catch((error) => console.error("Error updating likes:", error));
  };

  return (
    <div className="card" data-testid="toy-card">
      <h2>{toy.name}</h2>
      <img
        src={toy.image}
        alt={toy.name}
        className="toy-avatar"
      />
      <p>{toy.likes} Likes </p>
      <button className="like-btn" onClick={increaseLikes}>Like {"<3"}</button>
      <button className="del-btn">Donate to GoodWill</button>
    </div>
  );
}

export default ToyCard;
