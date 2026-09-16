import Link from "next/link";
import { transactions, properties, agents } from "@/lib/mock-data";
import { DealStageStepper } from "@/components/ui/DealStageStepper";

function formatNgn(amount: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function AgentTransactionsPage() {
  return (
    <div className="mx-auto max-w-5xl">
      {/* Header */}
      <div className="mb-6 flex items-end justify-between border-b border-line pb-4">
        <div>
          <h1 className="text-2xl font-bold text-ink">Active Deals & Transactions</h1>
          <p className="mt-1 text-sm text-slate">
            Track transactions from client association through inspection, offer, and commission close.
          </p>
        </div>
        <Link
          href="/agent"
          className="rounded-lg bg-blue px-3.5 py-2 text-xs font-semibold text-white hover:bg-blue/90 transition"
        >
          + Work New Opportunity
        </Link>
      </div>

      {/* Transactions List */}
      <div className="flex flex-col gap-4">
        {transactions.map((tx) => {
          const property = properties.find((p) => p.id === tx.propertyId);
          const collaborator = tx.collaboratingAgentId
            ? agents.find((a) => a.id === tx.collaboratingAgentId)
            : null;

          return (
            <div
              key={tx.id}
              className="flex flex-col md:flex-row md:items-center justify-between gap-5 rounded-2xl border border-line bg-white p-5 shadow-xs transition hover:border-blue/40 hover:shadow-md"
            >
              {/* Left Column: Property & Deal Identification */}
              <div className="flex items-start gap-4 flex-1 min-w-0">
                {property?.images?.[0] ? (
                  <img
                    src={property.images[0]}
                    alt=""
                    className="h-20 w-24 rounded-xl object-cover shrink-0 border border-line/50"
                  />
                ) : (
                  <div className="h-20 w-24 rounded-xl bg-slate/10 shrink-0" />
                )}

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-bold text-blue">{tx.id}</span>
                    <span className="text-xs text-slate">•</span>
                    <span className="text-xs text-slate truncate">{property?.location}</span>
                  </div>

                  <h3 className="font-bold text-ink text-base truncate">{property?.title}</h3>

                  <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-slate">
                    {tx.clientRef && (
                      <span className="truncate">
                        Client: <strong className="text-ink">{tx.clientRef.name}</strong>
                      </span>
                    )}
                    {collaborator && (
                      <span className="truncate">
                        Co-broker: <strong className="text-blue">{collaborator.name}</strong> (50/50 Split)
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Middle Column: Current Stage & Next Action */}
              <div className="md:w-64 shrink-0 rounded-xl bg-mist p-3 border border-line/60">
                <div className="flex items-center justify-between mb-1">
                  <DealStageStepper currentStage={tx.stage} compact />
                </div>
                <p className="text-[11px] text-slate line-clamp-2 mt-1">
                  <strong className="text-ink font-semibold">Next: </strong>
                  {tx.nextActionRequired.instruction}
                </p>
              </div>

              {/* Right Column: Economics & View Button */}
              <div className="flex md:flex-col items-end justify-between md:justify-center gap-2 shrink-0 border-t md:border-t-0 border-line/60 pt-3 md:pt-0">
                <div className="text-left md:text-right">
                  <p className="text-[10px] uppercase font-bold text-slate">Est. Split Fee</p>
                  <p className="text-base font-extrabold text-ink">
                    {formatNgn(tx.commissionSplit.totalEstimatedCommissionNgn)}
                  </p>
                </div>

                <Link
                  href={`/agent/transactions/${tx.id}`}
                  className="rounded-xl bg-navy px-4 py-2 text-xs font-semibold text-white hover:bg-navy/90 transition shadow-xs"
                >
                  Open Workspace →
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
