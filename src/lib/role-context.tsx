"use client";

import { createContext, useContext, useState } from "react";
import { Role } from "./types";

// Stand-in for real auth. Once login exists, this provider reads the role
// from the session instead of local state — nothing downstream needs to
// change, since every component reads role from this context, not a prop.

interface RoleContextValue {
  role: Role;
  setRole: (role: Role) => void;
}

const RoleContext = createContext<RoleContextValue | undefined>(undefined);

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<Role>("manager");
  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error("useRole must be used within RoleProvider");
  return ctx;
}
