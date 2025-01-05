"use client";

import Header from "@/components/layout/Header";
import Main from "@/components/layout/Main";
import FilesGrid from "@/components/layout/FilesGrid";
import FileCard from "@/components/cards/FileCard";
import FolderCard from "@/components/cards/FolderCard";
import useGetFolder from "@/hooks/useGetFolder";
import { useEffect } from "react";

export default function HomePage() {
  const { files, childFolders, getFolder } = useGetFolder();

  useEffect(() => {
    getFolder();
  }, []);

  return (
    <>
      <Header title="My Storage" />
      <Main>
        <FilesGrid>
          {childFolders?.length > 0 && childFolders.map((folder) => (
            <FolderCard
              key={folder.id}
              id={folder.id}
              name={folder.folderDetails.name}
            />
          ))}
          {files?.length > 0 && files.map((file) => (
            <FileCard
              key={file.id}
              id={file.id}
              icon="/file_generic.png"
              name={file.fileDetails.name}
            />
          ))}
        </FilesGrid>
      </Main>
    </>
  );
}
