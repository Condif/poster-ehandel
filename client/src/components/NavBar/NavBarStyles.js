import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  desktopLinks: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  toolbar: {
    justifyContent: "space-between",
  },
}));

export default useStyles;
