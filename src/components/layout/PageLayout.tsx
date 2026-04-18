import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { LeftSidebar } from "./LeftSidebar";
import { RightSidebar } from "./RightSidebar";

export function PageLayout({
  children,
  hideSidebars = false,
  onOpenNotifications,
  onOpenMessages,
  onNavigateHome,
}: {
  children: ReactNode;
  hideSidebars?: boolean;
  onOpenNotifications?: () => void;
  onOpenMessages?: () => void;
  onNavigateHome?: () => void;
}) {
  return (
    <div className="min-h-screen bg-canvas">
      <Navbar
        onOpenNotifications={onOpenNotifications}
        onOpenMessages={onOpenMessages}
        onNavigateHome={onNavigateHome}
      />
      <div className="flex w-full">
        {!hideSidebars && <LeftSidebar />}
        <main className="min-w-0 flex-1 bg-canvas px-30 pt-30 pb-45">
          {children}
        </main>
        {!hideSidebars && <RightSidebar />}
      </div>
    </div>
  );
}
