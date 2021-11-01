import { Movie, MovieListProps } from "../../Interfaces/Interfaces";
import SingleDisplay from "../SingleDisplay";
import "./style.css";

const MovieList = (props: MovieListProps) => {
  const { data, refetch } = props;
  return (
    <div className="movieContainer">
      {data.length < 1 && <p>No movies to show </p>}
      {data.map((movie: Movie) => (
        <SingleDisplay key={movie._id} refetch={refetch} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;
