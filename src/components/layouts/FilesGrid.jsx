import React, { useRef, useState } from "react";
import useContextMenu from "@/hooks/useContextMenu";
import { useContextMenuContext } from "@/contexts/ContextMenuContext";
import ContextMenu from "../ContextMenu";
import { useFolderContext } from "@/contexts/FolderContext";
import { useActionsContext } from "@/contexts/ActionsContext";
import useCopy from "@/hooks/useCopy";
import Loading from "../loadings/Loading";
import useCut from "@/hooks/useCut";
import useCreateNewFolder from "@/hooks/useCreateNewFolder";
import FilesNotFoundPlaceholder from "../placeholders/FilesNotFoundPlaceholder";
import useUploadFile from "@/hooks/useUploadFile";

export default function FilesGrid({ children }) {
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
  const { toggleNewFolderModal } = useCreateNewFolder();
  const { toggleUploadFileModal } = useUploadFile();

  const contextMenuContent = {
    id: folderState.id,
    options: [
      {
        title: "New Folder",
        action: () => {
          toggleNewFolderModal();
        },
        isVisible: true,
      },
      {
        title: "Upload Files",
        action: () => {
          toggleUploadFileModal();
        },
        isVisible: true,
      },
      {
        title: "Paste",
        action: async () => {
          if (
            actionsState.copied.filesIds.length > 0 ||
            actionsState.copied.foldersIds.length > 0
          ) {
            await pasteCopied(
              actionsState.copied.foldersIds,
              actionsState.copied.filesIds,
              folderState.id
            );
          } else {
            await pasteCut(
              actionsState.cut.foldersIds,
              actionsState.cut.filesIds,
              folderState.id
            );
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
      <div ref={gridWrapperRef} className="relative h-full z-10 bg-gray-100 p-4 rounded-2xl">
        {folderState.childFolders.length < 1 && folderState.files.length < 1 ? (
          <FilesNotFoundPlaceholder></FilesNotFoundPlaceholder>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-8 lg:grid-cols-11 gap-2">
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
