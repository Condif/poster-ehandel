import React, { useState } from 'react';
import useStyles from './AlertMessageStyles';
import { Alert } from '@material-ui/lab';
import Fade from "@material-ui/core/Fade";

const AlertMessage = (props) => {
    const classes = useStyles();

    const [open, setOpen] = useState(true);

    const timeout = () => setTimeout(() => {
        setOpen(false);
    }, 5000);

    timeout();

    return (
        <Fade in={open} timeout={200}>
            <Alert
                elevation={1}
                className={classes.root}
                severity={props.type}>
                {props.children}
            </Alert>
        </Fade>
    )
}

export default AlertMessage;