import useCreateNewFolder from "@/hooks/useCreateNewFolder";
import { useFolderContext } from "@/contexts/FolderContext";
import { useState } from "react";

export default function NewFolderForm({currentName = ""}) {
    const [name, setName] = useState(currentName);
    const { createFolder, toggleNewFolderModal } = useCreateNewFolder();
      const { state: folderState } = useFolderContext();

    const handleChange = (e) => {
        setName(e.target.value);
    }

    const handleClick = () => {
        createFolder(folderState.id, name);
        toggleNewFolderModal();
    }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-full">
      <label
        htmlFor="first-name"
        className="block text-sm/6 font-semibold text-gray-900"
      >
        Please enter folder's name
      </label>
      <div className="mt-2.5">
        <input
        value={name}
        onChange={handleChange}
          type="text"
          name="rename"
          autoComplete="given-name"
          className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
        ></input>
      </div>
      <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none disabled:opacity-50" onClick={handleClick}>Submit</button>
    </div>
  );
}