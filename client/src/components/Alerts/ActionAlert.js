import React, { forwardRef, useContext } from "react";
import Fade from "@material-ui/core/Fade";
import { Alert } from '@material-ui/lab';
import useStyles from "./AlertsStyles";
import { UserContext } from "../../Contexts/UserContext";

const ActionAlert = forwardRef((props, ref) => {
    const classes = useStyles();

    const { alert } = useContext(UserContext);

    return (
    <Fade in={alert.showAlert} timeout={500}>
        <Alert
            ref={ref}
            elevation={1}
            className={(classes.root, classes.action)}
            severity={alert.type}>
            {alert.message}
        </Alert>
    </Fade>
    )
})

export default ActionAlert;
