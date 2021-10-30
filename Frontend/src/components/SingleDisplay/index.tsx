import { Button, Divider, IconButton } from "@mui/material";
import React, { useState } from "react";
import MovieDialog from "../MovieCard";
import "./style.css";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import { Movie } from "../../Interfaces"
import { useLazyQuery, gql } from "@apollo/client";


interface MovieByIdInput {
  movieByIdId: string;
}

interface QueryMovieByIdResult {
  movieById: Movie
}

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

export default function SingleDisplay(props: any) {
  const [open, setOpen] = React.useState(false);

  const [fetchMovie, { data: movieByIdData, loading: movieByIdLoading }] = useLazyQuery<QueryMovieByIdResult, 
  MovieByIdInput>(QUERY_MOVIE_BY_ID)

  

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickMovie = () => {
    setOpen(true);
  };


  if (movieByIdLoading) {
    console.log('loading...')
    return <p>Movie is loading</p>
  }
  console.log('data: ', movieByIdData)
  if (open && typeof movieByIdData !== 'undefined') {
    console.log('loaded')
    return (
      <MovieDialog
        movie={movieByIdData.movieById}
        handleClose={handleClose}
        handleClickMovie={handleClickMovie}
      />
    );
  }

  return (
    <>
      <div className="movie" onClick={() => {
        setOpen(true);
        fetchMovie({variables: {movieByIdId: props._id}})
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
