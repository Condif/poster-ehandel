import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  headerWrapper: {
    width: "100%",
    height: "4rem",
    position: "fixed",
    zIndex: 1,
    backgroundColor: "#FFFFFF",
    display: "flex",
    alignItems: "center",
    boxShadow: "0px 5px 5px -2px rgba(0,0,0,0.1)",
    MozBoxShadow: "0px 5px 5px -2px rgba(0,0,0,0.1)",
    WebkitBoxShadow: "0px 5px 5px -2px rgba(0,0,0,0.1)",
  },
  closeIcon: {
    height: "100%",
    marginLeft: "1rem",
    fontSize: "large",
    cursor: "pointer",
  },
  header: {
    margin: theme.spacing(0, 4),
  },
  listWrapper: {
    padding: "1rem",
    position: "relative",
    height: "calc(100% - 5rem)",
    top: "4rem",
    overflowY: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "100vw",
    },
    [theme.breakpoints.up("sm")]: {
      width: "40vw",
    },
    [theme.breakpoints.up("md")]: {
      width: "35vw",
    },
  },
  submitButton: {
    margin: theme.spacing(13, 0, 4, 0),
    width: "40",
    display: "flex",
    justifyContent: "center",
    alignSelf: "center",
  },
  totalCostText: {
    fontWeight: "bold",
  },
}));

export default useStyles;
