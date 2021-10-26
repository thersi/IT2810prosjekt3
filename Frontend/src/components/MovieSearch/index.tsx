import { useState } from "react";
import MovieFilter from "../MovieFilter";
import SearchBar from "../SearchBar";
import MovieAppBar from "../MovieAppBar";
import GenreTabs from "../GenreTabs";
import "./style.css";
import MovieList from "../MovieList";
//APolloklient
const MovieSearch = (props: any) => {
  const [searchValue, setSearch] = useState<any>("");

  let sendSearch = (value: any) => {
    setSearch(value);
  };

  return (
    <div>
      <MovieAppBar sendSearch={sendSearch} />
      <GenreTabs />
      <MovieList search={sendSearch} />
    </div>
  );
};

export default MovieSearch;
