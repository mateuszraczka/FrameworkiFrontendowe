import { useActionsContext } from "@/contexts/ActionsContext";

export default function DownloadInfo() {
  const { state } = useActionsContext();

  return (
    <div className="absolute right-0 bottom-0 p-4 flex flex-col gap-2">
        <div className={`${state.downloading.length < 1 && "hidden" } p-6 bg-gray-300 bg-opacity-90 shadow-md relative rounded-md backdrop-blur-lg select-none z-50`}>
            {state.downloading.map((downloadInfo) => (
                <div className="font-semibold" key={downloadInfo.id}>Downloading: {downloadInfo.name}</div>
            ))}
        </div>
      </div>
  );
}
