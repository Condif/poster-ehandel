import React, { useState, useContext } from "react";
import Container from "@material-ui/core/Container";
import { UserContext } from "../../contexts/UserContext";
import useStyles from "./adminProductPageStyles";

export default function AdminProductPage() {
  const classes = useStyles();

  const { setUser } = useContext(UserContext);

  return (
    <Container className={classes.flexedContainer} maxWidth="sm">
      <h1>Admin Product Page</h1>
    </Container>
  );
}
