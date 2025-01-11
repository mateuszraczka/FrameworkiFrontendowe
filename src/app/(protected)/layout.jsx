"use client";

import { useAuthContext } from "@/contexts/AuthContext";
import { redirect } from "next/navigation";
import NavigationBar from "@/components/layouts/NavigationBar";
import DownloadInfo from "@/components/infos/DownloadInfo";
import ActionsContextProvider from "@/contexts/ActionsContext";
import FolderContextProvider from "@/contexts/FolderContext";
import ContextMenuContextProvider from "@/contexts/ContextMenuContext";
import Footer from "@/components/layouts/Footer";

export default function ProtectedLayout({ children }) {
  const { state } = useAuthContext();

  if (!state.auth) {
    redirect("/login");
  }

  return (
    <ContextMenuContextProvider>
      <FolderContextProvider>
        <ActionsContextProvider>
          <div className="flex flex-col h-screen relative overflow-hidden">
            <NavigationBar></NavigationBar>
            {children}
            <Footer></Footer>
            <DownloadInfo></DownloadInfo>
          </div>
        </ActionsContextProvider>
      </FolderContextProvider>
    </ContextMenuContextProvider>
  );
}
