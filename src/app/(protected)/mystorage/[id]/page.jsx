"use client";

import Header from "@/components/layout/Header";
import Main from "@/components/layout/Main";
import FilesGrid from "@/components/layout/FilesGrid";
import FileCard from "@/components/cards/FileCard";
import FolderCard from "@/components/cards/FolderCard";
import useGetFolder from "@/hooks/useGetFolder";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import React from "@heroicons/react";
import FolderPath from "@/components/FolderPath";

export default function OpenedFolderPage() {
  const { path, files, childFolders, getFolder } = useGetFolder();
  const { id } = useParams();

  useEffect(() => {
    getFolder(id);
  }, []);

  return (
    <>
      <Header title={<FolderPath path={path}></FolderPath>}></Header>
      <Main>
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
      </Main>
    </>
  );
}
