import { useState } from "react";
import MovieAppBar from "../MovieAppBar";
import GenreTabs from "../GenreTabs";
import "./style.css";
import { useQuery, gql } from "@apollo/client";
import MovieList from "../MovieList";
import { Movie, QueryMoviesInput, QueryMoviesResult } from "../../Interfaces";
import Pagination from '@mui/material/Pagination';

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

const MovieSearch = () => {
  const [genreValue, setGenre] = useState<any>("");
  const [sortValue, setSort] = useState<any>(1);
  const [filterValue, setFilter] = useState<any>("");
  const [searchValue, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1)
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
        page: page,
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
      {(loading || typeof data === 'undefined') ?
        <p>Loading...</p> :
        <MovieList data={data} />}
      <Pagination count={10} showFirstButton showLastButton
        onChange={(event, value) => {
          console.log(value)
          setPage(value)
          console.log(page)
        }} />

    </div>
  );
};

export default MovieSearch;
