import { useAuthContext } from "@/contexts/AuthContext";
import { useFolderContext } from "@/contexts/FolderContext";
import { getFolderService } from "@/services/getFolderService";

export default function useGetFolder() {
  const { state: authContextState } = useAuthContext();
  const { state: folderContextState, dispatch } = useFolderContext();

  const getFolder = async (id = null) => {
    const token = authContextState?.auth?.accessToken?.value;

    if (!token) {
      console.error("No access token available.");
      return;
    }

    try {
      dispatch({ type: "SET_LOADING", payload: true });

      const data = await getFolderService(token, id);

      dispatch({
        type: "SET_OPENED_FOLDER",
        payload: {
          id: data.id,
          childFolders: data.childFolders,
          files: data.files,
          name: data.folderDetails?.name,
          path: data?.path || [],
        },
      });
    } catch (error) {
      console.error("Failed to fetch folder data:", error);
      dispatch({ type: "SET_ERROR", payload: error.message || "An error occurred" });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  return {
    getFolder,
    files: folderContextState.files,
    childFolders: folderContextState.childFolders,
    loading: folderContextState.loading,
    error: folderContextState.error,
    name: folderContextState.name,
    path: folderContextState.path,
  };
}