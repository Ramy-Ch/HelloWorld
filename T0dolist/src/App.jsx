import React from "react";
import { Routes, Route } from "react-router-dom";
import ToDoList from "./ToDoList";
import Navbar from "./Navbar";
import Calculator from "./Calculator";
import Chronometer from "./Chronometer";
import GeoLocalisation from "./GeoLocalisation";
import Banner from "./Banner";

function App() {
  return (
    <div>
      <Navbar />
      <Banner />
      <div className="main-container">
        <Routes>
          <Route path="/" element={<div className="main-content"><h1>Bienvenue</h1></div>} />
          <Route path="/ToDoList" element={<ToDoList />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/chronometer" element={<Chronometer />} />
          <Route path="/geoLocalisation" element={<GeoLocalisation />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
