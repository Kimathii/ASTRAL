import { notFound } from "next/navigation";
import Link from "next/link";
import { getPropertyById, transactions, agents, inspections } from "@/lib/mock-data";
import { VerificationBadge } from "@/components/ui/VerificationBadge";
import { DealStageStepper } from "@/components/ui/DealStageStepper";

function formatNgn(amount: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default async function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const property = getPropertyById(id);
  if (!property) notFound();

  // Find transactions associated with this property
  const linkedTransactions = transactions.filter((t) => t.propertyId === property.id);
  const linkedInspections = inspections.filter((i) => i.propertyId === property.id);

  const priceDisplay =
    property.priceUnit === "sale"
      ? formatNgn(property.price)
      : `${formatNgn(property.price)} / year`;

  return (
    <div className="mx-auto max-w-4xl">
      {/* Top Breadcrumbs */}
      <div className="mb-4 flex items-center justify-between">
        <Link
          href="/manager"
          className="inline-flex items-center gap-1 text-xs font-semibold text-slate hover:text-ink transition"
        >
          ← Back to PM Dashboard
        </Link>
        <span className="font-mono text-xs text-slate uppercase">Passport ID: {property.id}</span>
      </div>

      {/* Hero Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-start justify-between gap-4 rounded-2xl border border-line bg-white p-6 shadow-xs">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <VerificationBadge status={property.verificationStatus} />
            <span className="rounded-md bg-ice px-2 py-0.5 text-xs font-bold text-blue">
              {property.propertyType}
            </span>
            <span className="text-xs text-slate">Verified by Astral Admin</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-ink">{property.title}</h1>
          <p className="mt-1 text-sm text-slate">{property.location} • {property.addressSummary}</p>
          <p className="mt-3 text-2xl font-extrabold text-blue">{priceDisplay}</p>
        </div>

        <div className="flex flex-col gap-2 w-full md:w-auto shrink-0">
          <button className="rounded-xl bg-blue px-4 py-2.5 text-xs font-bold text-white hover:bg-blue/90 transition shadow-xs">
            Edit Commercial Terms
          </button>
          <Link
            href={`/catalogue/chiamaka-nwosu`}
            className="rounded-xl border border-line bg-white px-4 py-2.5 text-center text-xs font-semibold text-ink hover:bg-mist transition"
          >
            Preview Live Distribution
          </Link>
        </div>
      </div>

      {/* Grid: Commercial Mandate Terms & Assigned Distributing Agents */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Commercial Terms Configuration */}
        <div className="rounded-2xl border border-line bg-white p-6 shadow-xs">
          <h2 className="text-base font-bold text-ink mb-3">Commercial Terms & Rules</h2>
          <div className="space-y-3 text-xs">
            <div className="flex justify-between border-b border-line/60 pb-2.5">
              <span className="text-slate">Listing Agency Fee:</span>
              <strong className="text-blue font-bold text-sm">{property.commercialTerms.totalCommissionPct}%</strong>
            </div>
            <div className="flex justify-between border-b border-line/60 pb-2.5">
              <span className="text-slate">Collaboration Allowed:</span>
              <strong className="text-ink font-semibold">
                {property.commercialTerms.collaborationAllowed ? "Yes (Permitted)" : "No (Direct only)"}
              </strong>
            </div>
            <div className="flex justify-between border-b border-line/60 pb-2.5">
              <span className="text-slate">Co-broker Constraint:</span>
              <strong className="text-ink font-semibold">
                Max {property.commercialTerms.maxCollaboratingAgents} Additional Agent
              </strong>
            </div>
            <div className="flex justify-between pt-1">
              <span className="text-slate">Verification Status:</span>
              <strong className="capitalize text-verified font-bold">{property.verificationStatus}</strong>
            </div>
          </div>

          {property.commercialTerms.notes && (
            <div className="mt-4 rounded-xl bg-mist p-3 text-xs text-slate">
              <p className="font-semibold text-ink">Mandate Instructions:</p>
              <p className="italic mt-0.5">&ldquo;{property.commercialTerms.notes}&rdquo;</p>
            </div>
          )}
        </div>

        {/* Authorized Agents Distributing This Property */}
        <div className="rounded-2xl border border-line bg-white p-6 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-ink">Authorized Distributing Agents</h2>
            <span className="text-xs font-bold text-blue">{property.assignedAgentIds.length} Agents</span>
          </div>
          <p className="text-xs text-slate mb-4">
            Verified brokers authorized to bring buyers and conduct inspections.
          </p>

          <div className="space-y-2.5">
            {property.assignedAgentIds.map((agentId) => {
              const agent = agents.find((a) => a.id === agentId);
              if (!agent) return null;

              return (
                <div key={agent.id} className="flex items-center justify-between rounded-xl bg-mist p-3 text-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue text-xs font-bold text-white">
                      {agent.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-ink">{agent.name}</p>
                      <p className="text-[11px] text-slate">{agent.brokerage}</p>
                    </div>
                  </div>
                  <Link
                    href={`/catalogue/${agent.catalogueSlug}`}
                    className="text-blue font-semibold hover:underline"
                  >
                    Catalogue →
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Active Transactions & Inspection Activity */}
      <div className="rounded-2xl border border-line bg-white p-6 shadow-xs mb-6">
        <h2 className="text-base font-bold text-ink mb-4">Transactions & Deals in Flight</h2>
        {linkedTransactions.length > 0 ? (
          <div className="space-y-4">
            {linkedTransactions.map((tx) => (
              <div key={tx.id} className="rounded-xl border border-line/70 p-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <span className="font-mono text-xs font-bold text-blue">{tx.id}</span>
                    <h3 className="font-bold text-ink text-sm">
                      Buyer/Tenant: {tx.clientRef?.name || "Client Associated"}
                    </h3>
                  </div>
                  <Link
                    href={`/agent/transactions/${tx.id}`}
                    className="rounded-lg bg-navy px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-navy/90 transition shadow-xs self-start"
                  >
                    Open Deal Room →
                  </Link>
                </div>

                <DealStageStepper currentStage={tx.stage} />

                <div className="mt-3 rounded-lg bg-mist p-2.5 text-xs flex justify-between items-center text-slate">
                  <span>
                    Current Action: <strong className="text-ink">{tx.nextActionRequired.instruction}</strong>
                  </span>
                  <span className="font-bold text-blue">{tx.commissionSplit.leadAgentPct}% / {tx.commissionSplit.collaboratingAgentPct || 0}% Split</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate italic">No transactions initiated on this property yet.</p>
        )}
      </div>

      {/* Inspection Viewings */}
      {linkedInspections.length > 0 && (
        <div className="rounded-2xl border border-line bg-white p-6 shadow-xs">
          <h2 className="text-base font-bold text-ink mb-3">Site Inspections Logged</h2>
          <div className="space-y-3">
            {linkedInspections.map((insp) => (
              <div key={insp.id} className="rounded-xl bg-mist p-3.5 text-xs border border-line/60">
                <div className="flex justify-between items-center font-semibold mb-1">
                  <span className="text-ink">Viewing Status: <strong className="capitalize text-blue">{insp.status}</strong></span>
                  <span className="text-slate">Requested {insp.requestedAt}</span>
                </div>
                {insp.feedback && (
                  <div className="mt-2 text-slate">
                    <span>Feedback rating: <strong>{insp.feedback.propertyAccuracyScore}/5</strong> ({insp.feedback.interestLevel} interest)</span>
                    {insp.feedback.clientFeedbackNotes && (
                      <p className="mt-1 italic">&ldquo;{insp.feedback.clientFeedbackNotes}&rdquo;</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
