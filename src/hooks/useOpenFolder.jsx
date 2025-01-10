import { useAuthContext } from "@/contexts/AuthContext";
import { useFolderContext } from "@/contexts/FolderContext";
import { getFolderService } from "@/services/getFolderService";
import { useState } from "react";

export default function useRootFolder() {
  const { state: authContextState } = useAuthContext();
  const { state: folderState, dispatch: dispatchFolder } = useFolderContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const getFolder = async (id = null) => {
    const token = authContextState?.auth?.accessToken?.value;

    if (!token) {
      console.error("No access token available.");
      return;
    }

    try {
      setLoading(true);

      const data = await getFolderService(token, id);

      dispatchFolder({
        type: "SET_OPENED_FOLDER",
        payload: {
          id: data.folder.id,
          parentFolderId: data.folder.parentFolderId,
          files: data.folder.files,
          childFolders: data.folder.childFolders,
          path: data.path,
        },
      });
      
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    getFolder,
    files: folderState.files,
    childFolders: folderState.childFolders,
    loading,
    error,
    path: folderState.path,
  };
}
