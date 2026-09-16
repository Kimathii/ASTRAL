import Link from "next/link";
import { properties, agents, transactions, inspections } from "@/lib/mock-data";
import { DEAL_STAGES } from "@/lib/types";

function formatNgn(amount: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function AdminOverviewPage() {
  const pendingReview = properties.filter((p) => p.verificationStatus === "pending");
  const flaggedListings = properties.filter((p) => p.verificationStatus === "flagged");
  const verifiedProperties = properties.filter((p) => p.verificationStatus === "verified");

  const totalPipelineGmv = transactions.reduce((acc, tx) => {
    const prop = properties.find((p) => p.id === tx.propertyId);
    return acc + (prop ? prop.price : 0);
  }, 0);

  return (
    <div className="mx-auto max-w-6xl">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-line pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-navy px-2 py-0.5 text-xs font-bold text-sky uppercase">
              Astral Admin Console
            </span>
            <span className="text-xs text-slate">• Network Oversight & Verification</span>
          </div>
          <h1 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-ink">
            Network Command & Dispute Oversight
          </h1>
          <p className="mt-1 text-sm text-slate">
            Review submitted property passports, resolve duplicate alerts, and monitor transaction integrity.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/approvals"
            className="inline-flex items-center gap-2 rounded-xl bg-blue px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-blue/90 transition"
          >
            <span>Verification Queue</span>
            {(pendingReview.length > 0 || flaggedListings.length > 0) && (
              <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-bold text-blue">
                {pendingReview.length + flaggedListings.length}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Network Health KPI Stats */}
      <div className="mb-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-line bg-white p-4 shadow-xs">
          <p className="text-xs font-medium text-slate">Verified Passports</p>
          <p className="mt-1 text-2xl font-bold text-ink">{verifiedProperties.length}</p>
          <span className="text-[11px] text-verified font-medium">Canonical Records</span>
        </div>

        <div className="rounded-2xl border border-line bg-white p-4 shadow-xs">
          <p className="text-xs font-medium text-slate">Transactions in Flight</p>
          <p className="mt-1 text-2xl font-bold text-blue">{transactions.length}</p>
          <span className="text-[11px] text-slate font-medium">Active broker deals</span>
        </div>

        <div className="rounded-2xl border border-line bg-white p-4 shadow-xs">
          <p className="text-xs font-medium text-slate">Pipeline GMV</p>
          <p className="mt-1 text-2xl font-bold text-ink truncate">{formatNgn(totalPipelineGmv)}</p>
          <span className="text-[11px] text-slate font-medium">Active transacted volume</span>
        </div>

        <div className="rounded-2xl border border-line bg-white p-4 shadow-xs">
          <p className="text-xs font-medium text-slate">Verification Alerts</p>
          <p className={`mt-1 text-2xl font-bold ${pendingReview.length + flaggedListings.length > 0 ? "text-pending" : "text-ink"}`}>
            {pendingReview.length + flaggedListings.length}
          </p>
          <span className="text-[11px] text-slate font-medium">{flaggedListings.length} duplicates flagged</span>
        </div>
      </div>

      {/* Critical Action Alerts: Pending Passports & Duplicate Flags */}
      {(pendingReview.length > 0 || flaggedListings.length > 0) && (
        <div className="mb-8 space-y-3">
          {flaggedListings.map((prop) => (
            <div
              key={prop.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 shadow-2xs"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-amber-600 font-bold">
                  ⚠️
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Duplicate Listing Alert</span>
                    <span className="text-xs text-slate">• {prop.location}</span>
                  </div>
                  <p className="text-sm font-semibold text-ink mt-0.5">{prop.title}</p>
                  <p className="text-xs text-slate mt-0.5">{prop.verificationNotes}</p>
                </div>
              </div>
              <Link
                href="/admin/approvals"
                className="self-start sm:self-center rounded-xl bg-amber-600 px-4 py-2 text-xs font-bold text-white hover:bg-amber-700 transition shadow-xs shrink-0"
              >
                Review Conflict →
              </Link>
            </div>
          ))}

          {pendingReview.map((prop) => (
            <div
              key={prop.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-pending/30 bg-pending/5 p-4 shadow-2xs"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-pending/20 text-pending font-bold">
                  ⏳
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-pending uppercase tracking-wider">Mandate Review Required</span>
                    <span className="text-xs text-slate">• Submitted by {prop.managerName}</span>
                  </div>
                  <p className="text-sm font-semibold text-ink mt-0.5">{prop.title}</p>
                  <p className="text-xs text-slate mt-0.5">Agent-supplied submission awaiting title deeds check.</p>
                </div>
              </div>
              <Link
                href="/admin/approvals"
                className="self-start sm:self-center rounded-xl bg-pending px-4 py-2 text-xs font-bold text-white hover:bg-pending/90 transition shadow-xs shrink-0"
              >
                Review Passport →
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* Deal Pipeline Progression Tracker (8 Stages) */}
      <div className="mb-8 rounded-2xl border border-line bg-white p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-ink">Network Transaction Progression</h2>
            <p className="text-xs text-slate">Deals currently mapped across the 8-stage Astral Link state machine.</p>
          </div>
          <Link href="/admin/network" className="text-xs font-semibold text-blue hover:underline">
            Inspect All Deals →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {DEAL_STAGES.map((s, idx) => {
            const count = transactions.filter((t) => t.stage === s.key).length;
            return (
              <div key={s.key} className="rounded-xl border border-line bg-mist p-3 text-center">
                <span className="text-[10px] font-bold text-slate uppercase">Step {idx + 1}</span>
                <p className="text-xs font-bold text-ink mt-0.5 truncate" title={s.label}>{s.label}</p>
                <p className="text-xl font-extrabold text-blue mt-1">{count}</p>
                <span className="text-[10px] text-slate/70">Deals</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
