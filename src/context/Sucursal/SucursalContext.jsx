import { createContext, useContext } from "react";

const SucursalContext = createContext();

export const SucursalProvider = ({ children }) => {
    return (
        <SucursalContext.Provider value={{

        }}>
            {children}
        </SucursalContext.Provider>
    );
};

export const useSucursalContext = () => useContext(SucursalContext);