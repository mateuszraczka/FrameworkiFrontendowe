"use client";

import FilesGrid from "@/components/layout/FilesGrid";
import FileCard from "@/components/cards/FileCard";
import FolderCard from "@/components/cards/FolderCard";
import FilesNotFoundPlaceholder from "../placeholders/FilesNotFoundPlaceholder";

export default function FileStorageView({ childFolders, files }) {
  console.log(files, childFolders)
  return childFolders.length > 0 || files.length > 0 ? (
    <FilesGrid>
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
  ) : (
    <FilesNotFoundPlaceholder></FilesNotFoundPlaceholder>
  );
}
