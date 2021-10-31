import { Movie, MovieListProps } from "../../Interfaces";
import SingleDisplay from "../SingleDisplay";
import QueryMoviesResult from "../MovieSearch";
import "./style.css";

const MovieList = (props: MovieListProps) => {
  /* const { loadingTitle, errorTitle, dataTitle } = useQuery(
    QUERY_MOVIE_BYTITLE,
    {
      variables: { title: search },
    }
  ); */
  const { data } = props;

  return (
    <div className="movieContainer">
      {props.data.searchAndFilter.map((movie: Movie) => (
        <SingleDisplay {...movie} />
      ))}
    </div>
  );
};

export default MovieList;
