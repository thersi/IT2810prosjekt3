import { useState } from "react";
import MovieFilter from "../MovieFilter";
import SearchBar from "../SearchBar";
import MovieAppBar from "../MovieAppBar";
import GenreTabs from "../GenreTabs";
import "./style.css";
import { useQuery, gql } from "@apollo/client";
import MovieList from "../MovieList";
import { LocalDiningTwoTone } from "@mui/icons-material";

const MovieSearch = (props: any) => {
  const [searchValue, setSearch] = useState<any>("");
  let handleSearch = (value: any) => {
    setSearch(value);
  };

  const QUERY_ALL_CONTAINS_SEARCH = gql`
    query (
      $limit: Int!
      $page: Int!
      $word: String!
      $order: Int!
      $sortOn: String!
    ) {
      containsString(
        limit: $limit
        page: $page
        word: $word
        order: $order
        sortOn: $sortOn
      ) {
        _id
        title
        year
        thumbsUp
        thumbsDown
      }
    }
  `;
  const QUERY_ALL_MOVIES = gql`
    query ($limit: Int!, $page: Int!, $order: Int!, $sortOn: String!) {
      movies(limit: $limit, page: $page, order: $order, sortOn: $sortOn) {
        _id
        title
        year
        thumbsUp
        thumbsDown
      }
    }
  `;

  let query = useQuery(QUERY_ALL_MOVIES, {
    skip: searchValue !== "",
    variables: {
      limit: 10,
      page: 1,
      order: 1,
      sortOn: "year",
    },
  });
  let sorting = "all";
  if (searchValue !== "") {
    query = useQuery(QUERY_ALL_CONTAINS_SEARCH, {
      variables: {
        limit: 10,
        page: 1,
        word: searchValue,
        order: 1,
        sortOn: "year",
      },
    });
    sorting = "search";
  }
  let data = query.data;
  let loading = query.loading;
  return (
    <div>
      <MovieAppBar handleSearch={handleSearch} />
      <GenreTabs />
      {<MovieList loading={loading} data={data} sorting={sorting} />}
    </div>
  );
};

export default MovieSearch;
