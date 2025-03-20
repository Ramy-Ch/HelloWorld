import React from "react";
import { Routes, Route } from "react-router-dom";
import ToDoList from "./ToDoList";
import Navbar from "./Navbar";
import Calculator from "./Calculator";
import "./index.css";
import Chronometer from "./Chronometer";
import Banner from "./Banner";
import GeoLocalisation from "./GeoLocalisation";

function App() {
  return (
    <div>
      <Navbar />
      <Banner /> 
      <div className="flex items-center justify-center h-screen">
        <Routes>
          <Route path="/" element={<div className="main-content"><h1>Bienvenue</h1></div>} />
          <Route path="/ToDoList" element={<ToDoList />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/chronometer" element={<Chronometer />} />
          <Route path="/geolocation" element={<GeoLocalisation />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
