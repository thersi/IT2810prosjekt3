import SingleDisplay from "../SingleDisplay";

const MovieList = (props: any) => {
  return (
    <>
      {props.movies.map((movie: any, index: any) => (
        <SingleDisplay movie={movie} />
      ))}
    </>
  );
};

export default MovieList;
