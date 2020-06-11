import React, { useEffect, useContext, createRef } from 'react';
import { ClickAwayListener } from "@material-ui/core";
import ActionAlert from "./ActionAlert";
import LoginPopup from "./LoginPopup";
import { UserContext } from "../../Contexts/UserContext";


const Alerts = (props) => {
    const { setAlert, alert, loginPopup } = useContext(UserContext);
    
    const childRef = createRef();
    
    const handleClickAway = () => {
        setAlert({ showAlert: false, type: null, message: null });
    }
    
    useEffect(() => {
        const fadeTimer = setTimeout(() => {
            setAlert({ showAlert: false, type: null, message: null });
        }, 4000);
        return () => clearTimeout(fadeTimer);
    }, [setAlert]);

    return (
        <>
            {props.action !== undefined && alert && alert.showAlert &&
                <ClickAwayListener onClickAway={handleClickAway}>
                    <ActionAlert ref={childRef} alert={alert} />
                </ClickAwayListener>}
            {props.popper && loginPopup && loginPopup.showLogin &&
                // <ClickAwayListener onClickAway={() => handleClickAway("loginPopup")}>
                <LoginPopup ref={childRef} />
                // </ClickAwayListener>
            }
        </>
    )
}

export default Alerts;