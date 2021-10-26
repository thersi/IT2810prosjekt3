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

export interface Attributes {
  title: string;
  description: string;
  imgPath: string;
  genres: string[];
  year: string;
  handleClose: any; //fiks disse
  handleClickMovie: any;
}

export default function MovieDialog(props: any) {
  const classes = useStyles();

  const { title, description, imgPath, genres, year, ...other } = props;

  const [thumbUp, setThumbUp] = React.useState(false);

  const [thumbDown, setThumbDown] = React.useState(false);

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
            <img className={classes.img} src={imgPath} alt="new" />
          </Grid>
          <Grid item xs={12}>
            <DialogTitle className={classes.title}>
              Movie title: {title}
            </DialogTitle>
          </Grid>
          <Grid item xs={4}>
            <DialogContent className={classes.year}>Year: {year}</DialogContent>
          </Grid>
          <Grid item xs={8}>
            <DialogContent className={classes.genres}>
              Genres: {genres}
            </DialogContent>
          </Grid>
          <Grid item xs={12}>
            <DialogContent className={classes.description}>
              {description}
            </DialogContent>
          </Grid>
          <Grid item xs={12}>
            <Button className={classes.thumb}>
              <ThumbUpIcon />
            </Button>
            <Button className={classes.thumb}>
              <ThumbDownIcon />
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
