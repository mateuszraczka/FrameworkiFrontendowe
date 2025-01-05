import ActionsContextProvider from "@/contexts/ActionsContext";
import "./globals.css";
import AuthContextProvider from "@/contexts/AuthContext";
import ContextMenuContextProvider from "@/contexts/ContextMenuContext";
import FolderContextProvider from "@/contexts/FolderContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthContextProvider>
          <ContextMenuContextProvider>
            <FolderContextProvider>
              <ActionsContextProvider>
                {children}
              </ActionsContextProvider>
            </FolderContextProvider>
          </ContextMenuContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
