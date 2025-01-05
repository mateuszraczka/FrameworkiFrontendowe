import Link from "next/link";

export default function FolderPath({path}) {
  return (
    <div className="flex gap-2">
      {path.map((folder) => {
        return (
          <div className="flex gap-2" key={folder.id}>
            {folder.name == null ? (
              <Link href={"/mystorage"}>My Storage</Link>
            ) : (
              <Link href={`/mystorage/${folder.id}`}>{folder.name}</Link>
            )}
            <span>/</span>
          </div>
        );
      })}
    </div>
  );
}
