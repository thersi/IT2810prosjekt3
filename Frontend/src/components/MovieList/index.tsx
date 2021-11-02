import { Movie, MovieListProps } from "../../Interfaces/Interfaces";
import SingleDisplay from "../SingleDisplay";
import "./style.css";

/**
 * component that iterates through movies and calls SingleDisplay on each
 */
const MovieList = (props: MovieListProps) => {
  const { data, refetch } = props;

  return (
    <div className="movieContainer">
      {data.length < 1 && <p>No movies to show </p>}{" "}
      {/* If no movies are available, this is shown to user */}
      {data.map((movie: Movie) => (
        <SingleDisplay
          key={movie._id}
          refetch={refetch}
          movie={movie}
        /> /* Iterates through movies, creates a SingleDisplay for each  */
      ))}
    </div>
  );
};

export default MovieList;
