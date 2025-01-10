import { useContextMenuContext } from "@/contexts/ContextMenuContext";
import useContextMenu from "@/hooks/useContextMenu";
import { useRef, useState } from "react";
import ContextMenu from "../ContextMenu";
import Image from "next/image";
import Loading from "../loadings/Loading";

export default function GenericFileSystemCard({
  name,
  icon,
  id,
  contextMenuContent,
  onDoubleClick,
}) {
  const fileWrapperRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const { state, dispatch } = useContextMenuContext();
  const { menuPosition } = useContextMenu(
    fileWrapperRef,
    () => dispatch({ type: "OPEN_CONTEXT_MENU", payload: id }),
    () => dispatch({ type: "CLOSE_CONTEXT_MENU" })
  );

  return (
    <Loading isLoading={loading} width={"33%"} height={"33%"}>
      <div
        onDoubleClick={onDoubleClick}
        ref={fileWrapperRef}
        className="relative select-none bg-white shadow-md rounded-lg p-2 md:p-3 lg:p-3 aspect-square flex flex-col cursor-pointer hover:shadow-gray-300 hover:bg-gray-100"
      >
        <div className="flex-shrink-0 flex justify-center h-full">
          <Image
            alt="File icon"
            src={icon}
            layout="responsive"
            width={16}
            height={9}
          />
        </div>
        <h4 className="text-xs text-slate-800 font-semibold overflow-hidden text-ellipsis whitespace-nowrap">
          {name}
        </h4>
        {state.activeContextMenu == id && (
          <ContextMenu
            setLoading={setLoading}
            position={menuPosition}
            contextMenuContent={contextMenuContent}
          ></ContextMenu>
        )}
      </div>
    </Loading>
  );
}
