import { useAuthContext } from "@/contexts/AuthContext"
import { loginService } from "@/services/loginService"
import { useState } from "react"

export default function useLogin(){
    const { dispatch } = useAuthContext()
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    const login = async (username, password) => {
        try {
            setLoading(true);
            const data = await loginService(username, password)
            dispatch({ type: "LOGIN", payload: data })
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return { error, loading, login: login }
}