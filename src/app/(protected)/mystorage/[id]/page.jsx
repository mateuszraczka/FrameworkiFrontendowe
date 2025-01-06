"use client";

import Header from "@/components/layout/Header";
import Main from "@/components/layout/Main";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import React from "@heroicons/react";
import FolderPath from "@/components/FolderPath";
import LoadingFullscreen from "@/components/loading/LoadingFullscreen";
import useOpenFolder from "@/hooks/useOpenFolder";
import FileStorageView from "@/components/layout/FileStorageView";

export default function OpenedFolderPage() {
  const { path, files, childFolders, getFolder, loading } = useOpenFolder();
  const { id } = useParams();

  useEffect(() => {
    getFolder(id);
  }, []);

  return (
    <>
      <Header title={<FolderPath path={path}></FolderPath>} />
      <Main>
        <LoadingFullscreen isLoading={loading} width={"30%"} height={"30%"}>
          <FileStorageView
            files={files}
            childFolders={childFolders}
          ></FileStorageView>
        </LoadingFullscreen>
      </Main>
    </>
  );
}
