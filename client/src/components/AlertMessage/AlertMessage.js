import React, { useState, useEffect } from 'react';
import useStyles from './AlertMessageStyles';
import Fade from "@material-ui/core/Fade";
import { Alert } from '@material-ui/lab';
import { ClickAwayListener } from "@material-ui/core";

const AlertMessage = (props) => {
    const classes = useStyles();
    const [fadeIn, setFadeIn] = useState(true);

    let animationTimeout;

    function timeout() {
        animationTimeout = setTimeout(() => {
            setFadeIn(false);
            clear();
            props.setAlert({ showAlert: false, type: null, message: null });
        }, 5000)
    }

    const clear = () => { clearTimeout(animationTimeout); };

    useEffect(() => clear());

    useEffect(() => { timeout(); }, [props.show]);

    const handleClickAway = () => {
        clear();
        setFadeIn(false);
        props.clickAway(animationTimeout);
    }

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <Fade in={fadeIn} timeout={700}>
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