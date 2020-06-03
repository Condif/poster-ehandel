import React, { createContext, useState } from "react";
export const CheckoutContext = createContext();

const CheckoutContextProvider = (props) => {
    const [validationInputs, setValidationInputs] = useState({
        address: {
            value: "",
            error: false
        },
        zipcode: {
            value: "",
            error: false
        },
        city: {
            value: "",
            error: false
        },
        phoneNr: {
            value: "",
            error: false
        }  
    })

    const validateInputFields = () => {
        let shouldProgress = true
        const inputArray = Object.entries(validationInputs)
        let updatedList = { ...validationInputs }
        

        inputArray.forEach(input => {
            if(
                (input[0] === 'address' && input[1].value.length < 1) ||
                (input[0] === 'zipcode' && input[1].value.length < 5) ||
                (input[0] === 'city' && input[1].value.length < 1) ||
                (input[0] === 'phoneNr' && input[1].value.length < 9)
                ) {
                updatedList[input[0]].error = true
                shouldProgress = false
                }
        })
        if(!shouldProgress) {
            setErrorToInput(updatedList)
        }
        return shouldProgress
    }

    const setErrorToInput = (updatedList) => {
        setValidationInputs(updatedList)
    }

    const checkErrorsInInfo = () => {
        return validationInputs.address.error
    }

    const setInputToState = (input, id, valid) => {   
		setValidationInputs({
			...validationInputs,
			[id]: {
				value: input,
				error: !valid
			}
		});
    };
    
    const validateInputs = (value, letter) => {
		if (letter) {
			if (value.match(/^[A-ZÅÄÖa-zåäö]+$/)) {
				return true;
			} else {
				return false;
			}
		} else {
			if (value.match(/^\d+$/)) {
				return true;
			} else {
				return false;
			}
		}
	};

    return (
        <CheckoutContext.Provider
            value={{
                validationInputs,

                validateInputFields,
                checkErrorsInInfo,
                setInputToState,
                validateInputs,
            }}
        >
            {props.children}
        </CheckoutContext.Provider>
    )
}


export default CheckoutContextProvider;