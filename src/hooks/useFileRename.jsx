import { useActionsContext } from "@/contexts/ActionsContext";
import { renameFileService } from "@/services/renameFileService";
import { useState } from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import { useFolderContext } from "@/contexts/FolderContext";

export default function useFileRename() {
  const { state: authContextState } = useAuthContext();
  const { dispatch: dispatchActions } = useActionsContext();
  const { dispatch: dispatchFolder } = useFolderContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const rename = async (id, name) => {
    try {
      var token = authContextState.auth.accessToken.value;
      await renameFileService(token, { id, name });
      setLoading(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      dispatchFolder({ type: "RENAME_FILE", payload: { id, name } });
    }
  };

  const toggleRenameModal = (name, id) => {
    dispatchActions({ type: "TOGGLE_FILE_RENAME_MODAL", payload: { name, id } });
  };

  return { rename, toggleRenameModal, loading, error };
}
