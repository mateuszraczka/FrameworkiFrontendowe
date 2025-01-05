import { useAuthContext } from "@/contexts/AuthContext"
import { loginService } from "@/services/loginService"

export default function useLogin(){
    const { state, dispatch } = useAuthContext()

    const login = async (username, password) => {
        try {
            dispatch({ type: "SET_LOADING", payload: true })
            const data = await loginService(username, password)
            dispatch({ type: "LOGIN", payload: data })
        } catch (error) {
            dispatch({ type: "SET_ERROR", payload: error })
        } finally {
            dispatch({ type: "SET_LOADING", payload: false })
        }
    }

    return { error: state.error, loading: state.loading, login: login, auth: state.auth }
}