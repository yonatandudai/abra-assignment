import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import './App.css';
import CreationPage from "./components/CreationPage";
import PlacesPage from "./components/PlacesPage";

function App() {



  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<CreationPage />}/>
        <Route path="/places" element={<PlacesPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
