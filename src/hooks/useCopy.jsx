import { useActionsContext } from "@/contexts/ActionsContext";
import { useAuthContext } from "@/contexts/AuthContext";
import { useFolderContext } from "@/contexts/FolderContext";
import { foldersAndFilesCopyService } from "@/services/foldersAndFilesCopyService";
import { useState } from "react";

export default function useCopy() {
  const { state: authContextState } = useAuthContext();
  const { dispatch: actionsDispatch } = useActionsContext();
  const { dispatch: folderDispatch } = useFolderContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const paste = async (body) => {
    let pasted;
    try {
      setLoading(true);
      pasted = await foldersAndFilesCopyService(
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

  const copyFolder = (id) => {
    actionsDispatch({type:"COPY_FOLDER", payload: id})
  }

  const copyFile = (id) => {
    actionsDispatch({type:"COPY_FILE", payload: id})
  }

  return { paste, copyFile, copyFolder, loading, error };
}
