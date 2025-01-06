"use client";

import { useAuthContext } from "@/contexts/AuthContext";
import { redirect } from "next/navigation";

export default function PublicLayout({ children }) {
  const { state } = useAuthContext();

  if (state.auth) {
    redirect("/my-storage");
  }

  return children;
}
