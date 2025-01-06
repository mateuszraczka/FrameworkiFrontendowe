import React, { useRef, useState } from "react";
import useContextMenu from "@/hooks/useContextMenu";
import { useContextMenuContext } from "@/contexts/ContextMenuContext";
import ContextMenu from "../ContextMenu";
import { useFolderContext } from "@/contexts/FolderContext";
import { useActionsContext } from "@/contexts/ActionsContext";
import useCopy from "@/hooks/useCopy";
import Loading from "../loading/Loading";
import useCut from "@/hooks/useCut";
import FilesNotFoundPlaceholder from "../placeholders/FilesNotFoundPlaceholder";

export default function FilesGrid({ children, isEmpty }) {
  const gridWrapperRef = useRef(null);
  const { state: contextMenuState, dispatch: dispatchContextMenu } =
    useContextMenuContext();
  const { state: folderState } = useFolderContext();
  const { state: actionsState } = useActionsContext();
  const { menuPosition } = useContextMenu(
    gridWrapperRef,
    () => dispatchContextMenu({ type: "OPEN_CONTEXT_MENU", payload: "global" }),
    () => dispatchContextMenu({ type: "CLOSE_CONTEXT_MENU" })
  );
  const [loading, setLoading] = useState(false);
  const { paste: pasteCopied } = useCopy();
  const { paste: pasteCut } = useCut();

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
          if (
            actionsState.copied.filesIds.length > 0 ||
            actionsState.copied.foldersIds.length > 0
          ) {
            await pasteCopied({
              filesIds: actionsState.copied.filesIds,
              foldersIds: actionsState.copied.foldersIds,
              targetFolderId: folderState.id,
            });
          } else {
            await pasteCut({
              filesIds: actionsState.cut.filesIds,
              foldersIds: actionsState.cut.foldersIds,
              targetFolderId: folderState.id,
            });
          }
        },
        isVisible:
          actionsState.copied.filesIds.length > 0 ||
          actionsState.copied.foldersIds.length > 0 ||
          actionsState.cut.filesIds.length > 0 ||
          actionsState.cut.foldersIds.length > 0,
      },
    ],
  };

  return (
    <Loading isLoading={loading} width={"30%"} height={"30%"}>
      <div ref={gridWrapperRef} className="relative h-full z-10">
        {isEmpty ? (
          <FilesNotFoundPlaceholder></FilesNotFoundPlaceholder>
        ) : (
          <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-10 gap-2">
            {children}
          </div>
        )}
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
