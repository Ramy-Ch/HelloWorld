import React, { useState } from "react";

const GeoLocalisation = () => {
  const [city, setCity] = useState("");
  const [location, setLocation] = useState(null);
  const [error, setError] = useState("");

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  const handleSearch = () => {
    if (city.length >= 3) {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY`)
        .then((response) => response.json())
        .then((data) => {
          if (data.cod === 200) {
            setLocation({
              latitude: data.coord.lat,
              longitude: data.coord.lon,
            });
            setError("");
          } else {
            setError("Ville non trouvée");
            setLocation(null);
          }
        })
        .catch(() => {
          setError("Erreur lors de la recherche");
          setLocation(null);
        });
    } else {
      setError("Veuillez entrer au moins 3 caractères");
      setLocation(null);
    }
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