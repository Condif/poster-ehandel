import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  flexedContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  submitButton: {
    margin: theme.spacing(2, 0),
  },
  buttonAlert: {
    backgroundColor: "white",
    marginBottom: theme.spacing(2),
  },
  containerAlert: {
    backgroundColor: "white"
  }
}));

export default useStyles;
