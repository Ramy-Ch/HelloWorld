import React, { useState } from "react";
import FilterButtons from "./FilterButtons";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ItemType = 'TASK';

function ToDoList() {
  const [taches, setTaches] = useState([]);
  const [newTache, setNewTache] = useState("");
  const [priorite, setPriorite] = useState(false);
  const [filtre, setFiltre] = useState("all");

  function capitalizeFirstLetter(texte) {
    if (!texte) return texte;
    return texte.charAt(0).toUpperCase() + texte.slice(1).toLowerCase();
  }

  function ajout() {
    if (newTache.trim() === "") return;

    const capitalizedTask = capitalizeFirstLetter(newTache);
    const newTaches = [
      ...taches,
      { id: Date.now(), text: capitalizedTask, fait: false, prioritaire: priorite }
    ];

    setTaches(newTaches);
    setNewTache("");
    setPriorite(false);
  }

  function togglePriorite(id) {
    setTaches(taches.map((tache) =>
      tache.id === id ? { ...tache, prioritaire: !tache.prioritaire } : tache
    ));
  }

  function deleteTache(id) {
    setTaches(taches.filter((tache) => tache.id !== id));
  }

  function toggleFait(id) {
    setTaches(taches.map((tache) =>
      tache.id === id ? { ...tache, fait: !tache.fait } : tache
    ));
  }

  const moveTask = (fromIndex, toIndex) => {
    const updatedTaches = [...taches];
    const [movedTask] = updatedTaches.splice(fromIndex, 1);
    updatedTaches.splice(toIndex, 0, movedTask);
    setTaches(updatedTaches);
  };

  const TaskRow = ({ tache, index }) => {
    const [, drag] = useDrag(() => ({
      type: ItemType,
      item: { index },
    }));

    const [, drop] = useDrop(() => ({
      accept: ItemType,
      hover: (item) => {
        if (item.index !== index) {
          moveTask(item.index, index);
          item.index = index;
        }
      },
    }));

    return (
      <tr
        ref={(node) => drag(drop(node))}
        style={{
          background: tache.prioritaire ? "#ffdddd" : "white",
          cursor: "move"
        }}
      >
        <td style={{ textDecoration: tache.fait ? "line-through" : "none" }}>
          {tache.text}
        </td>
        <td>{tache.fait ? "🙆" : "🙅"}</td>
        <td>
          <button onClick={() => togglePriorite(tache.id)}>
            {tache.prioritaire ? "🏆" : "Marquer comme Prioritaire"}
          </button>
        </td>
        <td>
          <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center" }}>
            <button onClick={() => toggleFait(tache.id)}>✔</button>
            <button
              onClick={() => deleteTache(tache.id)}
              style={{ backgroundColor: "red", color: "white", border: "none", padding: "0.3125rem", cursor: "pointer" }}
            >
              ❌
            </button>
          </div>
        </td>
      </tr>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ padding: "5rem 1.25rem" }}>
        <h2>Todolist</h2>
        <input
          type="text"
          value={newTache}
          onChange={(e) => setNewTache(e.target.value)}
          placeholder="Ajouter une tâche"
          className="border p-2 rounded w-full"
        />
        <button
          onClick={ajout}
          className="bg-blue-500 text-white p-2 rounded ml-2"
        >🖱️</button>

        <FilterButtons setFiltre={setFiltre} />

        <div style={{ maxHeight: "18.75rem", overflowY: "auto", marginTop: "0.625rem" }}>
          <table border="1" width="100%">
            <thead>
              <tr>
                <th>Tâche</th>
                <th>Statut</th>
                <th>Priorité</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {taches
                .filter(tache => {
                  if (filtre === "completed") return tache.fait;
                  if (filtre === "pending") return !tache.fait;
                  return true;
                })
                .map((tache, index) => (
                  <TaskRow key={tache.id} index={index} tache={tache} />
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </DndProvider>
  );
}

export default ToDoList;
