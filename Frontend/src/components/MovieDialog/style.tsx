import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "rgb(46, 140, 240)",
    maxWidth: "70%",
    [theme.breakpoints.down("xs")]: {
      maxWidth: "95%",
    },
    [theme.breakpoints.down(315)]: {
      minWidth: "290px",
    }
  },

  title: {
    fontSize: 22,
    color: "white",
    marginTop: "1%",
    textAlign: "center",
  },


  img: {
    flex: 1,
    maxWidth: "100%",
    maxHeight: "100%",
    height: "auto",
    margin: "auto",
    marginTop: "30%",
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
    padding: 7,
    textAlign: "center",
  },

  button2: {
    display: "flex",
    justifyContent: "center",
    color: "white",
    background: "rgb(46, 140, 240)",
    position: "absolute",
    border: "0",
    marginTop: "2%",
  },

  box: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    justifyItems: "center",
    textAlign: "center"
  }, 

  thumb: {
    color: "white",
    fontSize: "medium",
    marginTop: "10%",
    padding: 0,
    margin: 0,
    border: "0",
    marginBottom: 0,
    background: 'rgba(46, 140, 240, 1)',
    '&:disabled': {
      color: 'rgba(255, 255, 255, 0.5)' 
    }
  },

  text: {
    marginTop: 0,
    marginBottom: 5,
    color: "white",
  }

}));

export default useStyles;
