import { useAuthContext } from "@/contexts/AuthContext";
import { useFolderContext } from "@/contexts/FolderContext";
import { foldersAndFilesDeleteService } from "@/services/foldersAndFilesDeleteService";
import { useState } from "react";

export default function useDelete() {
  const { state: authContextState } = useAuthContext();
  const { dispatch } = useFolderContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const batchDelete = async (filesIds, foldersIds) => {
    try {
      setLoading(true);
      const token = authContextState?.auth?.accessToken?.value;
      await foldersAndFilesDeleteService(token, filesIds, foldersIds);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      dispatch({
        type: "BATCH_DELETE_FOLDERS_FILES",
        payload: {
          foldersIds,
          filesIds,
        },
      });
    }
  };

  return { batchDelete, loading, error };
}
