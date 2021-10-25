import { Divider } from "@mui/material";
import React from "react";

const MovieList = (props: any) => {
  return (
    <>
      {props.movies.map((movie: any, index: any) => (
        <div className="movie">
          <img src={movie.Poster} alt="movie"></img>
          <Divider />
          <h3>{movie.title}</h3>
        </div>
      ))}
    </>
  );
};

export default MovieList;
