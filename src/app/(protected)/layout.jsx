"use client";

import { useAuthContext } from "@/contexts/AuthContext";
import { redirect } from "next/navigation";
import NavigationBar from "@/components/layout/NavigationBar";

export default function ProtectedLayout({ children }){
    const { state } = useAuthContext();

    if (!state.auth){
        redirect("/login");
    }

    return (
        <div className="flex flex-col h-screen">
            <NavigationBar></NavigationBar>
            {children}
            <footer>footer</footer>
        </div>
    )
}