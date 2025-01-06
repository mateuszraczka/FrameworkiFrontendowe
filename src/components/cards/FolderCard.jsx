import { useActionsContext } from "@/contexts/ActionsContext";
import GenericFileSystemCard from "./GenericFileSystemCard";
import { usePathname, useRouter } from "next/navigation";
import useCopy from "@/hooks/useCopy";
import useCut from "@/hooks/useCut";
import useDelete from "@/hooks/useDelete";

export default function FolderCard({ name, id }) {
  const router = useRouter();
  const { state: actionsState } = useActionsContext();
  const { paste: pasteCopied, copyFolder } = useCopy();
  const { paste: pasteCut, cutFolder } = useCut();
  const { batchDelete } = useDelete();

  const handleDoubleClick = async () => {
    router.push(`/my-storage/${id}`);
  };

  const contextMenuContent = {
    id,
    options: [
      {
        title: "Open",
        action: async () => {
          await handleDoubleClick();
        },
        isVisible: true,
      },
      {
        title: "Copy",
        action: () => {
          copyFolder(id);
        },
        isVisible: true,
      },
      {
        title: "Cut",
        action: () => {
          cutFolder(id);
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
            await pasteCopied({
              filesIds: actionsState.copied.filesIds,
              foldersIds: actionsState.copied.foldersIds,
              targetFolderId: id,
            });
          } else {
            await pasteCut({
              filesIds: actionsState.cut.filesIds,
              foldersIds: actionsState.cut.foldersIds,
              targetFolderId: id,
            });
          }
        },
        isVisible:
          actionsState.copied.filesIds.length > 0 ||
          actionsState.copied.foldersIds.length > 0 ||
          actionsState.cut.filesIds.length > 0 ||
          actionsState.cut.foldersIds.length > 0,
      },
      {
        title: "Rename",
        action: () => {},
        isVisible: true,
      },
      {
        title: "Delete",
        action: async () => {
          await batchDelete([], [id]);
        },
        isVisible: true,
      },
    ],
  };

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
