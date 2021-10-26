import { Button, Divider, IconButton } from "@mui/material";
import React, { useState } from "react";
import MovieDialog from "../MovieCard";
import "./style.css";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";

export default function SingleDisplay(props: any) {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickMovie = () => {
    setOpen(true);
    return (
      <MovieDialog
        title={props.movie.Title}
        description={
          "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire's world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth Vader."
        }
        imgPath={props.movie.Poster}
        genres={["sience-fiction"]}
        year={props.movie.Year}
        handleClose={handleClose}
        handleClickMovie={handleClickMovie}
      />
    );
  };
  return (
    <>
      <div className="movie" onClick={handleClickMovie}>
        {/*    <div>
          <img className="image" src={props.movie.} alt="movie"></img>
        </div> */}
        <div className="text">
          {
            <label>
              {props.movie.title}
            </label> /*  <label>{props.movie.Year}</label> */
          }
        </div>
        <div className="thumbButtons">
          {" "}
          <IconButton>
            <ThumbUpIcon />
          </IconButton>
          <IconButton>
            <ThumbDownIcon />
          </IconButton>
        </div>
      </div>
      <Divider flexItem />
    </>
  );
}
