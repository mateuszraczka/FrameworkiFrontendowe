import { useAuthContext } from "@/contexts/AuthContext";
import { useFolderContext } from "@/contexts/FolderContext";
import { getRootFolderService } from "@/services/getRootFolderService";
import { useState } from "react";

export default function useRootFolder() {
  const { state: authContextState } = useAuthContext();
  const { state: folderState, dispatch: dispatchFolder } = useFolderContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const getFolder = async () => {
    const token = authContextState?.auth?.accessToken?.value;

    if (!token) {
      console.error("No access token available.");
      return;
    }

    try {
      setLoading(true);

      const data = await getRootFolderService(token);

      dispatchFolder({
        type: "SET_OPENED_FOLDER",
        payload: {
          id: data.id,
          files: data.files,
          childFolders: data.childFolders,
          path: [],
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
