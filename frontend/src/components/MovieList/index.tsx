import React from "react";

const MovieList = (props: any) => {
  return (
    <>
      {props.movies //Det klikkes fiks imårå
        .filter((movie: any) => movie.name === props.search)
        .map((movie: any, index: any) => (
          <div className="movie">
            <img src={movie.Poster} alt="movie"></img>
          </div>
        ))}
    </>
  );
};

export default MovieList;
