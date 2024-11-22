import React, { createContext, useContext, useEffect, useState } from "react";
import SaveUser from "../../generalComponents/modules/User/create-user/CreateUser";
import { useGeneralContext } from "../GeneralContext";
import { modulesNames, subModulesNames } from "../../utils/constants/modulesNames";

const SaveUserContext = createContext();

export const SaveUserProvider = ({ children }) => {
    const { setModuleName, setSubModuleName } = useGeneralContext(); 

// Errors
    // Input Errors 
    const [inputError, setInputError] = useState({});
    const [errorMessage, setErrorMessage] = useState({});

    // Modifies Module Name and SubModule Name 
    useEffect(() => {
        setModuleName(modulesNames.USERS);
        setSubModuleName(subModulesNames.USERS.CREATE_USER)
    }, [setModuleName, setSubModuleName]);

// PHOTO
    // The user photo will be saved here
    const [file, setFile] = useState(null);

    // This function reads the image
    const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
        const reader = new FileReader();
        reader.onload = (event) => {
            setFile(event.target.result);
        }
        reader.readAsDataURL(selectedFile);
    }
    };

// Date Picker
    const [clearedDate, setClearedDate] = useState(false);

    useEffect(() => {
    if (clearedDate) {
        const timeout = setTimeout(() => {
        setClearedDate(false);
        }, 1500);

        return () => clearTimeout(timeout);
    }
    return () => {};
    }, [clearedDate]);

// Password Validation
const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

    return (
        <SaveUserContext.Provider value={{
            inputError,
            errorMessage,
            file,
            handleFileChange,
            setClearedDate,
            clearedDate,
            validatePassword
        }}>
            {children}
        </SaveUserContext.Provider>
    );
};

export const useSaveUserContext = () => useContext(SaveUserContext);