import { useState } from "react";
import MovieDialog from "../MovieDialog";
import "./style.css";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import {
  MovieByIdInput,
  MovieByIdResult,
  SingleDisplayProps,
} from "../../Interfaces/Interfaces";
import { useLazyQuery } from "@apollo/client";
import { QUERY_MOVIE_BY_ID } from "../../Queries/queries";

/**
 * component for displaying a single movie.
 */
export default function SingleDisplay(props: SingleDisplayProps) {
  const { movie, refetch } = props;
  const [open, setOpen] = useState(false);
  const [thumbsUp, setThumbsUp] = useState(movie.thumbsUp);
  const [thumbsDown, setThumbsDown] = useState(movie.thumbsDown);

  // Loads if the user has voted from localStorrage
  const vote = localStorage.getItem(movie._id);
  const dflt_vote = vote !== null ? JSON.parse(vote) : false;
  const [voted, setVoted] = useState(dflt_vote);

  // query for loading a single movie from the database
  const [fetchMovie, { data: movieByIdData, loading: movieByIdLoading }] =
    useLazyQuery<MovieByIdResult, MovieByIdInput>(QUERY_MOVIE_BY_ID);

  if (movieByIdLoading) {
    return <p>Movie is loading</p>;
  }
  if (open && typeof movieByIdData !== "undefined") {
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
        refetch={refetch}
      />
    );
  }

  return (
    <button
      className="movie"
      /* Function that  decides if moviedialiog is to be opened */
      onClick={() => {
        setOpen(true);
        fetchMovie({ variables: { movieByIdId: movie._id } });
      }}
    >
      <div>
        <img className="image" src={movie.poster} alt="movie"></img>
      </div>
      <div className="movieInfo">
        <div className="text">
          {<label>{movie.title + " (" + movie.year + ") "}</label>}
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
    </button>
  );
}
