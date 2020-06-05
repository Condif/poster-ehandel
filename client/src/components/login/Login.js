import React, { useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../Contexts/UserContext";
import useStyles from "./LoginStyles";
import AlertMessage from "../AlertMessage/AlertMessage";

export default function Login() {
  const classes = useStyles();

  const [inputValues, setInputValues] = useState({
    userEmail: "",
    userPassword: "",
  });

  const [hasError, setError] = useState({
    error: false,
    message: null
  });

  const { setUser } = useContext(UserContext);

  const history = useHistory();

  function redirectToMain() {
    history.push("/");
  }

  function handleChange(event, anchor) {
    setInputValues({
      ...inputValues,
      [anchor]: event.target.value,
    });
  }

  function logIn() {
    let user = {
      email: inputValues.userEmail,
      password: inputValues.userPassword,
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
      if (response.status === 401 || response.status === 404) {
        let messageResponse = await response.json();
        setError({ error: true, message: messageResponse.message });
        setTimeout(() => {
          setError({ error: false, message: null });
        }, 5100);
      }
    }
    )
  }

  return (
    <Container className={classes.flexedContainer} maxWidth="sm">
      {hasError.error && <AlertMessage type="error">{hasError.message}</AlertMessage>}
      <TextField
        fullWidth
        variant="outlined"
        margin="normal"
        size="small"
        type="email"
        required
        label="E-mail"
        onChange={(event) => handleChange(event, "userEmail")}
      ></TextField>
      <TextField
        fullWidth
        variant="outlined"
        margin="normal"
        size="small"
        type="password"
        required
        label="Password"
        onChange={(event) => handleChange(event, "userPassword")}
      ></TextField>
      <Button
        disabled={!inputValues.userEmail || !inputValues.userPassword}
        className={classes.submitButton}
        variant="contained"
        color="primary"
        fullWidth
        onClick={() => logIn()}
      >
        Sign in
      </Button>
    </Container>
  );
}
