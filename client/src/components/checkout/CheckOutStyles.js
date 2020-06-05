import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  submitButton: {
    margin: theme.spacing(2, 0),
    marginLeft: "1rem",
    width: "20%",
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
  border: {
    borderBottom: "1px solid black",
  },
  text: {
    fontWeight: "bold",
  },
  goBackDiv: {
    margin: "3rem 0",
  },
}));

export default useStyles;
