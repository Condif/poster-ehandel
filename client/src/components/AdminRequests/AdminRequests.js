import React, { useState, useEffect } from "react";
import { Grid, Typography, Paper, Button } from "@material-ui/core";
import useStyles from "../Orders/OrdersStyles";

const AdminRequests = () => {
    const classes = useStyles();
    const [specificUsers, setSpecificUsers] = useState();

    const getSpecificUsers = async () => {
        const newSpecificUsers = await fetch("http://localhost:8080/api/users/byId", {
            method: "GET",
            credentials: "include",
        }).then((response) => response.json())
            .then((data) => {
                return data
            })
        return newSpecificUsers
    };

    const setupSpecificUsers = async () => {
        const newSpecificUsers = await getSpecificUsers()
        setSpecificUsers(newSpecificUsers)
    }


    const makeAdmin = (user) => {
        user.adminRequest = 'user'
        user.role = 'admin'
        updateUser(user)
    }

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

    useEffect(() => {
        setupSpecificUsers();
        // eslint-disable-next-line
    }, []);

    

    console.log(specificUsers);


    return (
        <>
            {specificUsers !== undefined &&
                specificUsers.map((user) => (
                    <Grid
                        container
                        key={user._id}
                        className={classes.orderContainer}
                    >
                        <Paper className={classes.paper} style={{ width: " 100%" }}>
                            <Grid item xs={12} className={classes.information}>
                                <Typography className={classes.heading} variant="h6" >Admin Request</Typography>
                            </Grid>
                            <Grid container >
                                <Grid item xs={12} sm={4}>
                                    <Typography variant="h6">Information: </Typography>
                                    <Typography>Name: {user.name}</Typography>
                                    <Typography>Lastname: {user.lastname}</Typography>
                                    <Typography>Email: {user.email}</Typography>
                                </Grid>
                            </Grid>
                            <Grid container >
                                <Grid item xs={12}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => makeAdmin(user)}
                                    >
                                    Make admin
                                    </Button>
                                    {/* <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => redirectToCheckOut()}
                                    >
                                    Remove Request
                                    </Button> */}
                                </Grid>
                            </Grid>
                        </Paper>

                    </Grid>
                ))}
        </>
    );
}

export default AdminRequests