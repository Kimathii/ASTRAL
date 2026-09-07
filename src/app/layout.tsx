import type { Metadata } from "next";
import "./globals.css";
import { RoleProvider } from "@/lib/role-context";

export const metadata: Metadata = {
  title: "Astral — The Transaction Network",
  description: "The transaction network powering real estate deals.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col antialiased">
        <RoleProvider>{children}</RoleProvider>
      </body>
    </html>
  );
}
