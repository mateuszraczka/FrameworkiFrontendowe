"use client";

import FolderReducer from "@/reducers/folderReducer";
import { initialState } from "@/reducers/folderReducer";
import { useContext, createContext } from "react";
import { useReducer } from "react";

const FolderContext = createContext();

export default function FolderContextProvider({ children }) {
    const [state, dispatch] = useReducer(FolderReducer, initialState);
    
    return (
        <FolderContext.Provider value={{ state, dispatch }}>
        {children}
        </FolderContext.Provider>
    );
}

export function useFolderContext() {
    return useContext(FolderContext);
}