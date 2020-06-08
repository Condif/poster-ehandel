import { makeStyles } from "@material-ui/core";
import green from "@material-ui/core/colors/green";

const useStyles = makeStyles((theme) => ({
  heading: {
    background: `${green[800]}`,
    color: "white",
    padding: "1rem",
  },
  paper: {},
  orderItems: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: theme.spacing(2),
    marginLeft: "1rem",
    flexWrap: "wrap",
  },
  information: {},
  products: {},
  delivery: {},
  total: {
    background: "white",
    margin: "1rem 0 2rem 1rem",
  },
}));

export default useStyles;
