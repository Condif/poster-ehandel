import React, { useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import useStyles from "./LoginStyles";
import teal from "@material-ui/core/colors/teal";

export default function Login() {
  const classes = useStyles();

  const [userEmail, setUserEmail] = useState([]);
  const [userPassword, setUserPassword] = useState([]);

  const { setUser } = useContext(UserContext);

  const history = useHistory();

  function redirectToMain() {
    history.push("/");
  }

  function authenticateUser() {
    let user = {
      email: userEmail,
      password: userPassword,
    };

    fetch("http://localhost:8080/sessions/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(user),
    }).then(async (response) => {
      if (response.status === 200) {
        let dataFromBackend = await response.json();
        setUser(dataFromBackend);
        redirectToMain();
      }
      if (response.status === 401) {
        let messageResponse = await response.json();
        alert(messageResponse.message);
      }
    });
  }

  return (
    <Container className={classes.flexedContainer} maxWidth="sm">
      <TextField
        fullWidth
        variant="outlined"
        margin="normal"
        size="small"
        type="text"
        required
        label="E-mail"
        onChange={(event) => setUserEmail(event.target.value)}
      ></TextField>
      <TextField
        fullWidth
        variant="outlined"
        margin="normal"
        size="small"
        type="password"
        required
        label="Password"
        onChange={(event) => setUserPassword(event.target.value)}
      ></TextField>
      <Button
        className={classes.submitButton}
        variant="contained"
        color="primary"
        fullWidth
        onClick={() => authenticateUser()}
      >
        Sign in
      </Button>
    </Container>
  );
}
