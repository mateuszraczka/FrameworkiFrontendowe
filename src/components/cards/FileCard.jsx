import { useActionsContext } from "@/contexts/ActionsContext";
import GenericFileSystemCard from "./GenericFileSystemCard";

export default function FileCard({name, id, icon}) {
    const { dispatch } = useActionsContext();

    const contextMenuContent = {
        id,
        options: [
            {
                title: "Copy",
                action: () => {
                    dispatch({type: "COPY", payload: id})
                },
            },
            {
                title: "Cut",
                action: () => {
                    dispatch({type: "CUT", payload: id})
                }
            },
            {
                title: "Download",
                action: () => {
                    dispatch({type: "DOWNLOAD", payload: id})
                }
            },
            {
                title: "Rename",
                action: () => {}
            },
            {
                title: "Delete",
                action: () => {
                    dispatch({type: "DELETE", payload: id})
                }
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