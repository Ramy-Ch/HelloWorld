import React, { useState } from "react";

const GeoLocalisation = () => {
  const [city, setCity] = useState("");
  const [location, setLocation] = useState(null);
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = async (event) => {
    const value = event.target.value;
    setCity(value);

    if (value.trim()) {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(
            value
          )}&format=json&limit=5`
        );
        const data = await response.json();
        setSuggestions(data);
      } catch (err) {
        setError("Erreur lors de la récupération des suggestions.");
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSearch = async () => {
    if (!city.trim()) {
      setError("Veuillez entrer une ville.");
      return;
    }
    setError("");

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(
          city
        )}&format=json`
      );
      const data = await response.json();

      if (data.length > 0) {
        setLocation({
          latitude: data[0].lat,
          longitude: data[0].lon,
        });
      } else {
        setError("Ville non trouvée.");
        setLocation(null);
      }
    } catch (err) {
      setError("Erreur lors de la récupération des données.");
      setLocation(null);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setCity(suggestion.display_name);
    setSuggestions([]);
  };

  return (
    <div className="geolocation-container">
      <h2>Géolocalisation</h2>
      <input
        type="text"
        value={city}
        onChange={handleInputChange}
        placeholder="Entrez une ville"
      />
      <button onClick={handleSearch}>Rechercher</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {suggestions.length > 0 && (
        <ul style={{ border: "1px solid #ccc", maxHeight: "150px", overflowY: "auto" }}>
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              style={{ cursor: "pointer", padding: "5px" }}
            >
              {suggestion.display_name}
            </li>
          ))}
        </ul>
      )}
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
