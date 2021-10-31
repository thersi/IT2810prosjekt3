import {
  Container,
  Grid,
  Button,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";
import useStyles from "./style";
import CancelIcon from "@material-ui/icons/Cancel";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import {
  MovieDialogProps,
  ThumbsByIdInput,
  ThumbsDownByIdInput,
  ThumbsDownByIdResult,
  ThumbsUpByIdResult,
} from "../../Interfaces/Interfaces";
import { useMutation } from "@apollo/client";
import {
  THUMBS_UP_MUTATION,
  THUMBS_DOWN_MUTATION,
} from "../../Queries/queries";

export default function MovieDialog(props: MovieDialogProps) {
  const classes = useStyles();
  const {
    movie,
    setOpen,
    setThumbsUp,
    thumbsUp,
    setThumbsDown,
    thumbsDown,
    voted,
    setVoted,
  } = props;
  // const for Mutations
  const [incThumbsUp] = useMutation<ThumbsUpByIdResult, ThumbsByIdInput>(
    THUMBS_UP_MUTATION
  );
  const [incThumbsDown] = useMutation<
    ThumbsDownByIdResult,
    ThumbsDownByIdInput
  >(THUMBS_DOWN_MUTATION);

  return (
    <>
      <Container className={classes.root}>
        <Grid container justify="flex-end">
          <Button
            onClick={() => {
              setOpen(false);
            }}
            className={classes.button2}
          >
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
            <Button
              disabled={voted}
              className={classes.thumb}
              onClick={() => {
                setVoted(true);
                incThumbsUp({ variables: { thumbsUpByIdId: movie._id } });
                setThumbsUp(movie.thumbsUp + 1);
              }}
            >
              <ThumbUpIcon />
            </Button>
            <DialogContent className={classes.genres}>{thumbsUp}</DialogContent>
            <Button
              disabled={voted}
              className={classes.thumb}
              onClick={() => {
                setVoted(true);
                incThumbsDown({ variables: { thumbsDownByIdId: movie._id } });
                setThumbsDown(movie.thumbsDown + 1);
              }}
            >
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
