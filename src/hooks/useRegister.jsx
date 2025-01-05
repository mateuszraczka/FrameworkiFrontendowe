import { registerService } from "@/services/registerService"
import { useAuthContext } from "@/contexts/AuthContext";

export default function useRegister(){
    const { state, dispatch } = useAuthContext();

    const register = async (username, password) => {
        try {
            dispatch({ type: "LOADING", payload: true });
            const data = await registerService(username, password);
            dispatch({ type: "REGISTER", payload: data });
        } catch (error) {
            dispatch({ type: "ERROR", payload: error });
        } finally {
            dispatch({ type: "LOADING", payload: false });
        }
    }
    
    return { error: state.error, loading: state.loading, register, auth: state.auth }
}