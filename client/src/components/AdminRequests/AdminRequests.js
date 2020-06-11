import React, { useEffect, useState, useRef } from "react";
import { Grid, Typography, Paper, Button } from "@material-ui/core";
import useStyles from "../Orders/OrdersStyles";

const AdminRequests = () => {
  const [specificUsers, setSpecificUsers] = useState();
  // Gör så att statet sätts första gången, useRef finns hela komponentens lifetime,
  // alltså försvinner den inte när komponenten uppdateras.
  const _isMounted = useRef(true);
  const classes = useStyles();
  const makeAdmin = (user) => {
    user.adminRequest = "user";
    user.role = "admin";
    updateUser(user);
  };

  const denyAdminRequest = (user) => {
    user.adminRequest = "user";
    updateUser(user);
  };

  const updateUser = (user) => {
    fetch("http://localhost:8080/api/users/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then(() => {
        console.log("User updated");
      });
  };

  const setupSpecificUsers = async () => {
    const newSpecificUsers = await getSpecificUsers();
    //Eftersom useEffect bara ska köras 1 gång ska statet bara sättas en gång
    if (_isMounted.current) {
      setSpecificUsers(newSpecificUsers);
    }
  };

  const getSpecificUsers = async () => {
    const newSpecificUsers = await fetch(
      "http://localhost:8080/api/users/adminRequest",
      {
        method: "GET",
        credentials: "include",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
    return newSpecificUsers;
  };
  useEffect(() => {
    setupSpecificUsers();
    return () => {
      _isMounted.current = false;
    };
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {specificUsers !== undefined &&
        specificUsers.map((user) => (
          <Grid container key={user._id} className={classes.orderContainer}>
            <Paper className={classes.paper} style={{ width: " 100%" }}>
              <Grid item xs={12} className={classes.information}>
                <Typography className={classes.heading} variant="h6">
                  Admin Request
                </Typography>
              </Grid>
              <Grid container>
                <Grid item xs={12} sm={4}>
                  <Typography variant="h6">Information: </Typography>
                  <Typography>Name: {user.name}</Typography>
                  <Typography>Lastname: {user.lastname}</Typography>
                  <Typography>Email: {user.email}</Typography>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => makeAdmin(user)}
                  >
                    Make admin
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => denyAdminRequest(user)}
                  >
                    Remove Request
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        ))}
    </>
  );
};

export default AdminRequests;
