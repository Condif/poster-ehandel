import React, { useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../Contexts/UserContext";
import useStyles from "./LoginStyles";

export default function Login(props) {
  const classes = useStyles();

  const [inputValues, setInputValues] = useState({
    userEmail: "",
    userPassword: "",
  });

  const { setUser, setAlert, alert } = useContext(UserContext);

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
        setAlert({ showAlert: true, type: "error", message: "You have entered the wrong username or password." });
        console.log(alert)
      }
    }
    )
  }

  return (
      <Container className={classes.flexedContainer} maxWidth="sm">
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