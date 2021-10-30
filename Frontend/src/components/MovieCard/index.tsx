import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Typography,
  Container,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import { isClassExpression } from "typescript";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import useStyles from "./styles";
import CancelIcon from "@material-ui/icons/Cancel";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import { Interface } from "readline";
import { Movie } from "../../Interfaces";


export interface Attributes {
  movie: Movie;
  handleClose: any; //fiks disse
  handleClickMovie: any;
}

export default function MovieDialog(props: Attributes) {
  const classes = useStyles();
  const { movie, handleClose, ...other } = props;
  const [thumbUp, setThumbUp] = useState(false);
  const [thumbDown, setThumbDown] = useState(false);
  const [voted, setVoted] = useState(false)
  console.log('genere: ', movie.genre)
  return (
    <>
      <Container className={classes.root}>
        <Grid container justify="flex-end">
          <Button onClick={props.handleClose} className={classes.button2}>
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
              onClick={ () => {
                setVoted(true)
              }}>
              <ThumbUpIcon />
            </Button>
            <DialogContent className={classes.genres}>
              {movie.thumbsUp}
            </DialogContent>
            <Button disabled={voted} className={classes.thumb}
             onClick={ () => {
              setVoted(true)
            }}>
              <ThumbDownIcon />
            </Button>
            <DialogContent className={classes.genres}>
              {movie.thumbsDown}
            </DialogContent>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
