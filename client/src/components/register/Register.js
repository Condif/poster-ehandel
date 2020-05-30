import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";
import useStyles from "./RegisterStyles";

const Register = () => {
  const [inputValues, setInputValues] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    role: "user",
    address: "",
    zipcode: "",
    city: "",
  });

  const classes = useStyles();

  const history = useHistory();

  function redirectToLogin() {
    history.push("/login");
  }

  function handleInputChange(event, anchor) {
    setInputValues({
      ...inputValues,
      [anchor]: event.target.value,
    });
  }

  function createNewUser() {
    const newUser = {
      name: inputValues.name,
      lastname: inputValues.lastname,
      email: inputValues.email,
      password: inputValues.password,
      role: "user",
      deliveryAddress: {
        address: inputValues.address,
        zipcode: inputValues.zipcode,
        city: inputValues.city,
      },
    };

    fetch("http://localhost:8080/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(newUser),
    }).then(async (response) => {
      if (response.status === 409) {
        alert("Något gick fel");
      }
      if (response.status === 201) {
        alert("User created");
        redirectToLogin();
      }
      if (response.status === 500) {
        alert("There is already a user registered with that email.");
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
        label="Name"
        value={inputValues.name}
        onChange={(event) => handleInputChange(event, "name")}
      ></TextField>
      <TextField
        fullWidth
        variant="outlined"
        margin="normal"
        size="small"
        type="text"
        required
        label="Lastname"
        value={inputValues.lastname}
        onChange={(event) => handleInputChange(event, "lastname")}
      ></TextField>
      <TextField
        fullWidth
        variant="outlined"
        margin="normal"
        size="small"
        type="email"
        required
        label="E-mail"
        value={inputValues.email}
        onChange={(event) => handleInputChange(event, "email")}
      ></TextField>
      <TextField
        fullWidth
        variant="outlined"
        margin="normal"
        size="small"
        type="password"
        required
        label="Password"
        value={inputValues.password}
        onChange={(event) => handleInputChange(event, "password")}
      ></TextField>
      <TextField
        fullWidth
        variant="outlined"
        margin="normal"
        size="small"
        type="text"
        required
        label="Adress"
        value={inputValues.address}
        onChange={(event) => handleInputChange(event, "address")}
      ></TextField>
      <TextField
        fullWidth
        variant="outlined"
        margin="normal"
        size="small"
        type="text"
        required
        label="Zipcode"
        inputProps={{
          maxLength: 5,
          // pattern: "[0-9]+",
        }}
        value={inputValues.zipcode}
        onChange={(event) => handleInputChange(event, "zipcode")}
      ></TextField>
      <TextField
        fullWidth
        variant="outlined"
        margin="normal"
        size="small"
        type="text"
        required
        label="City"
        value={inputValues.city}
        onChange={(event) => handleInputChange(event, "city")}
      ></TextField>
      <Button
        disabled={
          !inputValues.name ||
          !inputValues.lastname ||
          !inputValues.email ||
          !inputValues.password ||
          !inputValues.address ||
          !inputValues.zipcode ||
          !inputValues.city
        }
        className={classes.submitButton}
        variant="contained"
        color="primary"
        fullWidth
        onClick={() => createNewUser()}
      >
        Sign up
      </Button>
    </Container>
  );
};

export default Register;
