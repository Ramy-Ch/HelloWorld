import React, { useState } from "react";
function barre() {
    const [tâches, setTâches]= useState([]);
    const [newTâches, setNewTâches]=useState('');

    function ajoutTâche(){
        if (newTâches){
            setTâches
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
    </div>
)

export default barre;