import { useAuthContext } from "@/contexts/AuthContext"
import { useState } from "react";

export default function useLogout(){
    const { dispatch } = useAuthContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    const logout = async () => {
        try {
            setLoading(true);
            dispatch({ type: "LOGOUT" });
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return { error, loading, logout }
}