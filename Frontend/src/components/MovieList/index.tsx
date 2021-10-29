import { Movie } from "../../Interfaces";
import SingleDisplay from "../SingleDisplay";
import "./style.css";

const MovieList = (props: any) => {
  /* const { loadingTitle, errorTitle, dataTitle } = useQuery(
    QUERY_MOVIE_BYTITLE,
    {
      variables: { title: search },
    }
  ); */

  if (props.loading) return <p>Loading ...</p>;
  return (
    <div className="movieContainer">
      {props.data.searchAndFilter.map((movie: Movie) => (
        <SingleDisplay {...movie} />
      ))}
    </div>
  );
};

export default MovieList;
