import { useFolderContext } from "@/contexts/FolderContext";
import useUploadFile from "@/hooks/useUploadFile";
import { useState } from "react";

export default function UploadfileForm() {
    const [file, setFile] = useState(null);
    const { uploadFile, toggleUploadFileModal } = useUploadFile();
    const { state: folderState } = useFolderContext();

    const handleChange = (e) => {
        setFile(e.target.files[0]);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        uploadFile(folderState.id, file);
        toggleUploadFileModal();
    }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-full">
      <form onSubmit={handleSubmit}>
        <label className="block text-sm/6 font-semibold text-gray-900">
          Upload File
        </label>
        <input
          type="file"
          accept="*/*"
          onChange={handleChange}
          className="block w-full text-sm text-gray-500 border border-gray-300 rounded-lg mt-2 cursor-pointer focus:outline-none"
        />
        <button
          type="submit"
          disabled={file == null}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none disabled:opacity-50"
        >
          Upload
        </button>
      </form>
    </div>
  );
}
