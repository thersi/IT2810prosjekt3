import { Movie, MovieListProps } from "../../Interfaces/Interfaces";
import SingleDisplay from "../SingleDisplay";
import "./style.css";

const MovieList = (props: MovieListProps) => {
  const { data } = props;
  return (
    <div className="movieContainer">
      {data.searchAndFilter.length < 1 && <p>No movies to show </p>}
      {data.searchAndFilter.map((movie: Movie) => (
        <SingleDisplay key={movie._id} {...movie} />
      ))}
    </div>
  );
};

export default MovieList;
