import React, { useState, useEffect, useRef } from 'react';
import useStyles from './AlertsStyles';
import { Fade, Button, Grid, Paper } from "@material-ui/core";
import Popper from "@material-ui/core/Popper";
import { Alert } from '@material-ui/lab';
import { ClickAwayListener } from "@material-ui/core";
import { useHistory } from 'react-router-dom';
import Login from "../Login/Login";
import Collapse from '@material-ui/core/Collapse';

const ActionAlert = (props) => {
    const classes = useStyles();
    const history = useHistory();

    const [fadeIn, setFadeIn] = useState(true);
    const [collapse, setCollapse] = useState(false);
    const [login, setLogin] = useState(false);

    const { setAlert, alert, clickAway } = props;

    setTimeout(() => {
        setCollapse(true)
    }, 2000);

    const unmount = () => setTimeout(() => {
        clear();
        setAlert({ showAlert: false, type: null, message: null, popper: false });
    }, 5000);

    const fadeOut = () => setTimeout(() => {
        setFadeIn(false);
    }, 4000);

    function animationTimeout() {
        fadeOut();
        unmount();
    }

    const clear = () => { clearTimeout(fadeOut); clearTimeout(unmount) };

    useEffect(() => clear());

    // eslint-disable-next-line
    useEffect(() => { !alert.popper && animationTimeout(); }, [props.alert.showAlert]);

    const handleClickAway = () => {
        clear();
        setFadeIn(false);
        clickAway(fadeOut, animationTimeout);
    }

    const handleClose = (type) => {
        setAlert({ showAlert: false });
        history.push(`/${type}`);
    }

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <Fade in={fadeIn} timeout={500}>
                {!alert.popper ?
                    <Alert
                        elevation={1}
                        className={classes.root, classes.front, classes.position}
                        severity={alert.type}>
                        {alert.message}
                    </Alert>
                    :
                    <Popper
                        className={classes.root, classes.front}
                        disablePortal keepMounted anchorEl={document.body}
                        open={alert.showAlert} modifiers={{ preventOverflow: { enabled: true, boundariesElement: 'scrollParent' } }}>
                        <Alert
                            icon={false}
                            elevation={0}
                            className={classes.front, classes.position}
                            severity={alert.type}>
                            <Alert onClose={() => setAlert({ showAlert: false })} style={{ "margin": 0, "padding": 0 }} severity={alert.type}>{alert.message}</Alert>
                            {login ? <Collapse in={collapse}>
                                <Grid container justify="center" alignItems="center" classes={{ container: classes.container }} spacing={2}>
                                    <Grid item>
                                        <Button onClick={() => handleClose("register")}>Sign up</Button>
                                    </Grid>
                                    <Grid item>
                                        <Button onClick={() => setLogin(true)}>Login</Button>
                                    </Grid>
                                </Grid>
                            </Collapse> : <Grid className={classes.container} container><Login alert /></Grid>}
                        </Alert>
                    </Popper>}
            </Fade>
        </ClickAwayListener>
    )
}

export default ActionAlert;