import React, { Dispatch, SetStateAction } from "react";
import {
  Container,
  Grid,
  Button,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";
import useStyles from "./styles";
import CancelIcon from "@material-ui/icons/Cancel";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import { Movie } from "../../Interfaces";
import { useMutation, gql } from "@apollo/client";

const THUMBS_UP_MUTATION = gql`
  mutation($thumbsUpByIdId: ID!) {
    thumbsUpById(id: $thumbsUpByIdId) {
      thumbsUp
    }
  }
`
const THUMBS_DOWN_MUTATION = gql`
  mutation($thumbsDownByIdId: ID!) {
    thumbsDownById(id: $thumbsDownByIdId) {
      thumbsDown
    }
  }
`

interface ThumbsByIdInput {
  thumbsUpByIdId: string;
}

interface ThumbsDownByIdInput {
  thumbsDownByIdId: string;
}

interface ThumbsUpByIdResult {
  thumbsUpById: Movie;
}

interface ThumbsDownByIdResult {
  thumbsDownById: Movie;
}

interface MovieDialogProps {
  movie: Movie;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setThumbsUp: Dispatch<SetStateAction<number>>;
  thumbsUp: number;
  setThumbsDown: Dispatch<SetStateAction<number>>;
  thumbsDown: number;
  voted: boolean;
  setVoted: Dispatch<SetStateAction<boolean>>;
}

export default function MovieDialog(props: MovieDialogProps) {
  const classes = useStyles();
  const { movie, setOpen, setThumbsUp, thumbsUp, setThumbsDown, thumbsDown, voted, setVoted } = props;
  // const for Mutations 
  const [incThumbsUp] = useMutation<ThumbsUpByIdResult, ThumbsByIdInput>(THUMBS_UP_MUTATION)
  const [incThumbsDown] = useMutation<ThumbsDownByIdResult, ThumbsDownByIdInput>(THUMBS_DOWN_MUTATION)

  return (
    <>
      <Container className={classes.root}>
        <Grid container justify="flex-end">
          <Button onClick={() => { setOpen(false) }} className={classes.button2}>
            <CancelIcon />
          </Button>
        </Grid>
        <Grid container spacing={1} justify="center">
          <Grid item>
            <img className={classes.img} src={movie.poster} alt="new" />
          </Grid>
          <Grid item xs={12}>
            <DialogTitle className={classes.title}>
              Movie title: {movie.title}
            </DialogTitle>
          </Grid>
          <Grid item xs={4}>
            <DialogTitle className={classes.id}>
              Movie id: {movie._id}
            </DialogTitle>
          </Grid>
          <Grid item xs={4}>
            <DialogContent className={classes.year}>
              Year: {movie.year}
            </DialogContent>
          </Grid>
          <Grid item xs={4}>
            <DialogContent className={classes.genres}>
              Genres: {movie.genre.toString()}
            </DialogContent>
            <DialogContent className={classes.genres}>
              Actors: {movie.actors.toString()}
            </DialogContent>
          </Grid>
          <Grid item xs={12}>
            <Button disabled={voted} className={classes.thumb}
              onClick={() => {
                setVoted(true)
                incThumbsUp({ variables: { thumbsUpByIdId: movie._id } })
                setThumbsUp(movie.thumbsUp + 1)
              }}>
              <ThumbUpIcon />
            </Button>
            <DialogContent className={classes.genres}>
              {thumbsUp}
            </DialogContent>
            <Button disabled={voted} className={classes.thumb}
              onClick={() => {
                setVoted(true)
                incThumbsDown({ variables: { thumbsDownByIdId: movie._id } })
                setThumbsDown(movie.thumbsDown + 1)
              }}>
              <ThumbDownIcon />
            </Button>
            <DialogContent className={classes.genres}>
              {thumbsDown}
            </DialogContent>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
