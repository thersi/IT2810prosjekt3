import { useQuery, gql } from "@apollo/client";
import { Movie } from "../../Interfaces";
import SingleDisplay from "../SingleDisplay";
import "./style.css";

const MovieList = (search: any) => {
  console.log(search);
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

  const { loading, error, data } = useQuery(QUERY_ALL_MOVIES, {
    variables: { limit: 10, page: 1, order: 1, sortOn: "year" },
  });
  /* const { loadingTitle, errorTitle, dataTitle } = useQuery(
    QUERY_MOVIE_BYTITLE,
    {
      variables: { title: search },
    }
  ); */

  if (loading) return <p>Loading ...</p>;
  return (
    <div className="MovieContainer">
      {data.movies.map((movie: Movie) => (
        <SingleDisplay {...movie} />
      ))}
    </div>
  );
};

export default MovieList;
