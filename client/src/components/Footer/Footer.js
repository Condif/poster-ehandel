import React from "react";
import useStyles from "./FooterStyles";
import { Typography } from "@material-ui/core";

const Footer = () => {
  const classes = useStyles();
  return (
    <div className={classes.footerContainer}>
      <div className={classes.contentDiv}>
        <Typography variant="h5">About us</Typography>
        <Typography variant="body1">
          We have a vision of bringing more nature into the home for a calmer
          and more inspiring atmosphere by beautiful posters.
        </Typography>
      </div>
      <div className={classes.contentDiv}>
        <Typography variant="h5">Contact us</Typography>
        <Typography variant="body1">
          If you have any questions, don't hesitate to contact us.
        </Typography>
        <Typography variant="body2">imagi@info.com</Typography>
        <Typography variant="body2">+46 31 - 784 859</Typography>
      </div>
      <div className={classes.contentDiv}>
        <Typography variant="h5">Visit us</Typography>
        <Typography variant="body1">
          Feel free to come by our show room to have a closer look at our
          posters.
        </Typography>
        <Typography variant="body2">Imagigatan 32</Typography>
        <Typography variant="body2">414 67 Göteorg</Typography>
      </div>
    </div>
  );
};

export default Footer;
