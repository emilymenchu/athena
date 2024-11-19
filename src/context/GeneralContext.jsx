import React, { createContext, useState, useEffect, useContext} from "react";
import * as userService from '../service/userService';
import { useAuthContext } from "./AuthContext";

const GeneralContext = createContext();

export const GeneralProvider = ({ children }) => {
    const { userToken, token } = useAuthContext();
    const [user, setUser] = useState(userToken);
    const [moduleName, setModuleName] = useState(null);

    const getUser = async () => {
        try {
            const { data, status } = await userService.getUser();
            console.log("Fetch User", data)
            setUser(data);
            return {status, data};
        } catch (error) {
            throw(error);
        }
    }

    useEffect(() => {
        if (token) {
            getUser();
            console.log("USER ", user, " token: ", token  )
        }

    }, [token]);

    return (
        <GeneralContext.Provider value={{ 
            user, 
            getUser, 
            setModuleName,
            moduleName
        }}>
            {children}
        </GeneralContext.Provider>
    );
}

export const useGeneralContext = () => useContext(GeneralContext);