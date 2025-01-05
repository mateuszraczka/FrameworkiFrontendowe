"use client";

import AuthReducer from "@/reducers/authReducer";
import { initialState } from "@/reducers/authReducer";
import { useContext, createContext, useEffect } from "react";
import { useReducer } from "react";

const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
    const [state, dispatch] = useReducer(AuthReducer, initialState);

    useEffect(()=>{
        dispatch({type:"LOGIN", payload: JSON.parse(localStorage.getItem('auth'))})
    },[])
    
    return (
        <AuthContext.Provider value={{ state, dispatch }}>
        {children}
        </AuthContext.Provider>
    );
}

export function useAuthContext() {
    return useContext(AuthContext);
}