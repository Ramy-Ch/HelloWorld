import React, { useState } from 'react';
import './App.css';

function Barre() {
  const [tâches, setTâches] = useState([]);
  const [newTâches, setNewTâches] = useState('');

  function ajoutTâche() {
    if (newTâches) {
      setTâches([...tâches, newTâches]);
      setNewTâches('');
    }
  }

  return (
    <div>
      <h1>T0dolist</h1>
      <input
        type="text"
        value={newTâches}  
        onChange={(e) => setNewTâches(e.target.value)}
        placeholder="Ajoutez une tâche"
      />
      <button onClick={ajoutTâche}>Ajouter</button>
      <ul>
        {tâches.map((tache, index) => (
          <li key={index}>{tache}</li>
        ))}
      </ul>
    </div>
  );
}

export default Barre;
