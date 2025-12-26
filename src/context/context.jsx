import React, { createContext, useState } from "react";

export const idContext = createContext();
export const profilePictureContext = createContext("https://picsum.photos/2000.webp");

export const globalRefreshContext = createContext();

export const GlobalRefreshContextUpdate = ({ children }) => {
    const [globalRefresh, setGlobalRefresh] = useState(true);

    return (
        <globalRefreshContext.Provider value={{ globalRefresh, setGlobalRefresh }}>
            {children}
        </globalRefreshContext.Provider>
    );
};

export const isPostContentEditableContext = createContext();

export const IsPostContentEditableContextUpdate = ({ children }) => {
    const [isPostContentEditable, setIsPostContentEditable] = useState(false)

    return (
        <isPostContentEditableContext.Provider value={{ isPostContentEditable, setIsPostContentEditable }}>
            {children}
        </isPostContentEditableContext.Provider>
    );
};

export const editPostContext = createContext();

export const EditPostContextUpdate = ({ children }) => {
    const [postToEdit, setPostToEdit] = useState({
        inEditing: false
    });

    return (
        <editPostContext.Provider value={{ postToEdit, setPostToEdit }}>
            {children}
        </editPostContext.Provider>
    );
};
