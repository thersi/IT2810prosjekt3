import { useState } from "react";
import MovieScroll from "../MovieScroll";
import MovieFilter from "../MovieFilter";
import SearchBar from "../SearchBar";
import MovieAppBar from "../MovieAppBar";
const MovieSearch = (props: any) => {
  return (
    <div>
      <MovieAppBar />
      <MovieScroll />
    </div>
  );
};

export default MovieSearch;
