import { makeStyles } from "@material-ui/core";
import green from "@material-ui/core/colors/green";

const useStyles = makeStyles((theme) => ({
  heading: {
    background: `${green[800]}`,
    color: "white",
    padding: "0.3rem 1rem",
  },
  paper: {},
  orderItems: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: theme.spacing(2),
    flexWrap: "wrap",
    textAlign: "center",
  },
  information: {
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
    display: "flex",
    flexDirection: "row",
  },
  products: {},
  delivery: {},
  priceAndShipped: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    padding: "1rem 0 1rem 0",
  },
}));

export default useStyles;
