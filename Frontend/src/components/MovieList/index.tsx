import { Movie, MovieListProps } from "../../Interfaces/Interfaces";
import SingleDisplay from "../SingleDisplay";
import "./style.css";

const MovieList = (props: MovieListProps) => {
  const { data } = props;
  return (
    <div className="movieContainer">
      {data.searchAndFilter.map((movie: Movie) => (
        <SingleDisplay key={movie._id} {...movie} />
      ))}
    </div>
  );
};

export default MovieList;
