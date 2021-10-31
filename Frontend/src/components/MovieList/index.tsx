import { Movie } from "../../Interfaces";
import SingleDisplay from "../SingleDisplay";
import { QueryMoviesResult } from '../MovieSearch'
import "./style.css";

interface MovieListProps {
  data: QueryMoviesResult;
}

const MovieList = (props: MovieListProps) => {
  /* const { loadingTitle, errorTitle, dataTitle } = useQuery(
    QUERY_MOVIE_BYTITLE,
    {
      variables: { title: search },
    }
  ); */
  const { data } = props;

  return (
    <div className="MovieContainer">
      {data.searchAndFilter.map((movie: Movie) => (
          <SingleDisplay {...movie} />
        ))}
    </div>
  );
};

export default MovieList;
