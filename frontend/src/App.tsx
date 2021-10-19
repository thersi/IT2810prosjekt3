import React from "react";
import logo from "./logo.svg";
import "./App.css";
import MovieScroll from "./components/MovieScroll";
import MovieSearch from "./components/MovieSearch";

function App() {
  return (
    <div>
      <MovieSearch />
      <MovieScroll />
    </div>
  );
}

export default App;
