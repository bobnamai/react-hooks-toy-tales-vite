import React from "react";

function ToyCard({ toy, onToyUpdated, onToyDeleted }) {
  
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

   const donateToy = () => {
    fetch(`http://localhost:3001/toys/${toy.id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to delete toy: ${response.status}`);
        }
        onToyDeleted(toy.id);
      })
      .catch((error) => console.error("Error deleting toy:", error));
    
  }


 

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
      <button className="del-btn" onClick={donateToy}>Donate to GoodWill</button>
    </div>
  );
}

export default ToyCard;
