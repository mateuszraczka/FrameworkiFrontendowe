"use client";

import Header from "@/components/layout/Header";
import Main from "@/components/layout/Main";
import useOpenRootFolder from "@/hooks/useOpenRootFolder";
import { useEffect } from "react";
import Loading from "@/components/loading/Loading";
import FileStorageView from "@/components/layout/FileStorageView";

export default function HomePage() {
  const { files, childFolders, getFolder, loading } = useOpenRootFolder();

  useEffect(() => {
    getFolder();
  }, []);

  return (
    <>
      <Header title="My storage" />
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
