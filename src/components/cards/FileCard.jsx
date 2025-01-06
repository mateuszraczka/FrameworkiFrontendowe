import useDownload from "@/hooks/useDownload";
import GenericFileSystemCard from "./GenericFileSystemCard";
import useDelete from "@/hooks/useDelete";
import { useActionsContext } from "@/contexts/ActionsContext";

export default function FileCard({name, id, icon}) {
    const { batchDelete } = useDelete();
    const { download } = useDownload();
    const { state: actionsState, dispatch: actionsDispatch } = useActionsContext();

    const contextMenuContent = {
        id,
        options: [
            {
                title: "Copy",
                action: async () => {
                    actionsDispatch({type: "COPY_FILE", payload: id})
                },
                isVisible: true,
            },
            {
                title: "Cut",
                action: async () => {
                    actionsDispatch({type: "CUT_FILE", payload: id})
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
                    await batchDelete([id], [])
                },
                isVisible: true,
            },
        ]
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