import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "fit-content",
    textTransform: "none",
    position: "fixed",
  },
  container: {
    background: "white",
    marginTop: theme.spacing(2),
    width: "sm",
  },
  front: { zIndex: 1400 },
  position: {
    margin: 0,
    display: "flex",
    marginTop: "40vh",
    transform: "translate(0, -50%)"
  },
  ref: { 
    height: "100vh", 
    width: "100vw", 
    position: "fixed",
    "& *": {
      marginBottom: "-50px",
      background: "red"
    }
  }
}));

export default useStyles;
