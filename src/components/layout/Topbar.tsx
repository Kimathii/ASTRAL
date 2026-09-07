"use client";

import { useRole } from "@/lib/role-context";
import { Role } from "@/lib/types";

const ROLE_LABEL: Record<Role, string> = {
  manager: "Property Manager",
  agent: "Agent",
  admin: "Admin",
};

// Dev-only affordance: lets you preview all three role views without a real
// login. Remove this switcher once auth exists — session role takes over.
export function Topbar() {
  const { role, setRole } = useRole();

  return (
    <header className="flex h-16 items-center justify-between border-b border-line bg-white px-6">
      <p className="text-sm text-slate">
        Viewing as <span className="font-medium text-ink">{ROLE_LABEL[role]}</span>
      </p>

      <div className="flex items-center gap-3">
        <div className="flex items-center rounded-lg border border-line bg-mist p-0.5 text-sm">
          {(Object.keys(ROLE_LABEL) as Role[]).map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={[
                "rounded-md px-3 py-1.5 font-medium transition",
                role === r ? "bg-white text-blue shadow-sm" : "text-slate hover:text-ink",
              ].join(" ")}
            >
              {ROLE_LABEL[r]}
            </button>
          ))}
        </div>
        <div className="h-8 w-8 rounded-full bg-navy" />
      </div>
    </header>
  );
}
