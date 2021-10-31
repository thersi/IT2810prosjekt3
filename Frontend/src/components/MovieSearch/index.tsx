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
      movies {
        _id
        title
        year
        thumbsUp
        thumbsDown
        poster
      }
      pages
    }
  }
`;

const MovieSearch = () => {
  const [genreValue, setGenre] = useState<any>("");
  const [sortValue, setSort] = useState<any>(1);
  const [filterValue, setFilter] = useState<any>("");
  const [searchValue, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const limit: number = 10;

  let handleGenre = (value: string) => {
    setGenre(value);
    setPage(1)
  };

  const handleSort = (value: boolean) => {
    setSort(value ? 1 : -1);
  };

  const handleFilter = (value: string) => {
    setFilter(value);
    setPage(1)
  };
  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1)
  };

  const { data, loading } = useQuery<QueryMoviesResult, QueryMoviesInput>(
    QUERY_ALL_MOVIES,
    {
      variables: {
        filterGenre: genreValue,
        limit: limit,
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
        <div>
          <MovieList data={data.searchAndFilter.movies} />
          <Pagination className='pagination' count={ Math.ceil(data.searchAndFilter.pages / limit) } defaultPage={page} showFirstButton showLastButton
            onChange={(event, value) => {
              console.log(value)
              setPage(value)
              console.log(page)
            }} />
        </div>}


    </div>
  );
};

export default MovieSearch;
