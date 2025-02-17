import { useState } from "react";

function Barre() {
  const [tâches, setTâches] = useState([]);
  const [newTâche, setNewTâche] = useState(""); 

  function ajoutTâche() {
    if (newTâche.trim() === "") return;

    const nouvelleTâche = {
      number: Date.now(),
      name: newTâche,
      completed: false
    };

    setTâches([...tâches, nouvelleTâche]);
    setNewTâche(""); 
  }

  function toggleTâche(number) {
    setTâches(
      tâches.map((tâche) => {
        if (tâche.number === number) {
          return { ...tâche, completed: !tâche.completed };
        }
        return tâche;
      })
    );
  }

  return (
    <div>
      <h1>To-Do List</h1>
      <input
        type="text"
        value={newTâche}
        onChange={(e) => setNewTâche(e.target.value)}
        placeholder="Ajoutez une tâche"
      />
      <button onClick={ajoutTâche}>Ajouter</button>
      <ul>
        {tâches.map((tâche) => (
          <li 
            key={tâche.number} 
            style={{ textDecoration: tâche.completed ? "line-through" : "none" }}
          >
            <input
              type="checkbox"
              checked={tâche.completed}
              onChange={() => toggleTâche(tâche.number)}
            />
            {tâche.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Barre;
