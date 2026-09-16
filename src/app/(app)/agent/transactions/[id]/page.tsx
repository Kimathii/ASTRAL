import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getTransactionById,
  getPropertyById,
  getAgentById,
  inspections,
  transactionAuditLogs,
} from "@/lib/mock-data";
import { DealStageStepper } from "@/components/ui/DealStageStepper";

function formatNgn(amount: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default async function TransactionWorkspacePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const transaction = getTransactionById(id);
  if (!transaction) notFound();

  const property = getPropertyById(transaction.propertyId);
  const leadAgent = getAgentById(transaction.leadAgentId);
  const collaborator = transaction.collaboratingAgentId
    ? getAgentById(transaction.collaboratingAgentId)
    : null;

  // Filter linked inspections and audit logs for this transaction
  const linkedInspections = inspections.filter((i) => i.transactionId === transaction.id);
  const linkedEvents = transactionAuditLogs.filter((e) => e.transactionId === transaction.id);

  return (
    <div className="mx-auto max-w-5xl">
      {/* Top Bar */}
      <div className="mb-4 flex items-center justify-between">
        <Link
          href="/agent/transactions"
          className="inline-flex items-center gap-1 text-xs font-semibold text-slate hover:text-ink transition"
        >
          ← Back to Active Deals
        </Link>
        <span className="font-mono text-xs text-slate uppercase">
          Transaction ID: <strong className="text-ink">{transaction.id}</strong>
        </span>
      </div>

      {/* Hero Card */}
      <div className="mb-6 rounded-2xl border border-line bg-white p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-line pb-5 mb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="rounded-md bg-blue/10 px-2 py-0.5 text-[11px] font-bold text-blue uppercase">
                {property?.propertyType} Transaction
              </span>
              <span className="text-xs text-slate">Created on {transaction.createdAt}</span>
            </div>
            <h1 className="text-2xl font-bold text-ink">{property?.title}</h1>
            <p className="text-xs text-slate mt-0.5">
              {property?.location} • Managed by <strong>{property?.managerName}</strong>
            </p>
          </div>

          <div className="flex items-baseline gap-2 md:text-right">
            <div>
              <p className="text-[11px] uppercase font-bold text-slate">Agreed Commercial Value</p>
              <p className="text-2xl font-extrabold text-blue">
                {property && formatNgn(property.price)}
                {property?.priceUnit !== "sale" && <span className="text-xs font-normal text-slate"> / year</span>}
              </p>
            </div>
          </div>
        </div>

        {/* 8-Stage Stepper */}
        <div className="pt-1">
          <p className="text-xs font-bold uppercase tracking-wider text-slate mb-3">Transaction Lifecycle</p>
          <DealStageStepper currentStage={transaction.stage} />
        </div>
      </div>

      {/* "What Needs to Happen Next?" Banner */}
      <div className="mb-6 rounded-2xl border-2 border-blue bg-blue/5 p-5 shadow-xs">
        <div className="flex items-start gap-3.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue text-white shadow-xs">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-blue">
                What Needs to Happen Next
              </span>
              {transaction.nextActionRequired.dueBy && (
                <span className="text-xs font-semibold text-slate">
                  Target: {transaction.nextActionRequired.dueBy}
                </span>
              )}
            </div>
            <p className="mt-1 text-sm font-semibold text-ink">
              {transaction.nextActionRequired.instruction}
            </p>
            <div className="mt-3 flex items-center gap-3">
              <button className="rounded-lg bg-blue px-3.5 py-1.5 text-xs font-bold text-white hover:bg-blue/90 transition shadow-xs">
                Log Action Complete
              </button>
              <span className="text-xs text-slate">
                Responsible: <strong className="capitalize text-ink">{transaction.nextActionRequired.actorRole}</strong>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Attribution & Commission + Collaboration + Client */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Protected Commission Agreement */}
        <div className="rounded-2xl border border-line bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-ink">Protected Commission</h2>
            <span className="rounded-full bg-verified/10 px-2 py-0.5 text-[10px] font-bold text-verified">
              Terms Locked
            </span>
          </div>
          <div className="rounded-xl bg-mist p-3 text-center mb-3">
            <p className="text-[11px] text-slate">Total Pool</p>
            <p className="text-xl font-extrabold text-ink mt-0.5">
              {formatNgn(transaction.commissionSplit.totalEstimatedCommissionNgn)}
            </p>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between border-b border-line/60 pb-2">
              <span className="text-slate">Lead Agent ({leadAgent?.name.split(" ")[0]}):</span>
              <strong className="text-ink font-semibold">{transaction.commissionSplit.leadAgentPct}%</strong>
            </div>
            {collaborator && (
              <div className="flex justify-between border-b border-line/60 pb-2">
                <span className="text-slate">Co-broker ({collaborator.name.split(" ")[0]}):</span>
                <strong className="text-blue font-semibold">{transaction.commissionSplit.collaboratingAgentPct}%</strong>
              </div>
            )}
            <div className="flex justify-between pt-1">
              <span className="text-slate">Astral Network Fee:</span>
              <strong className="text-slate font-medium">{transaction.commissionSplit.astralPlatformPct || 0}%</strong>
            </div>
          </div>
        </div>

        {/* One Additional Agent Rule Card */}
        <div className="rounded-2xl border border-line bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-ink">Collaboration Slot</h2>
            <span className="text-[10px] font-mono text-slate uppercase">Rule: Max 1</span>
          </div>

          {collaborator ? (
            <div className="rounded-xl border border-blue/20 bg-ice/50 p-3.5">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue text-xs font-bold text-white">
                  {collaborator.name.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-ink truncate">{collaborator.name}</p>
                  <p className="text-[11px] text-slate truncate">{collaborator.brokerage}</p>
                  <span className="inline-block mt-1 text-[10px] font-bold text-verified">
                    ✓ 50/50 Terms Accepted
                  </span>
                </div>
              </div>
              <div className="mt-3 text-[11px] text-slate border-t border-line/60 pt-2">
                Role: <strong className="text-ink capitalize">{transaction.collaboratingRole?.replace("_", " ")}</strong>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-line p-4 text-center">
              <p className="text-xs text-slate">No co-broker added.</p>
              <p className="text-[10px] text-slate/70 mt-0.5">Originating agent retains 100% split.</p>
              <button className="mt-3 rounded-lg border border-line bg-white px-3 py-1.5 text-xs font-semibold text-ink hover:bg-mist transition">
                + Invite Co-broker (Max 1)
              </button>
            </div>
          )}

          <div className="mt-3 text-[10px] text-slate">
            *Astral strictly enforces a 1-additional-agent limit on this mandate to prevent commission dilution.
          </div>
        </div>

        {/* Associated Client / Consumer Reference */}
        <div className="rounded-2xl border border-line bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-ink">Client Association</h2>
            <span className="text-[10px] font-mono text-slate uppercase">Consumer Ref</span>
          </div>

          {transaction.clientRef ? (
            <div className="rounded-xl bg-mist p-3.5 space-y-2 text-xs">
              <div>
                <span className="text-slate text-[11px]">Associated Client:</span>
                <p className="text-sm font-bold text-ink mt-0.5">{transaction.clientRef.name}</p>
              </div>
              <div>
                <span className="text-slate text-[11px]">Contact (Protected):</span>
                <p className="font-mono text-xs text-slate">{transaction.clientRef.phoneOrEmailMasked}</p>
              </div>
              <div className="border-t border-line/60 pt-2 text-[11px] text-slate">
                Introduced by: <strong className="text-ink">{collaborator?.name || leadAgent?.name}</strong>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-line p-4 text-center">
              <p className="text-xs text-slate">No client associated yet.</p>
              <button className="mt-3 rounded-lg bg-blue px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue/90 transition">
                Associate Buyer/Tenant
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Inspections & Physical Viewings Section */}
      <div className="mb-6 rounded-2xl border border-line bg-white p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-ink">Physical Inspections & Verification</h2>
            <p className="text-xs text-slate mt-0.5">Site visits completed for this transaction.</p>
          </div>
          <button className="rounded-lg bg-blue px-3.5 py-2 text-xs font-semibold text-white hover:bg-blue/90 transition">
            + Schedule New Inspection
          </button>
        </div>

        {linkedInspections.length > 0 ? (
          <div className="space-y-3">
            {linkedInspections.map((insp) => (
              <div key={insp.id} className="rounded-xl border border-line/70 bg-mist p-4 text-xs">
                <div className="flex items-center justify-between font-semibold mb-2">
                  <span className="text-ink">
                    Viewing Scheduled: {insp.scheduledFor ? new Date(insp.scheduledFor).toLocaleString("en-NG", { dateStyle: "medium", timeStyle: "short" }) : "TBD"}
                  </span>
                  <span className="rounded-full bg-blue/10 text-blue px-2.5 py-0.5 uppercase text-[10px]">
                    {insp.status}
                  </span>
                </div>
                {insp.feedback && (
                  <div className="rounded-lg bg-white p-3 border border-line/60 mt-2">
                    <div className="flex justify-between text-slate font-medium mb-1">
                      <span>Interest: <strong className="text-blue capitalize">{insp.feedback.interestLevel}</strong></span>
                      <span>Property Accuracy: <strong>{insp.feedback.propertyAccuracyScore}/5</strong></span>
                    </div>
                    {insp.feedback.clientFeedbackNotes && (
                      <p className="italic text-slate mt-1">&ldquo;{insp.feedback.clientFeedbackNotes}&rdquo;</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate italic">No inspection logged for this transaction yet.</p>
        )}
      </div>

      {/* Tamper-Evident Transaction Audit Log */}
      <div className="rounded-2xl border border-line bg-white p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-ink">Transaction Audit Trail</h2>
            <p className="text-xs text-slate mt-0.5">
              Append-only event log establishing attribution even if deal communication moves offline.
            </p>
          </div>
          <span className="font-mono text-[10px] text-verified font-bold uppercase">
            ✓ Cryptographically Timestamped
          </span>
        </div>

        <div className="space-y-3 border-l-2 border-line pl-4 ml-2">
          {linkedEvents.map((evt) => (
            <div key={evt.id} className="relative">
              <div className="absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full bg-blue ring-4 ring-white" />
              <div className="text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-ink">{evt.summary}</span>
                  <span className="text-[10px] text-slate">
                    {new Date(evt.timestamp).toLocaleString("en-NG", { dateStyle: "short", timeStyle: "short" })}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate uppercase">Actor: {evt.actorId} ({evt.actorRole})</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
