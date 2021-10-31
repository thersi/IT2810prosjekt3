import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    background: "rgb(46, 140, 240)",
    padding: 10,
    maxWidth: "80%"
  },

  id: {
    fontSize: 14,
    color: "white",
    padding: 10,
  },

  title: {
    fontSize: 22,
    color: "white",
    padding: 10,
    topMargin: 0,
    height: 0,
    textAlign: "center",
  },


  img: {
    flex: 1,
    maxWidth: "100%",
    maxHeight: "100%",
    height: "auto",
    margin: "auto",
  },

  genres: {
    fontSize: 14,
    color: "white",
    padding: 10,
    textAlign: "center",
  },

  year: {
    fontSize: 14,
    color: "white",
    padding: 10,
    textAlign: "center",
  },

  button1: {
    variant: "outlined",
    color: "primary",
  },

  button2: {
    color: "white",
    position: "absolute",
  },

  thumb: {
    color: "white",
    fontSize: "medium",
    padding: 10,
  },

  clickedThumb: {
    color: "white",
    fontSize: "large",
    padding: 10,
  },
}));

export default useStyles;
