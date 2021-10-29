import { useState } from "react";
import MovieFilter from "../MovieFilter";
import SearchBar from "../SearchBar";
import MovieAppBar from "../MovieAppBar";
import GenreTabs from "../GenreTabs";
import "./style.css";
import { useQuery, gql } from "@apollo/client";
import MovieList from "../MovieList";

const MovieSearch = (props: any) => {
  const [searchValue, setSearch] = useState<any>("");
  let handleSearch = (value: any) => {
    setSearch(value);
  };
  
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
  `;

  const { loading, error, data } = useQuery(QUERY_ALL_MOVIES, {
    variables: {
      filterGenre: "",
      limit: 10,
      page: 1,
      order: 1,
      sortOn: "year",
      word: searchValue,
    },
  });
  const sorting = "search";
  console.log(data);
  return (
    <div>
      <MovieAppBar handleSearch={handleSearch} />
      <GenreTabs />
      {<MovieList loading={loading} data={data} sorting={sorting} />}
    </div>
  );
};

export default MovieSearch;
