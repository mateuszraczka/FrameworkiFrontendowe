"use client";

import ActionsReducer from "@/reducers/actionsReducer";
import { initialState } from "@/reducers/actionsReducer";
import { useContext, createContext } from "react";
import { useReducer } from "react";

const ActionsContext = createContext();

export default function ActionsContextProvider({ children }) {
    const [state, dispatch] = useReducer(ActionsReducer, initialState);
    
    return (
        <ActionsContext.Provider value={{ state, dispatch }}>
        {children}
        </ActionsContext.Provider>
    );
}

export function useActionsContext() {
    return useContext(ActionsContext);
}