import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  submitButton: {
    margin: theme.spacing(2, 0),
    marginLeft: "1rem",
  },
  mainDiv: {
    display: "flex",
    flexDirection: "column",
  },
  labelText: {
    fontSize: "1.2rem",
    padding: "1rem",
    color: "black",
  },
  containerDiv: {
    margin: "1rem",
  },
}));

export default useStyles;
