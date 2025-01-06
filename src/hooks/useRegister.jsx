import { registerService } from "@/services/registerService"
import { useAuthContext } from "@/contexts/AuthContext";
import { useState } from "react";

export default function useRegister(){
    const { dispatch } = useAuthContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    const register = async (username, password) => {
        try {
            setLoading(true);
            const data = await registerService(username, password);
            dispatch({ type: "REGISTER", payload: data });
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }
    
    return { error, loading, register }
}