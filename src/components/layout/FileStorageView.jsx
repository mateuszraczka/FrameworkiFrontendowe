"use client";

import FilesGrid from "@/components/layout/FilesGrid";
import FileCard from "@/components/cards/FileCard";
import FolderCard from "@/components/cards/FolderCard";

export default function FileStorageView({ childFolders, files }) {
  return (
    <FilesGrid isEmpty={childFolders.length < 1 && files.length < 1}>
      {childFolders?.length > 0 &&
        childFolders.map((folder) => (
          <FolderCard
            key={folder.id}
            id={folder.id}
            name={folder.folderDetails.name}
          />
        ))}
      {files?.length > 0 &&
        files.map((file) => (
          <FileCard
            key={file.id}
            id={file.id}
            icon="/file_generic.png"
            name={file.fileDetails.name}
          />
        ))}
    </FilesGrid>
  );
}
