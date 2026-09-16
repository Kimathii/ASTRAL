import { VerificationStatus } from "@/lib/types";

const CONFIG: Record<string, { label: string; className: string }> = {
  verified: { label: "Verified", className: "bg-verified/10 text-verified border-verified/30" },
  pending: { label: "Pending Review", className: "bg-pending/10 text-pending border-pending/30" },
  flagged: { label: "Flagged", className: "bg-amber-500/10 text-amber-600 border-amber-500/30" },
  suspended: { label: "Suspended", className: "bg-rejected/10 text-rejected border-rejected/30" },
  closed: { label: "Closed / Unavailable", className: "bg-slate/10 text-slate border-slate/30" },
  rejected: { label: "Rejected", className: "bg-rejected/10 text-rejected border-rejected/30" },
};

export function VerificationBadge({ status }: { status: VerificationStatus }) {
  const { label, className } = CONFIG[status];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${className}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
}
