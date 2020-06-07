import React from "react";
import Layout from "./components/Layout";
import "typeface-roboto";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";
import UserContextProvider from "./Contexts/UserContext";
import CheckoutContextProvider from "./Contexts/CheckoutContext";
import AlertContextProvider from "./Contexts/AlertContext";

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});

function App() {
  return (
    <>
      <UserContextProvider>
        <CheckoutContextProvider>
          {/* <AlertContextProvider> */}
            <MuiThemeProvider theme={theme}>
              <CssBaseline />
              <Layout />
            </MuiThemeProvider>
          {/* </AlertContextProvider> */}
        </CheckoutContextProvider>
      </UserContextProvider>
    </>
  );
}

export default App;
