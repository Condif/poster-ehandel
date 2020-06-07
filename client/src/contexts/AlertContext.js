import React, { createContext, useState } from 'react';
import AlertMessage from '../components/AlertMessage/AlertMessage';
export const AlertContext = createContext();

const AlertContextProvider = (props) => {
    const [alert, setAlert] = useState({
        showAlert: false,
        type: null,
        message: null
    });

    return (
        <AlertContextProvider
            value={{ alert, setAlert }}>
            {alert.showAlert && <AlertMessage type={alert.type}>{alert.message}</AlertMessage>}
            {props.children}
        </AlertContextProvider>
    )
}

export default AlertContextProvider;