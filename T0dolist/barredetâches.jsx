import React, { useState } from "react";
function barre() {
    const [tâches, setTâches]= useState([]);
    const [newTâches, setNewTâches]=useState('');

    function ajoutTâche(){
        if (newTâches){
            setTâches([...tâches, newTâches]);
            setNewTâches('')
        }
    }
}

return (
    <div>
        <h1>T0dolist</h1>
        <input type= "text"
        Value={newTâches}
        onChange={(e)=>setNewTâches(e.target.value)}
        placeholder="Ajoutez une tâche"
        />
        <button onClick={ajoutTâche}>Add</button>
        <ul>
        {taches.map((tache, index) => (
          <li key={index}>{tache}</li>
        ))}
      </ul>
    </div>
)

export default barre;