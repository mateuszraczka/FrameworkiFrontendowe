import { useActionsContext } from "@/contexts/ActionsContext";
import { useAuthContext } from "@/contexts/AuthContext";
import { foldersAndFilesPasteService } from "@/services/foldersAndFilesPasteService";

export default function usePaste() {
  const { state: authContextState } = useAuthContext();
  const { dispatch, state: actionsContextState } = useActionsContext();

  const paste = async (body) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const data = await foldersAndFilesPasteService(
        authContextState.auth.accessToken.value,
        body
      );
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };
  
  return { paste, pasted: actionsContextState.pasted, loading: actionsContextState.loading, error: actionsContextState.error };
}
