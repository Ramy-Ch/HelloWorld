import React, { useState } from "react";

const GeoLocalisation = () => {
  const [city, setCity] = useState("");
  const [location, setLocation] = useState(null);
  const [error, setError] = useState("");

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  
  return (
    <div>
      <h2>Géolocalisation</h2>
      <input
        type="text"
        value={city}
        onChange={handleInputChange}
        placeholder="Entrez une ville"
      />
      <button onClick={handleSearch}>Rechercher</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {location && (
        <div>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
        </div>
      )}
    </div>
  );
};

export default GeoLocalisation;