import React, { useRef } from "react";
import useContextMenu from "@/hooks/useContextMenu";
import { useContextMenuContext } from "@/contexts/ContextMenuContext";
import ContextMenu from "../ContextMenu";

const contextMenuContent = {
  options: [
    {
      title: "New Folder",
      action: "NEW_FOLDER",
    },
    {
      title: "Upload Files",
      action: "UPLOAD_FILES",
    },
    {
      title: "Paste",
      action: "PASTE",
    },
  ]
}

export default function FilesGrid({ children }) {
  const gridWrapperRef = useRef(null);
  const { state, dispatch } = useContextMenuContext();
  const { menuPosition } = useContextMenu(
    gridWrapperRef,
    () => dispatch({ type: "OPEN_CONTEXT_MENU", payload: "global" }),
    () => dispatch({ type: "CLOSE_CONTEXT_MENU", payload: null })
  );

  return (
    <div ref={gridWrapperRef} className="relative h-full">
      <div className="grid grid-cols-5 md:grid-cols-7 lg:grid-cols-10 gap-2">
        {children}
      </div>
      {state.activeContextMenu == "global" && (
        <ContextMenu position={menuPosition} contextMenuContent={contextMenuContent}></ContextMenu>
      )}
    </div>
  );
}
