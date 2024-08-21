import React, { useState,useEffect } from "react"
import Home from "./components/Home";
import SeedForm from "./components/SeedForm";
import { Route, Routes } from "react-router-dom";
import "./App.css"


function App() {

  return (
    <Routes>
      <Route path="/" element={<Home  />}/>
      <Route path="/import" element={<SeedForm  />} />
    </Routes>
  );
}

export default App;
