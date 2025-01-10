"use client";

import Header from "@/components/layouts/Header";
import Main from "@/components/layouts/Main";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import React from "@heroicons/react";
import FolderPath from "@/components/FolderPath";
import Loading from "@/components/loadings/Loading";
import useOpenFolder from "@/hooks/useOpenFolder";
import FileStorageView from "@/components/views/FileStorageView";

export default function OpenedFolderPage() {
  const { path, files, childFolders, getFolder, loading } = useOpenFolder();
  const { id } = useParams();

  useEffect(() => {
    getFolder(id);
  }, []);

  return (
    <>
      <Header
        title={<FolderPath path={path}></FolderPath>}
      />
      <Loading
        isLoading={loading}
        width={"30%"}
        height={"30%"}
        enableBackground={true}
      >
        <Main>
          <FileStorageView
            files={files}
            childFolders={childFolders}
          ></FileStorageView>
        </Main>
      </Loading>
    </>
  );
}
