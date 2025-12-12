import React, { createContext, useState } from "react";

export const idContext = createContext();

export const globalRefreshContext = createContext();

export const GlobalRefreshContextUpdate = ({ children }) => {
    const [globalRefresh, setGlobalRefresh] = useState(true);

    return (
        <globalRefreshContext.Provider value={{ globalRefresh, setGlobalRefresh }}>
            {children}
        </globalRefreshContext.Provider>
    );
};