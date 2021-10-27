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

  console.log(props.data === undefined);
  console.log(props.sorting === "search");
  if (props.loading) return <p>Loading ...</p>;
  return (
    <div className="MovieContainer">
      {props.sorting === "search" &&
        props.data.containsString.map((movie: Movie) => (
          <SingleDisplay {...movie} />
        ))}
    </div>
  );
};

export default MovieList;
