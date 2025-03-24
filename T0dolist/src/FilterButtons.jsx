  import React from "react";

function FilterButtons({ setFiltre }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginBottom: "1.25rem" }}>
      <button 
        onClick={() => setFiltre("all")} 
        style={{ padding: "0.625rem 1.25rem", backgroundColor: "lightblue", border: "none", cursor: "pointer", borderRadius: "0.25rem" }}
      >
        Toutes
      </button>
      <button 
        onClick={() => setFiltre("completed")} 
        style={{ padding: "0.625rem 1.25rem", backgroundColor: "lightgreen", border: "none", cursor: "pointer", borderRadius: "0.25rem" }}
      >
        Complétées
      </button>
      <button 
        onClick={() => setFiltre("pending")} 
        style={{ padding: "0.625rem 1.25rem", backgroundColor: "lightcoral", border: "none", cursor: "pointer", borderRadius: "0.25rem" }}
      >
        En cours
      </button>
    </div>
  );
}

export default FilterButtons;
