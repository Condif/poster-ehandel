import React, { useState, useEffect } from 'react';
import useStyles from './AlertMessageStyles';
import Fade from "@material-ui/core/Fade";
import { Alert } from '@material-ui/lab';
import { ClickAwayListener } from "@material-ui/core";

const AlertMessage = (props) => {
    const classes = useStyles();

    const [fadeIn, setFadeIn] = useState(true);

    const animationTimeout = () => setTimeout(() => {
        setFadeIn(false);
    }, 5000);

    animationTimeout();

    useEffect((props) => {
        if (props.show === true) {
            setTimeout(() => {
                props.setAlert({ showAlert: false, type: null, message: null });
            }, 5100);
            return;
        }
    }, [props.show]);

    const handleClickAway = () => {
        setFadeIn(false);
        clearTimeout(animationTimeout);
        props.clickAway();
    }

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <Fade in={fadeIn} timeout={200}>
                <Alert
                    elevation={1}
                    className={classes.root}
                    severity={props.type}>
                    {props.children}
                </Alert>
            </Fade>
        </ClickAwayListener>
    )
}

export default AlertMessage;