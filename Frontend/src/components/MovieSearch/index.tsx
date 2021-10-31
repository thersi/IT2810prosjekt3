import { useState } from "react";
import MovieAppBar from "../MovieAppBar";
import GenreTabs from "../GenreTabs";
import "./style.css";
import { useQuery } from "@apollo/client";
import MovieList from "../MovieList";
import {
  QueryMoviesInput,
  QueryMoviesResult,
} from "../../Interfaces/Interfaces";
import { QUERY_ALL_MOVIES } from "../../Queries/queries";

const MovieSearch = () => {
  const [genreValue, setGenre] = useState<string>("");
  const [sortValue, setSort] = useState<number>(1);
  const [filterValue, setFilter] = useState<string>("");
  const [searchValue, setSearch] = useState<string>("");
  let handleGenre = (value: string) => {
    setGenre(value);
  };

  const handleSort = (value: boolean) => {
    setSort(value ? 1 : -1);
  };

  const handleFilter = (value: string) => {
    setFilter(value);
  };
  const handleSearch = (value: string) => {
    setSearch(value);
  };

  const { data, loading } = useQuery<QueryMoviesResult, QueryMoviesInput>(
    QUERY_ALL_MOVIES,
    {
      variables: {
        filterGenre: genreValue,
        limit: 10,
        page: 1,
        order: sortValue,
        sortOn: filterValue,
        word: searchValue,
      },
    }
  );

  return (
    <div>
      <MovieAppBar
        handleSearch={handleSearch}
        handleSort={handleSort}
        handleFilter={handleFilter}
      />
      <GenreTabs handleGenre={handleGenre} />
      {loading || typeof data === "undefined" ? (
        <p>loading...</p>
      ) : (
        <MovieList data={data} />
      )}
    </div>
  );
};

export default MovieSearch;
