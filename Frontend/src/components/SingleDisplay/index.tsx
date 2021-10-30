import { Divider } from "@mui/material";
import React, { useState } from "react";
import MovieDialog from "../MovieCard";
import "./style.css";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import { Movie } from "../../Interfaces"
import { useLazyQuery, gql } from "@apollo/client";

const QUERY_MOVIE_BY_ID = gql`
    query ($movieByIdId: ID!) {
      movieById(id: $movieByIdId) {
        _id
        title
        year
        thumbsUp
        thumbsDown
        genre
        actors
        poster
      }
    }
`

interface MovieByIdInput {
  movieByIdId: string;
}

interface MovieByIdResult {
  movieById: Movie
}

export default function SingleDisplay(props: Movie) {
  const [open, setOpen] = useState(false);
  const [thumbsUp, setThumbsUp] = useState(props.thumbsUp)
  const [thumbsDown, setThumbsDown] = useState(props.thumbsDown)
  const [voted, setVoted] = useState(false)

  const [fetchMovie, { data: movieByIdData, loading: movieByIdLoading }] = useLazyQuery<MovieByIdResult,
    MovieByIdInput>(QUERY_MOVIE_BY_ID)

  if (movieByIdLoading) {
    console.log('loading...')
    return <p>Movie is loading</p>
  }

  if (open && typeof movieByIdData !== 'undefined') {
    console.log('loaded')
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
    <>
      <div className="movie" onClick={() => {
        setOpen(true);
        fetchMovie({ variables: { movieByIdId: props._id } })
        console.log(props._id)
      }}>
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
            {thumbsUp}
          </div>
          <div className="thumbDown">
            <ThumbDownIcon />
            {thumbsDown}
          </div>
        </div>
      </div>
      <Divider flexItem />
    </>
  );
}
