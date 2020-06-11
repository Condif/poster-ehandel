import React, { useContext } from "react";
import { CheckoutContext } from "../../Contexts/CheckoutContext";
import { FormControl, FormLabel, TextField } from "@material-ui/core";
import useStyles from "./CheckOutStyles";
import { UserContext } from "../../Contexts/UserContext";

const PaymentInformation = () => {
  const classes = useStyles();
  const { validationInputs, handleInputChange } = useContext(CheckoutContext);
  const { userData } = useContext(UserContext);

  return (
    <FormControl className={classes.containerDiv}>
      <FormLabel className={classes.labelText}>Deliveryaddress</FormLabel>
      <TextField
        className={classes.containerDiv}
        error={validationInputs.address.error}
        variant="outlined"
        size="small"
        type="text"
        required
        defaultValue={userData.deliveryAddress.address}
        label="Address"
        inputProps={{
          maxLength: 20,
        }}
        onChange={(event) => handleInputChange(event, "address")}
      ></TextField>
      <TextField
        className={classes.containerDiv}
        error={validationInputs.zipcode.error}
        defaultValue={userData.deliveryAddress.zipcode}
        variant="outlined"
        size="small"
        inputProps={{
          maxLength: 5,
        }}
        type="text"
        helperText={validationInputs.zipcode.error ? "Enter 5 numbers" : null}
        required
        label="Zipcode"
        onChange={(event) => handleInputChange(event, "zipcode")}
      ></TextField>
      <TextField
        className={classes.containerDiv}
        error={validationInputs.city.error}
        defaultValue={userData.deliveryAddress.city}
        variant="outlined"
        size="small"
        type="text"
        inputProps={{
          maxLength: 20,
        }}
        helperText={validationInputs.city.error ? "Enter letters" : null}
        required
        label="City"
        onChange={(event) => handleInputChange(event, "city")}
      ></TextField>
      <FormLabel className={classes.labelText}>Swish</FormLabel>
      <TextField
        variant="outlined"
        error={validationInputs.phoneNr.error}
        size="small"
        type="tel"
        inputProps={{
          maxLength: 10,
        }}
        helperText={
          validationInputs.phoneNr.error ? "Enter a valid phone number" : null
        }
        required
        label="Phone number"
        onChange={(event) => handleInputChange(event, "phoneNr")}
      ></TextField>
    </FormControl>
  );
};

export default PaymentInformation;
