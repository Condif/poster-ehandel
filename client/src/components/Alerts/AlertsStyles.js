import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    height: "min-content",
    textTransform: "none",
    position: "fixed",
  },
  white: { background: "white" },
  container: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    width: "sm",
    zIndex: 9000
  },
  action: {
    position: "absolute",
    marginTop: "-30vh",
    zIndex: 9999
  },
  ref: { 
    height: "100vh", 
    width: "100vw", 
    position: "fixed",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center"
  }
}));

export default useStyles;
