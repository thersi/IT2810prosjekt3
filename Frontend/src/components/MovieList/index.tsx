import { useQuery, gql } from "@apollo/client";
import SingleDisplay from "../SingleDisplay";

const MovieList = (props: any) => {
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
    variables: { limit: 1, page: 4, order: 4, sortOn: "Year" },
  });
  if (loading) return <p>Loading ...</p>;
  return (
    <>
      {data.movies.map((movie: any) => (
        <SingleDisplay movie={movie} />
      ))}
    </>
  );
};

export default MovieList;
