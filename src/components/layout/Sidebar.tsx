"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRole } from "@/lib/role-context";

// Nav items are permission-aware: each role sees a different set, but it's
// the same Sidebar component rendering all three — not three sidebars.

const NAV_BY_ROLE = {
  manager: [
    { href: "/manager", label: "Dashboard" },
    { href: "/manager/properties", label: "My properties" },
  ],
  agent: [
    { href: "/agent", label: "Opportunities" },
    { href: "/agent/inspections", label: "My inspections" },
  ],
  admin: [
    { href: "/admin", label: "Overview" },
    { href: "/admin/approvals", label: "Approval queue" },
    { href: "/admin/network", label: "Network activity" },
  ],
};

export function Sidebar() {
  const { role } = useRole();
  const pathname = usePathname();
  const items = NAV_BY_ROLE[role];

  return (
    <aside className="hidden w-56 shrink-0 flex-col border-r border-line bg-white md:flex">
      <div className="flex h-16 items-center gap-2 px-5">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-navy">
          <div className="h-3 w-3 rounded-sm bg-sky" />
        </div>
        <span className="text-[15px] font-semibold tracking-tight text-navy">Astral</span>
      </div>

      <nav className="flex flex-1 flex-col gap-0.5 px-3 py-2">
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "rounded-lg px-3 py-2 text-sm font-medium transition",
                active ? "bg-ice text-blue" : "text-slate hover:bg-mist hover:text-ink",
              ].join(" ")}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-line px-5 py-4 text-xs text-slate">
        <span className="font-medium text-ink">Pilot phase</span> — starting October
      </div>
    </aside>
  );
}
