"use client";

import ContextMenuReducer from "@/reducers/contextMenuReducer";
import { initialState } from "@/reducers/contextMenuReducer";
import { useContext, createContext } from "react";
import { useReducer } from "react";

const ContextMenuContext = createContext();

export default function ContextMenuContextProvider({ children }) {
    const [state, dispatch] = useReducer(ContextMenuReducer, initialState);
    
    return (
        <ContextMenuContext.Provider value={{ state, dispatch }}>
        {children}
        </ContextMenuContext.Provider>
    );
}

export function useContextMenuContext() {
    return useContext(ContextMenuContext);
}