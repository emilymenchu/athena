import React, { createContext, useState, useContext, useEffect } from "react";
import * as authService from '../service/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [ userToken, setUserToken ] = useState(null);

    const login  = async (username, password) => {
        try {
            const { token: getToken, status } = await authService.login(username, password);
            setToken(getToken);            
            const tokenObject = { jwt: getToken };
            sessionStorage.setItem('token', JSON.stringify(tokenObject));
            console.log('Token added to the session storage', getToken);
            await updateUser();
            console.log('Successfully logged in with username: ', username, ' and password: ', password)
            return { status };
        } catch (error) {
            throw(error);
        }
    };

    const updateUser = async () => {
        try {
            const { data, status } = await authService.fetchUserInfo();
            setUserToken(data);
            const userObject = { uuid: data.uuid, username: data.usuario };
            sessionStorage.setItem('user', JSON.stringify(userObject));
            console.log('User added to the session storage');            
            return { status };
        } catch (error){
            console.log('Error updating user: ', error)
            throw(error);
        }
    }

    const logout = () => {
        setToken(null);
        setUserToken(null);
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
    }

    useEffect(() => {
        if (token !== null && token !== undefined) {
            // const tokenObject = { jwt: token };
            // sessionStorage.setItem('token', JSON.stringify(tokenObject));
            // console.log('Token added to the session storage', token);
            // updateUser();
            // if ( userToken === null || userToken === undefined) {
            // }
        } else {
            let sToken = JSON.parse(sessionStorage.getItem('token'));
            if (sToken != null && sToken != undefined){
                setToken(sToken.jwt);
                // sessionStorage.removeItem('token');
                // console.log('Token removed to the session storage')
            }
        }
    }, [token]);

    // useEffect(() => {
    //     // console.log('Auth useEffect ', userToken, 'and token ', token)
    //     if (userToken !== null && userToken !== undefined) { 
    //         // const userObject = { uuid: userToken.uuid, username: userToken.usuario };
    //         // sessionStorage.setItem('user', JSON.stringify(userObject));
    //         // console.log('User added to the session storage');
    //     } else {
    //         // if (sessionStorage.getItem('token')) {
    //         //     console.log('Updating userToken from its useEffect')
    //         //     updateUser();
    //         // }
    //     }
    // }, [ userToken] )

    return (
        <AuthContext.Provider value={{ token, login, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);