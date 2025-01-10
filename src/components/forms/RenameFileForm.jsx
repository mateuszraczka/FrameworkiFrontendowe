import { useFolderContext } from "@/contexts/FolderContext";
import useFileRename from "@/hooks/useFileRename";
import { useState } from "react";

export default function RenameFileForm({currentName}) {
    const [name, setName] = useState(currentName);
    const { state: folderState } = useFolderContext();
    const { rename, toggleRenameModal } = useFileRename();
  
    const handleOnChange = (e) => {
        setName(e.target.value)
    }

    const handleClick = async () => {
        await rename(folderState.id, name);
        toggleRenameModal();
    }

    return (
    <div className="p-4 bg-white rounded-lg shadow-md w-full">
      <label
        htmlFor="first-name"
        className="block text-sm/6 font-semibold text-gray-900"
      >
        Please enter a new name
      </label>
      <div className="mt-2.5">
        <input
          type="text"
          name="rename"
          value={name}
          onChange={handleOnChange}
          autoComplete="given-name"
          className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
        ></input>
      </div>
      <button onClick={handleClick}>Submit</button>
    </div>
  );
}
