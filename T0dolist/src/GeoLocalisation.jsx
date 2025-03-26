import { useState } from "react";
import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from "@geoapify/react-geocoder-autocomplete";

const GeoLocalisation = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState("");
  const [city, setCity] = useState("");

  const API_KEY = "61da4cbff54d4c8d9c92cba1462f7047";

  const handlePlaceSelect = (value) => {
    if (value && value.properties) {
      setCity(value.properties.formatted);
      setLocation({
        latitude: value.geometry.coordinates[1],
        longitude: value.geometry.coordinates[0],
      });
    }
  };

  const handleReverseGeocode = async () => {
    if (!location) {
      setError("Aucune coordonnée fournie.");
      return;
    }
    setError("");

    try {
      const response = await fetch(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${location.latitude}&lon=${location.longitude}&apiKey=${API_KEY}`
      );
      const data = await response.json();

      if (data.features && data.features.length > 0) {
        setCity(data.features[0].properties.formatted);
      } else {
        setError("Aucune ville trouvée pour ces coordonnées.");
      }
    } catch (err) {
      setError("Erreur lors de la récupération des données.");
    }
  };

  const handleReset = () => {
    setCity("");
    setLocation(null);
    setError("");
  };

  return (
    <div className="geolocation-container">
      <h2>Géolocalisation</h2>
      <GeoapifyContext apiKey={API_KEY}>
        <GeoapifyGeocoderAutocomplete placeSelect={handlePlaceSelect} />
      </GeoapifyContext>
      <button onClick={handleReverseGeocode}>Trouver la ville</button>
      <button onClick={handleReset}>Réinitialiser</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {city && <p>Ville: {city}</p>}
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
