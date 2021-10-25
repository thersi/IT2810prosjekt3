import { Divider } from "@mui/material";
import React from "react";
export default function SingleDisplay(props: any) {
  return (
    <>
      <div className="movie">
        <img src={props.movie.Poster} alt="movie"></img>
        <h3>{props.movie.title}</h3>
      </div>
      <Divider flexItem />
    </>
  );
}
