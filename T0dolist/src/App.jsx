import { useState } from "react";

function App() {
  const [tâches, setTâches] = useState([]);
  const [newTâches, setNewTâches] = useState("");

  const capitalizeFirstLetter = (texte) => {
    if (!texte) return texte;
    return texte.charAt(0).toUpperCase() + texte.slice(1).toLowerCase();
  };

  const ajout = () => {
    if (newTâches.trim() === "") return;

    const capitalizedTask = capitalizeFirstLetter(newTâches);

    const newTâche = tâches.slice();
    newTâche.push({ id: Date.now(), text: capitalizedTask, fait: false });

    setTâches(newTâche);

    setNewTâches("");
  };

  const deleteTâche = (id) => {
    setTâches(tâches.filter((tâche) => tâche.id !== id));
  };

  const toggleFait = (id) => {
    const updatedTâches = tâches.map((tâche) => {
      if (tâche.id === id) {
        return { ...tâche, fait: !tâche.fait };
      }
      return tâche;
    });
    setTâches(updatedTâches);
  };

  const trierParOrdreAlphabétique = () => {
    const sortedTasks = [...tâches].sort((a, b) => a.text.localeCompare(b.text));
    setTâches(sortedTasks);
  };

  return (
    <div>
      <h2>T0dolist</h2>
      <input
        type="text"
        value={newTâches}
        onChange={(e) => setNewTâches(e.target.value)}
        placeholder="Ajouter une tâche"
      />
      <button onClick={ajout}>🖱️</button>
      <button
        onClick={trierParOrdreAlphabétique}
        style={{
          border: "none",
          background: "lightgray",
          cursor: "pointer",
          padding: "8px",
          borderRadius: "4px",
          marginLeft: "10px",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      <ul>
        {tâches.map((tâche) => (
          <li
            key={tâche.id}
            style={{ textDecoration: tâche.fait ? "line-through" : "none" }}
          >
            {tâche.text}
            <button
              onClick={() => deleteTâche(tâche.id)}
              style={{
                border: "none",
                background: "none",
                cursor: "pointer",
                padding: "5px",
                marginLeft: "10px",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="red"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 6h18M5 6l1 14h12l1-14H5z" />
              </svg>
            </button>
            <button onClick={() => toggleFait(tâche.id)}>
              {tâche.fait
                ? "David Goggins is watching you 🥶"
                : "Mission accomplie 🏋️‍♂️"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;