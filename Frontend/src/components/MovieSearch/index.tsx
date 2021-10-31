import { useState } from "react";
import MovieAppBar from "../MovieAppBar";
import GenreTabs from "../GenreTabs";
import "./style.css";
import { useQuery, gql } from "@apollo/client";
import MovieList from "../MovieList";
import { Movie } from "../../Interfaces"

  const QUERY_ALL_MOVIES = gql`
    query (
      $filterGenre: String!
      $limit: Int!
      $page: Int!
      $order: Int!
      $sortOn: String!
      $word: String!
    ) {
      searchAndFilter(
        filterGenre: $filterGenre
        limit: $limit
        page: $page
        order: $order
        sortOn: $sortOn
        word: $word
      ) {
        _id
        title
        year
        thumbsUp
        thumbsDown
        poster
      }
    }
  `
  export interface QueryMoviesResult {
    searchAndFilter: Movie[];
  }

  interface QueryMoviesInput {
    filterGenre: string;
    limit: number;
    page: number;
    order: number;
    sortOn: string;
    word: string;
  }

const MovieSearch = () => {
  const [searchValue, setSearch] = useState<string>("");

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  const { data, loading } = useQuery<QueryMoviesResult, QueryMoviesInput>(QUERY_ALL_MOVIES, {
    variables: {
      filterGenre: "",
      limit: 10,
      page: 1,
      order: 1,
      sortOn: "year",
      word: searchValue,
    },
  });

  if (loading || typeof data === 'undefined') {
    return <p>Loading...</p>
  }

  return (
    <div>
      <MovieAppBar handleSearch={handleSearch} />
      <GenreTabs />
      {<MovieList data={data} />}
    </div>
  );
};

export default MovieSearch;
