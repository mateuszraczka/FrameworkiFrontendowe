import { useActionsContext } from "@/contexts/ActionsContext";
import { useState } from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import { useFolderContext } from "@/contexts/FolderContext";
import { uploadFileService } from "@/services/uploadFileService";

export default function useUploadFile() {
  const { state: authContextState } = useAuthContext();
  const { dispatch: dispatchActions } = useActionsContext();
  const { dispatch: dispatchFolder } = useFolderContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const uploadFile = async (folderId, file) => {
    let uploadedFile;
    try {
      var token = authContextState.auth.accessToken.value;
      uploadedFile = await uploadFileService(token, folderId, file);
      setLoading(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      dispatchFolder({type: "ADD_FOLDERS_FILES", payload: {files: [uploadedFile], childFolders: []}})
    }
  };

  const toggleUploadFileModal = () => {
    dispatchActions({ type: "TOGGLE_UPLOAD_FILE_MODAL" });
  };

  return { uploadFile, toggleUploadFileModal, loading, error };
}
