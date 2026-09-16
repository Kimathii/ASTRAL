import Link from "next/link";
import { properties } from "@/lib/mock-data";
import { VerificationBadge } from "@/components/ui/VerificationBadge";

function formatNgn(amount: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function ApprovalQueuePage() {
  const pending = properties.filter((p) => p.verificationStatus === "pending");
  const flagged = properties.filter((p) => p.verificationStatus === "flagged");

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6 flex items-center justify-between border-b border-line pb-4">
        <div>
          <h1 className="text-2xl font-bold text-ink">Passport Verification & Anti-Duplication Desk</h1>
          <p className="mt-1 text-sm text-slate">
            Human-in-the-loop review for new Property Passports and AI-assisted duplicate detection.
          </p>
        </div>
        <Link
          href="/admin"
          className="text-xs font-semibold text-slate hover:text-ink transition"
        >
          ← Back to Admin Console
        </Link>
      </div>

      {/* Flagged / Duplicate Alerts Section */}
      {flagged.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-white text-xs font-bold">
              !
            </span>
            <h2 className="text-base font-bold text-ink">Flagged Duplicate Submissions ({flagged.length})</h2>
          </div>

          <div className="space-y-4">
            {flagged.map((property) => (
              <div
                key={property.id}
                className="rounded-2xl border-2 border-amber-500/40 bg-amber-500/5 p-5 shadow-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <VerificationBadge status={property.verificationStatus} />
                      <span className="font-mono text-xs text-slate font-semibold uppercase">{property.id}</span>
                      <span className="text-xs text-slate">• {property.sourceType}</span>
                    </div>

                    <h3 className="font-bold text-ink text-lg">{property.title}</h3>
                    <p className="text-xs text-slate mt-0.5">{property.location} • {property.addressSummary}</p>
                    <p className="text-sm font-bold text-blue mt-1">
                      {formatNgn(property.price)} / year
                    </p>

                    {/* AI Duplicate Detection Reasoning */}
                    <div className="mt-3 rounded-xl bg-white p-3.5 border border-amber-500/20 text-xs">
                      <p className="font-bold text-amber-700 flex items-center gap-1.5">
                        <span>🤖 Detection Signal:</span>
                        <span>92% Confidence Match with Canonical Passport PROP-1</span>
                      </p>
                      <p className="text-slate mt-1 leading-relaxed">
                        Address matched: &ldquo;Jabi Lake Axis, Off Shehu Yar&apos;Adua Way&rdquo;. Price (₦4,500,000) and room count (3 Beds) are identical to Amarachi Longws&apos;s verified PM mandate.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 shrink-0">
                    <button className="rounded-xl bg-navy px-4 py-2 text-xs font-bold text-white hover:bg-navy/90 transition shadow-xs">
                      Merge into Canonical PROP-1
                    </button>
                    <button className="rounded-xl border border-red-200 bg-white px-4 py-2 text-xs font-bold text-rejected hover:bg-red-50 transition">
                      Reject as Unauthorized
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pending Review Section */}
      <div>
        <h2 className="text-base font-bold text-ink mb-3">Pending Mandate Approvals ({pending.length})</h2>

        <div className="space-y-4">
          {pending.map((property) => (
            <div
              key={property.id}
              className="rounded-2xl border border-line bg-white p-5 shadow-xs transition hover:border-blue/40"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <VerificationBadge status={property.verificationStatus} />
                    <span className="font-mono text-xs text-slate font-semibold uppercase">{property.id}</span>
                    <span className="text-xs text-slate">• {property.sourceType === "agent_supplied" ? "Agent-Supplied" : "PM Direct"}</span>
                  </div>

                  <h3 className="font-bold text-ink text-lg">{property.title}</h3>
                  <p className="text-xs text-slate mt-0.5">{property.location} • {property.addressSummary}</p>
                  <p className="text-sm font-bold text-blue mt-1">
                    {formatNgn(property.price)} / year
                  </p>

                  <div className="mt-3 rounded-xl bg-mist p-3 text-xs border border-line/60">
                    <p className="font-bold text-ink">Source Mandate & Commercials:</p>
                    <p className="text-slate mt-0.5">
                      Submitted by: <strong>{property.managerName}</strong> • {property.commercialTerms.totalCommissionPct}% Fee • Co-broker limit: {property.commercialTerms.maxCollaboratingAgents} Agent
                    </p>
                    {property.commercialTerms.notes && (
                      <p className="text-slate/80 italic mt-1">&ldquo;{property.commercialTerms.notes}&rdquo;</p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-2 shrink-0">
                  <button className="rounded-xl bg-verified px-4 py-2.5 text-xs font-bold text-white hover:bg-verified/90 transition shadow-xs">
                    ✓ Approve & Mint Passport
                  </button>
                  <button className="rounded-xl border border-amber-500/30 bg-amber-50 px-4 py-2 text-xs font-semibold text-amber-700 hover:bg-amber-100 transition">
                    Flag for Additional Mandate Docs
                  </button>
                  <button className="rounded-xl border border-line bg-white px-4 py-2 text-xs font-semibold text-slate hover:bg-mist transition">
                    Decline Submission
                  </button>
                </div>
              </div>
            </div>
          ))}

          {pending.length === 0 && (
            <div className="rounded-2xl border border-dashed border-line bg-white p-8 text-center text-xs text-slate">
              All submissions verified. No pending passports waiting in queue.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
