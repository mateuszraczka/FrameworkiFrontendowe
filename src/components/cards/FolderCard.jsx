import { useActionsContext } from "@/contexts/ActionsContext";
import GenericFileSystemCard from "./GenericFileSystemCard";
import { useRouter } from "next/navigation";
import usePaste from "@/hooks/usePaste";

export default function FolderCard({name, id}) {
    const router = useRouter();
    const { state: actionsState, dispatch: actionsDispatch } = useActionsContext();
    const { paste } = usePaste();

    const handleDoubleClick = async () => {
        const currentPath = window.location.pathname;
        router.push(`${currentPath}/${id}`);
    }

    const contextMenuContent = {
        id,
        options: [
            {
              title: "Open",
              action: async () => await handleDoubleClick(),
              isVisible: true
            },
            {
              title: "Copy",
              action: () => actionsDispatch({type:"COPY_FOLDER", payload: id}),
              isVisible: true
            },
            {
              title: "Cut",
              action: () => actionsDispatch({type:"CUT_FOLDER", payload: id}),
              isVisible: true
            },
            {
              title: "Paste",
              action: async () => {
                await paste({
                  filesIds: actionsState.copied.filesIds,
                  foldersIds: [],
                  targetFolderId: id
                });
              },
              isVisible: actionsState.copied.filesIds.length > 0 || actionsState.copied.foldersIds.length > 0
            },
            {
              title: "Rename",
              action: () => {},
              isVisible: true
            },
            {
              title: "Delete",
              action: () => dispatch({type:"DELETE", payload:id}),
              isVisible: true
            },
          ]
    }

  return (
    <GenericFileSystemCard
      onDoubleClick={handleDoubleClick}
      name={name}
      id={id}
      icon={"/folder.png"}
      contextMenuContent={contextMenuContent}
    ></GenericFileSystemCard>
  );
}
