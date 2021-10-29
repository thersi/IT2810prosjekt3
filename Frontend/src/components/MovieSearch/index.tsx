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
  const [genreValue, setGenre] = useState<any>("");
  const [sortValue, setSort] = useState<any>(1);
  const [filterValue, setFilter] = useState<any>("");
  let handleSearch = (value: any) => {
    setSearch(value);
  };
  let handleGenre = (value: any) => {
    setGenre(value);
  };

  const handleSort = (value: any) => {
    setSort(value ? 1 : -1);
  };

  const handleFilter = (value: any) => {
    setFilter(value);
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
      filterGenre: genreValue,
      limit: 10,
      page: 1,
      order: sortValue,
      sortOn: filterValue,
      word: searchValue,
    },
  });


  return (
    <div>
      <MovieAppBar
        handleSearch={handleSearch}
        handleSort={handleSort}
        handleFilter={handleFilter}
      />
      <GenreTabs handleGenre={handleGenre} />
      {data !== undefined && data.searchAndFilter.length > 0 ? (
        <MovieList loading={loading} data={data} />
      ) : (
        <p>No movies to show</p>
      )}
    </div>
  );
};

export default MovieSearch;
