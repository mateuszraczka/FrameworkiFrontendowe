import { useActionsContext } from "@/contexts/ActionsContext";
import useFolderRename from "@/hooks/useFolderRename";
import { useState } from "react";

export default function RenameFolderForm({currentName = ""}) {
    const [name, setName] = useState(currentName);
        const { state: actionsState } = useActionsContext();
    const { rename, toggleRenameModal } = useFolderRename();
  
    const handleOnChange = (e) => {
        setName(e.target.value)
    }

    const handleClick = async () => {
        rename(actionsState.openedFolderRenameModal.id, name);
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
      <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none disabled:opacity-50" onClick={handleClick}>Submit</button>
    </div>
  );
}
