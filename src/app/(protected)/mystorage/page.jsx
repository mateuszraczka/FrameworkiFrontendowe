"use client";

import Header from "@/components/layout/Header";
import Main from "@/components/layout/Main";
import useOpenRootFolder from "@/hooks/useOpenRootFolder";
import { useEffect } from "react";
import LoadingFullscreen from "@/components/loading/LoadingFullscreen";
import FileStorageView from "@/components/layout/FileStorageView";

export default function HomePage() {
  const { files, childFolders, getFolder, loading } = useOpenRootFolder();

  useEffect(() => {
    getFolder();
  }, []);

  return (
    <>
      <Header title="My Storage" />
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
