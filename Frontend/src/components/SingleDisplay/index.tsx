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
  };

  if (open) {
    return (
      <MovieDialog
        id={props.id}
        title={props.title}
        poster={props.poster}
        genres={["sience-fiction"]}
        year={props.year}
        handleClose={handleClose}
        handleClickMovie={handleClickMovie}
      />
    );
  }

  return (
    <>
      <div className="movie" onClick={handleClickMovie}>
        <div>
          <img className="image" src={props.poster} alt="movie"></img>
        </div>
        <div className="text">
          {<label>{props.title + " (" + props.year + ") "}</label>}
        </div>
        <div className="thumbButtons">
          {" "}
          <div className="thumbUp">
            <ThumbUpIcon />
            {props.thumbsUp}
          </div>
          <div className="thumbDown">
            <ThumbDownIcon />
            {props.thumbsDown}
          </div>
        </div>
      </div>
      <Divider flexItem />
    </>
  );
}
