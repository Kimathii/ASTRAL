import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

// The one shell shared by Manager, Agent and Admin. Role changes what's
// inside (via Sidebar's nav + each page's content) — never a separate shell.
export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Topbar />
        <main className="flex-1 bg-mist p-6">{children}</main>
      </div>
    </div>
  );
}
