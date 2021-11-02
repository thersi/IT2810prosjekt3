import { useState } from "react";
import MovieAppBar from "../MovieAppBar";
import GenreTabs from "../GenreTabs";
import "./style.css";
import { useQuery } from "@apollo/client";
import MovieList from "../MovieList";
import Pagination from "@mui/material/Pagination";
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
  const [page, setPage] = useState<number>(1);
  const limit: number = 5;

  /* The below functions are used to determine values sent in to query*/
  const handleGenre = (value: string) => {
    setGenre(value);
    setPage(1);
  };

  const handleSort = (value: boolean) => {
    setSort(value ? 1 : -1);
  };

  const handleFilter = (value: string) => {
    setFilter(value);
    setPage(1);
  };
  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };
  /* Calls on query, getting values defined in child components */
  const { data, loading, refetch } = useQuery<
    QueryMoviesResult,
    QueryMoviesInput
  >(QUERY_ALL_MOVIES, {
    variables: {
      filterGenre: genreValue,
      limit: limit,
      page: page,
      order: sortValue,
      sortOn: filterValue,
      word: searchValue,
    },
  });

  return (
    <div>
      {/* Send in props to child components so that they can send user selected info back to parent */}
      <MovieAppBar
        aria-label={"App Bar"}
        aria-required="true"
        handleSearch={handleSearch}
        handleSort={handleSort}
        handleFilter={handleFilter}
      />
      <GenreTabs
        aria-label={
          "A markdown menu with all movie genres, used for filtering movies by genre."
        }
        aria-required="true"
        handleGenre={handleGenre}
      />
      {loading ||
      typeof data ===
        "undefined" /* If query data is being loaded or is undefined */ ? (
        <p>Loading...</p>
      ) : (
        <div>
          <MovieList data={data.searchAndFilter.movies} refetch={refetch} />
          <Pagination
            className="pagination"
            count={Math.ceil(data.searchAndFilter.pages / limit)}
            defaultPage={page}
            showFirstButton
            showLastButton
            onChange={(event, value) => {
              setPage(value);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default MovieSearch;
