import { useActionsContext } from "@/contexts/ActionsContext";
import { renameFolderService } from "@/services/renameFolderService";
import { useAuthContext } from "@/contexts/AuthContext";
import { useState } from "react";
import { useFolderContext } from "@/contexts/FolderContext";

export default function useFolderRename() {
  const { state: authContextState } = useAuthContext();
  const { dispatch: dispatchActions } = useActionsContext();
  const { dispatch: dispatchFolder } = useFolderContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const rename = async (id, name) => {
    try {
      var token = authContextState.auth.accessToken.value;
      await renameFolderService(token, { id, name });
      setLoading(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      dispatchFolder({ type: "RENAME_FOLDER", payload: { id, name } });
    }
  };

  const toggleRenameModal = (name, id) => {
    dispatchActions({ type: "TOGGLE_FOLDER_RENAME_MODAL", payload: { name, id } });
  };

  return { rename, toggleRenameModal, loading, error };
}
