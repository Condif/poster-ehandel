import { makeStyles } from "@material-ui/core";
import green from "@material-ui/core/colors/green";

const useStyles = makeStyles((theme) => ({
  footerContainer: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    width: "100%",
    minHeight: "150px",
    background: `linear-gradient(352deg, ${green[400]} 0%, ${green[700]} 40%, ${green[900]} 98%)`,
    marginTop: "2rem",
    color: "white",
  },
  contentDiv: {
    width: "17rem",
    margin: "0.5rem",
  },
  heading: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
    },
  },
  textContent: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8rem",
    },
  },
  hideMobile: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

export default useStyles;
