import useDownload from "@/hooks/useDownload";
import GenericFileSystemCard from "./GenericFileSystemCard";
import useDelete from "@/hooks/useDelete";
import useCopy from "@/hooks/useCopy";
import useCut from "@/hooks/useCut";
import useFileRename from "@/hooks/useFileRename";

export default function FileCard({ name, id, icon }) {
  const { batchDelete } = useDelete();
  const { download } = useDownload();
  const { copyFile } = useCopy();
  const { cutFile } = useCut();
  const { toggleRenameModal } = useFileRename();

  const contextMenuContent = {
    id,
    options: [
      {
        title: "Copy",
        action: async () => {
          copyFile(id);
        },
        isVisible: true,
      },
      {
        title: "Cut",
        action: async () => {
          cutFile(id);
        },
        isVisible: true,
      },
      {
        title: "Download",
        action: async () => {
          await download(id, name);
        },
        isVisible: true,
      },
      {
        title: "Rename",
        action: () => {
          toggleRenameModal(name);
        },
        isVisible: true,
      },
      {
        title: "Delete",
        action: async () => {
          await batchDelete([id], []);
        },
        isVisible: true,
      },
    ],
  };

  return (
    <GenericFileSystemCard
      name={name}
      id={id}
      icon={icon}
      contextMenuContent={contextMenuContent}
    ></GenericFileSystemCard>
  );
}
