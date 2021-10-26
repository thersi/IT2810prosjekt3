import { Button, Divider, IconButton } from "@mui/material";
import React, { useState } from "react";
import "./style.css";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import { Movie } from "../../Interfaces";

export default function SingleDisplay(props: Movie) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <div className="movie">
        {/*    <div>
          <img className="image" src={props.movie.} alt="movie"></img>
        </div> */}
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
