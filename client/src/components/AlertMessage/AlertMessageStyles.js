import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "fit-content",
    position: "fixed",
    padding: "5rem",
    top: "30%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 2,
    textTransform: "none"
  }
}));

export default useStyles;
