import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import Genres from "./pages/Genres";
import Genre from "./pages/Genre";
import Search from "./pages/Search";
import Details from "./pages/Anime";
import Play from "./pages/Play";

let prevPos = 0;
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  const currentPos = window.scrollY;

  if(currentPos < prevPos) {
    nav!.style.top = '0';
  } else {
    nav!.style.top = '-5rem';
  }

  prevPos = currentPos;
})

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <nav>
      <div className="brand">
        <a href="/">Samehadaku</a>
        <div className="underline"></div>
      </div>
    </nav>
    <div id="content">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/search/:query" element={<Search />} />
          <Route path="/genre" element={<Genres />} />
          <Route path="/genre/:slug" element={<Genre />} />
          <Route path="/anime" element={<Details />} />
          <Route path="/anime/:id" element={<Details />} />
          <Route path="/play" element={<Play />} />
          <Route path="/play/:id" element={<Play />} />
        </Routes>
      </HashRouter>
    </div>
  </React.StrictMode>
);
