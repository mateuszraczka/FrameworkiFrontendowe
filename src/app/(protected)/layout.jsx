"use client";

import { useAuthContext } from "@/contexts/AuthContext";
import { redirect } from "next/navigation";
import NavigationBar from "@/components/layout/NavigationBar";
import DownloadInfo from "@/components/info/DownloadInfo";

export default function ProtectedLayout({ children }){
    const { state } = useAuthContext();

    if (!state.auth){
        redirect("/login");
    }

    return (
        <div className="flex flex-col h-screen relative overflow-hidden">
            <NavigationBar></NavigationBar>
            {children}
            <DownloadInfo></DownloadInfo>
        </div>
    )
}