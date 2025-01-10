"use client";

import Header from "@/components/layouts/Header";
import Main from "@/components/layouts/Main";
import useOpenRootFolder from "@/hooks/useOpenRootFolder";
import { useEffect } from "react";
import Loading from "@/components/loadings/Loading";
import FileStorageView from "@/components/views/FileStorageView";

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
          {!loading && (
            <FileStorageView
              files={files}
              childFolders={childFolders}
            ></FileStorageView>
          )}
        </Main>
      </Loading>
    </>
  );
}
