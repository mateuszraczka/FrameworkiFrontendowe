import React, { useRef, useState } from "react";
import useContextMenu from "@/hooks/useContextMenu";
import { useContextMenuContext } from "@/contexts/ContextMenuContext";
import ContextMenu from "../ContextMenu";
import { useFolderContext } from "@/contexts/FolderContext";
import { useActionsContext } from "@/contexts/ActionsContext";
import usePaste from "@/hooks/usePaste";
import Loading from "../loading/Loading";

export default function FilesGrid({ children }) {
  const gridWrapperRef = useRef(null);
  const { state: contextMenuState, dispatch: dispatchContextMenu } =
    useContextMenuContext();
  const { state: folderState } = useFolderContext();
  const { state: actionsState } = useActionsContext();
  const { menuPosition } = useContextMenu(
    gridWrapperRef,
    () => dispatchContextMenu({ type: "OPEN_CONTEXT_MENU", payload: "global" }),
    () => dispatchContextMenu({ type: "CLOSE_CONTEXT_MENU", payload: null })
  );
  const [loading, setLoading] = useState(false);
  const { paste } = usePaste();

  const contextMenuContent = {
    id: folderState.id,
    options: [
      {
        title: "New Folder",
        action: "NEW_FOLDER",
        isVisible: true,
      },
      {
        title: "Upload Files",
        action: "UPLOAD_FILES",
        isVisible: true,
      },
      {
        title: "Paste",
        action: async () => {
          await paste({
            filesIds: actionsState.copied.filesIds,
            foldersIds: [],
            targetFolderId: folderState.id,
          });
        },
        isVisible: actionsState.copied.filesIds.length > 0 || actionsState.copied.foldersIds.length > 0
      },
    ],
  };

  return (
    <Loading isLoading={loading} width={"30%"} height={"30%"}>
      <div ref={gridWrapperRef} className="relative h-full">
        <div className="grid grid-cols-5 md:grid-cols-7 lg:grid-cols-10 gap-2">
          {children}
        </div>
        {contextMenuState.activeContextMenu == "global" && (
          <ContextMenu
            position={menuPosition}
            contextMenuContent={contextMenuContent}
            setLoading={setLoading}
          ></ContextMenu>
        )}
      </div>
    </Loading>
  );
}
