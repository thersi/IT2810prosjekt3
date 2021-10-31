import { Divider } from "@mui/material";
import React, { useState } from "react";
import MovieDialog from "../MovieDialog";
import "./style.css";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import { Movie, MovieByIdInput, MovieByIdResult } from "../../Interfaces";
import { useLazyQuery } from "@apollo/client";
import { QUERY_MOVIE_BY_ID } from "../queries";

export default function SingleDisplay(props: Movie) {
  const [open, setOpen] = useState(false);
  const [thumbsUp, setThumbsUp] = useState(props.thumbsUp);
  const [thumbsDown, setThumbsDown] = useState(props.thumbsDown);
  const [voted, setVoted] = useState(false);

  const [fetchMovie, { data: movieByIdData, loading: movieByIdLoading }] =
    useLazyQuery<MovieByIdResult, MovieByIdInput>(QUERY_MOVIE_BY_ID);

  if (movieByIdLoading) {
    console.log("loading...");
    return <p>Movie is loading</p>;
  }

  if (open && typeof movieByIdData !== "undefined") {
    console.log("loaded");
    return (
      <MovieDialog
        movie={movieByIdData.movieById}
        setOpen={setOpen}
        setThumbsUp={setThumbsUp}
        thumbsUp={thumbsUp}
        setThumbsDown={setThumbsDown}
        thumbsDown={thumbsDown}
        voted={voted}
        setVoted={setVoted}
      />
    );
  }

  return (
    // <<<<<<< HEAD
    //       <div className="movie">
    //         <div>
    //           <img className="image" src={props.poster} alt="movie"></img>
    //         </div>
    //         <div className="movieInfo">
    //           <div className="text">
    //             <label>{props.title + " (" + props.year + ") "}</label>
    //           </div>
    //           <div className="thumbButtons">
    //             <div className="thumbUp"><ThumbUpIcon/>{props.thumbsUp}</div>
    //             <div className="thumbDown"><ThumbDownIcon/>{props.thumbsDown}</div>
    // =======
    <div
      className="movie"
      onClick={() => {
        setOpen(true);
        fetchMovie({ variables: { movieByIdId: props._id } });
        console.log(props._id);
      }}
    >
      <div>
        <img className="image" src={props.poster} alt="movie"></img>
      </div>
      <div className="movieInfo">
        <div className="text">
          {<label>{props.title + " (" + props.year + ") "}</label>}
        </div>
        <div className="thumbButtons">
          {" "}
          <div className="thumbUp">
            <ThumbUpIcon />
            {thumbsUp}
          </div>
          <div className="thumbDown">
            <ThumbDownIcon />
            {thumbsDown}
          </div>
        </div>
      </div>
    </div>
  );
}
