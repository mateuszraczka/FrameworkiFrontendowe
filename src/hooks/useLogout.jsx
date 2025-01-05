import { useAuthContext } from "@/contexts/AuthContext"

export default function useLogout(){
    const { dispatch } = useAuthContext();

    const logout = async () => {
        try {
            dispatch({ type: "SET_LOADING", payload: true });
            dispatch({ type: "LOGOUT" });
        } catch (error) {
            dispatch({ type: "SET_ERROR", payload: error });
        } finally {
            dispatch({ type: "SET_LOADING", payload: false });
        }
    }

    return { error: state.error, loading: state.loading, logout }
}