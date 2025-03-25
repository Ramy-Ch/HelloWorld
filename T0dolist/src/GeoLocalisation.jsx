import React, { useState } from "react";

const GeoLocalisation = () => {
  const [city, setCity] = useState("");
  const [location, setLocation] = useState(null);
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const API_KEY = "14a00ee02c7349a4a71723aec70a0b6a";

  const handleInputChange = async (event) => {
    const value = event.target.value;
    setCity(value);

    if (value.trim()) {
      try {
        const response = await fetch(
          `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
            value
          )}&apiKey=${API_KEY}`
        );
        const data = await response.json();

        if (data.features) {
          setSuggestions(data.features);
        }
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
        `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
          city
        )}&apiKey=${API_KEY}`
      );
      const data = await response.json();

      if (data.features && data.features.length > 0) {
        setLocation({
          latitude: data.features[0].geometry.coordinates[1],
          longitude: data.features[0].geometry.coordinates[0],
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
    setCity(suggestion.properties.formatted);
    setSuggestions([]);
  };

  const handleReset = () => {
    setCity("");
    setLocation(null);
    setError("");
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
      <button onClick={handleReset}>Réinitialiser</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {suggestions.length > 0 && (
        <ul style={{ border: "1px solid #ccc", maxHeight: "150px", overflowY: "auto" }}>
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              style={{ cursor: "pointer", padding: "5px" }}
            >
              {suggestion.properties.formatted}
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