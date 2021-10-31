import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    background: "rgb(46, 140, 240)",
    padding: 10,
    maxWidth: "80%"
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
    padding: "15%",
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

  button2: {
    color: "white",
    background: "rgb(46, 140, 240)",
    position: "absolute",
    border: "0",
  },

  thumb: {
    color: "white",
    fontSize: "medium",
    padding: 10,
    background: "rgb(46, 140, 240)",
    border: "0",
    
  },


  clickedThumb: {
    color: "gray",
    fontSize: "large",
    padding: 10,

  },
}));

export default useStyles;
