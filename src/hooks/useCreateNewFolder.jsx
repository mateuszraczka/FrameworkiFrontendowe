import { useActionsContext } from "@/contexts/ActionsContext";
import { useState } from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import { createNewFolderService } from "@/services/createNewFolderService";
import { useFolderContext } from "@/contexts/FolderContext";

export default function useCreateNewFolder() {
  const { state: authContextState } = useAuthContext();
  const { dispatch: dispatchActions } = useActionsContext();
  const { dispatch: dispatchFolder } = useFolderContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const createFolder = async (parentFolderId, name) => {
    let folder;
    try {
      var token = authContextState.auth.accessToken.value;
      folder = await createNewFolderService(token, {
        parentFolderId,
        folderDetails: {
          name,
        },
      });
      setLoading(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      dispatchFolder({type: "ADD_FOLDERS_FILES", payload: {childFolders: [folder], files: []}})
    }
  };

  const toggleNewFolderModal = () => {
    dispatchActions({ type: "TOGGLE_NEW_FOLDER_MODAL" });
  };

  return { createFolder, toggleNewFolderModal, loading, error };
}
