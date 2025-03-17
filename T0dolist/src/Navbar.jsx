import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="bg-[#4361EE] text-white p-4 flex justify-between items-center fixed top-0 left-0 w-full z-10 shadow-lg">
      <h1 className="ml-5 text-xl">TodoList V2</h1>
      <div className="mr-5">
        <button
          className="bg-white text-[#4361EE] p-2 rounded-md mx-2 font-semibold"
          onClick={() => navigate("/")}
        >
          🏠 Home
        </button>
        <button
          className="bg-white text-[#4361EE] p-2 rounded-md mx-2 font-semibold"
          onClick={() => navigate("/ToDoList")}
        >
          📝 Todolist
        </button>
        <button
          className="bg-white text-[#4361EE] p-2 rounded-md mx-2 font-semibold"
          onClick={() => navigate("/calculator")}
        >
          🧮 Calculatrice
        </button>
        <button
          className="bg-white text-[#4361EE] p-2 rounded-md mx-2 font-semibold"
          onClick={() => navigate("/chronometer")}
        >
          ⏱️ Chronomètre
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
