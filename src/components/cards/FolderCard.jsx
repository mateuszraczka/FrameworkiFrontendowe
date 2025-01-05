import { useActionsContext } from "@/contexts/ActionsContext";
import GenericFileSystemCard from "./GenericFileSystemCard";
import { useRouter } from "next/navigation";

export default function FolderCard({name, id}) {
    const router = useRouter();
    const { dispatch } = useActionsContext();

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
            },
            {
              title: "Copy",
              action: () => dispatch({type:"COPY", payload: id}),
            },
            {
              title: "Cut",
              action: () => dispatch({type:"CUT", payload: id}),
            },
            {
              title: "Paste",
              action: () => dispatch({type:"PASTE", payload: id}),
            },
            {
              title: "Rename",
              action: () => {},
            },
            {
              title: "Delete",
              action: () => dispatch({type:"DELETE", payload:id}),
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
