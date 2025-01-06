import { useActionsContext } from "@/contexts/ActionsContext";
import { useAuthContext } from "@/contexts/AuthContext";
import { useFolderContext } from "@/contexts/FolderContext";
import { foldersAndFilesPasteService } from "@/services/foldersAndFilesPasteService";
import { useState } from "react";

export default function usePaste() {
  const { state: authContextState } = useAuthContext();
  const { dispatch: actionsDispatch } = useActionsContext();
  const { dispatch: folderDispatch } = useFolderContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const paste = async (body) => {
    let pasted;
    try {
      setLoading(true);
      pasted = await foldersAndFilesPasteService(
        authContextState.auth.accessToken.value,
        body
      );
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      actionsDispatch({ type: "PASTE" });
      folderDispatch({
        type: "ADD_FOLDERS_FILES",
        payload: { files: pasted.files, childFolders: pasted.folders },
      });
    }
  };

  return { paste, loading, error };
}
