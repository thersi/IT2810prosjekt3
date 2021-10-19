import React from "react";

const MovieList = (props: any) => {
  return (
    <>
      {props.movies.map((movie: any, index: any) => (
        <div className="image-container d-flex justify-content-start m-3">
          <img src={movie.Poster} alt="movie"></img>
        </div>
      ))}
    </>
  );
};

export default MovieList;
