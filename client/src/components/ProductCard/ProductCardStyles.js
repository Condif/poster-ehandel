import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  title: {
    margin: "2px",
  },
  titleCart: {
    fontSize: "12px",
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.6rem",
    },
  },
  media: {
    height: 0,
    paddingTop: "130%",
  },
  cartmedia: {
    width: "0px",
    paddingTop: "30%",
    paddingLeft: "22%",
  },
  productpagemedia: {
    [theme.breakpoints.up("sm")]: {
      width: "0px",
      paddingTop: "100%",
      paddingLeft: "70%",
      margin: "0 auto",
    },
    [theme.breakpoints.down("sm")]: {
      height: 0,
      paddingTop: "130%",
    },
  },
  cartDisplay: {
    display: "flex",
  },
  flexedDiv: {
    display: "flex",
    width: "100%",
    height: "100%",
  },
  cartButtons: {
    margin: theme.spacing(0.5)
  },
  cartSmallText: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.6rem",
    },
  },
}));

export default useStyles;
