import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import "./App.css";
import Home from "./pages/home/Home";
import Nav from "./core/nav/Nav";
import Characters from "./pages/characters/Characters";
import Movies from "./pages/movies/Movies";
import Abilities from "./pages/abilities/Abilities";
import Doc from "./pages/doc/Doc";
import Authors from "./pages/authors/Authors";

function App() {
  return (
    <>
      <Router>
        <Nav />
        <Routes>  
          <Route path="/" element={<Home />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/abilities" element={<Abilities />} />
          <Route path="/doc" element={<Doc/>} />
          <Route path="/author" element={<Authors />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
