import { useState } from "react";
import MovieScroll from "../MovieScroll";
import MovieFilter from "../MovieFilter";
import SearchBar from "../SearchBar";
import MovieAppBar from "../MovieAppBar";
import GenreTabs from "../GenreTabs";
//APolloklient
const MovieSearch = (props: any) => {
  return (
    <div>
      <MovieAppBar />
      <GenreTabs />
      <MovieScroll />
    </div>
  );
};

export default MovieSearch;
