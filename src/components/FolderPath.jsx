import Link from "next/link";

export default function FolderPath({ path }) {
  return (
    <div className="flex gap-2 w-full">
      <div className="flex gap-2">
        <Link href={"/my-storage"}>My storage</Link>
        <span>/</span>
      </div>

      {path.map((folder) => {
        return (
          folder.name && (
            <div className="flex gap-2" key={folder.id}>
              <Link href={`/my-storage/${folder.id}`}>{folder.name}</Link>
              <span>/</span>
            </div>
          )
        );
      })}
    </div>
  );
}
