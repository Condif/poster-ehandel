import React, { useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";
import useStyles from "./RegisterStyles";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { UserContext } from "../../Contexts/UserContext";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

const Register = () => {
  const [inputValues, setInputValues] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    role: "",
    address: "",
    zipcode: "",
    city: "",
  });

  const classes = useStyles();

  const history = useHistory();

  const { setAlert } = useContext(UserContext);

  function handleSubmit() {
    createNewUser();
  }

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
        setAlert({
          showAlert: true,
          type: "warning",
          message: "Something went wrong",
        });
      }
      if (response.status === 201) {
        await setAlert({
          showAlert: true,
          type: "success",
          message: "Successfully registered user",
        });
        redirectToLogin();
      }
      if (response.status === 500) {
        setAlert({
          showAlert: true,
          type: "error",
          message: "There is already a user registered with that email.",
        });
      }
      return;
    });
  }

  return (
    <Container className={classes.flexedContainer} maxWidth="sm">
      <ValidatorForm
        onSubmit={handleSubmit}
        onError={(errors) => console.log(errors)}
      >
        <TextValidator
          fullWidth
          variant="outlined"
          margin="normal"
          size="small"
          type="text"
          label="Name"
          name="name"
          value={inputValues.name}
          onChange={(event) => handleInputChange(event, "name")}
          validators={["required", "matchRegexp:^[a-zA-ZåÅäÄöÖ]"]}
          errorMessages={["this field is required", "only letters"]}
        ></TextValidator>
        <TextValidator
          fullWidth
          variant="outlined"
          margin="normal"
          size="small"
          type="text"
          label="Lastname"
          name="lastname"
          value={inputValues.lastname}
          validators={["required", "matchRegexp:^[a-zA-ZåÅäÄöÖ]"]}
          errorMessages={["this field is required", "only letters"]}
          onChange={(event) => handleInputChange(event, "lastname")}
        ></TextValidator>
        <TextValidator
          fullWidth
          variant="outlined"
          margin="normal"
          size="small"
          label="Email"
          onChange={(event) => handleInputChange(event, "email")}
          name="email"
          value={inputValues.email}
          validators={["required", "isEmail"]}
          errorMessages={["this field is required", "email is not valid"]}
        />
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          size="small"
          type="password"
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
          label="Adress"
          value={inputValues.address}
          onChange={(event) => handleInputChange(event, "address")}
        ></TextField>
        <TextValidator
          fullWidth
          variant="outlined"
          margin="normal"
          size="small"
          label="Zipcode"
          onChange={(event) => handleInputChange(event, "zipcode")}
          name="zipcode"
          inputProps={{
            maxLength: 5,
          }}
          value={inputValues.zipcode}
          validators={[
            "minNumber:0",
            "maxNumber:99999",
            "matchRegexp:^[0-9]+$",
          ]}
          errorMessages={["only numbers"]}
        />
        <TextValidator
          fullWidth
          variant="outlined"
          margin="normal"
          size="small"
          type="text"
          label="City"
          name="city"
          value={inputValues.city}
          onChange={(event) => handleInputChange(event, "city")}
          validators={["required", "matchRegexp:^[a-zA-ZåÅäÄöÖ]"]}
          errorMessages={["this field is required", "only letters"]}
        ></TextValidator>
        <FormControl component="fieldset">
          <RadioGroup
            row
            defaultValue="user"
            aria-label="role"
            onChange={(event) => handleInputChange(event, "role")}
          >
            <FormControlLabel value="user" control={<Radio />} label="User" />
            <FormControlLabel value="admin" control={<Radio />} label="Admin" />
          </RadioGroup>
        </FormControl>
        <Button
          type="submit"
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
        >
          Submit
        </Button>
      </ValidatorForm>
    </Container>
  );
};

export default Register;
