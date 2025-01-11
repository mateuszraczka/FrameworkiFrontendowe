import { useActionsContext } from "@/contexts/ActionsContext";
import { useAuthContext } from "@/contexts/AuthContext";
import { downloadService } from "@/services/downloadService";
import { useState } from "react";

export default function useDownload() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const { state: authContextState } = useAuthContext();
  const { dispatch: actionsDispatch } = useActionsContext();

  const download = async (id, name) => {
    const token = authContextState?.auth?.accessToken?.value;

    if (!token) {
      console.error("No access token available.");
      return;
    }

    try {
      setLoading(true);
      actionsDispatch({
        type: "ADD_DOWNLOAD",
        payload: { id, name },
      });
      await downloadService(token, id, name);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      setTimeout(() => {
        actionsDispatch({ type: "REMOVE_DOWNLOAD", payload: id });
      }, 2000);
    }
  };

  return { download, loading, error };
}
