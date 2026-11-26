import React from "react";

function ToyForm({ onAddToy }) {
  const [name, setName] = React.useState("");
  const [image, setImage] = React.useState("");
  const [error, setError] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !image) {
      alert("Please fill in all fields.");
      return;
    }

    const newToy = {
      name,
      image,
      likes: 0,
    };

    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newToy),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to add toy: ${response.status}`);
        }
        return response.json();
      })
      .then((addedToy) => {
        onAddToy(addedToy);
        setName("");
        setImage("");
        setError("");
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="add-toy-form">
        <h3>Create a toy!</h3>
        <input
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          className="input-text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <input
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          className="input-text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <br />
        {error && <p role="alert">{error}</p>}
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
        />
      </form>
    </div>
  );
}

export default ToyForm;
