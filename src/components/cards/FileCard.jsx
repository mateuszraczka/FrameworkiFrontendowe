import useDownload from "@/hooks/useDownload";
import GenericFileSystemCard from "./GenericFileSystemCard";
import useDelete from "@/hooks/useDelete";
import useCopy from "@/hooks/useCopy";
import useCut from "@/hooks/useCut";

export default function FileCard({ name, id, icon }) {
  const { batchDelete } = useDelete();
  const { download } = useDownload();
  const { copyFile } = useCopy();
  const { cutFile } = useCut();

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
        action: async () => {},
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
