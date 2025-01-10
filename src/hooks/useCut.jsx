import { useActionsContext } from "@/contexts/ActionsContext";
import { useAuthContext } from "@/contexts/AuthContext";
import { useFolderContext } from "@/contexts/FolderContext";
import { foldersAndFilesCutService } from "@/services/foldersAndFilesCutService";
import { useState } from "react";

export default function useCut() {
  const { state: authContextState } = useAuthContext();
  const { dispatch: actionsDispatch, state } = useActionsContext();
  const { dispatch: folderDispatch } = useFolderContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const paste = async (foldersIds, filesIds, targetFolderId) => {
    let pasted;
    try {
      setLoading(true);
      pasted = await foldersAndFilesCutService(
        authContextState.auth.accessToken.value,
        {foldersIds, filesIds, targetFolderId}
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

  const cutFile = (id) => {
    actionsDispatch({type: "CUT_FILE", payload: id});
  }

  const cutFolder = (id) => {
    actionsDispatch({type: "CUT_FOLDER", payload: id});
  }

  return { paste, cutFile, cutFolder, loading, error };
}
