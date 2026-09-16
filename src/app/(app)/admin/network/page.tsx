import Link from "next/link";
import { transactions, properties, agents, transactionAuditLogs } from "@/lib/mock-data";
import { DealStageStepper } from "@/components/ui/DealStageStepper";

function formatNgn(amount: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function AdminNetworkPage() {
  return (
    <div className="mx-auto max-w-6xl">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-line pb-5">
        <div>
          <h1 className="text-2xl font-bold text-ink">Transaction Ledger & Dispute Intervention</h1>
          <p className="mt-1 text-sm text-slate">
            System-wide oversight into deal progression, verified agent splits, and tamper-evident audit logs.
          </p>
        </div>
        <Link
          href="/admin"
          className="text-xs font-semibold text-slate hover:text-ink transition"
        >
          ← Back to Admin Console
        </Link>
      </div>

      {/* Active Transactions Ledger */}
      <div className="mb-10">
        <h2 className="text-lg font-bold text-ink mb-3">Live Transactions Across Network</h2>

        <div className="space-y-4">
          {transactions.map((tx) => {
            const property = properties.find((p) => p.id === tx.propertyId);
            const lead = agents.find((a) => a.id === tx.leadAgentId);
            const collab = tx.collaboratingAgentId ? agents.find((a) => a.id === tx.collaboratingAgentId) : null;
            const events = transactionAuditLogs.filter((e) => e.transactionId === tx.id);

            return (
              <div key={tx.id} className="rounded-2xl border border-line bg-white p-5 shadow-xs">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-line/60 pb-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs font-bold text-blue">{tx.id}</span>
                      <span className="text-xs text-slate">• Passport: {property?.id}</span>
                      <span className="rounded-full bg-verified/10 text-verified px-2 py-0.5 text-[10px] font-bold">
                        Attribution Locked
                      </span>
                    </div>
                    <h3 className="font-bold text-ink text-base">{property?.title}</h3>
                    <p className="text-xs text-slate mt-0.5">
                      Supply: <strong>{property?.managerName}</strong> • Associated Client: <strong>{tx.clientRef?.name || "None"}</strong>
                    </p>
                  </div>

                  <div className="flex items-baseline gap-2">
                    <div className="text-right">
                      <p className="text-[10px] uppercase font-bold text-slate">Estimated Total Commission</p>
                      <p className="text-base font-extrabold text-blue">
                        {formatNgn(tx.commissionSplit.totalEstimatedCommissionNgn)}
                      </p>
                    </div>
                    <Link
                      href={`/agent/transactions/${tx.id}`}
                      className="rounded-xl bg-navy px-3.5 py-2 text-xs font-semibold text-white hover:bg-navy/90 transition shadow-xs ml-3"
                    >
                      Deal Room →
                    </Link>
                  </div>
                </div>

                <div className="mb-4">
                  <DealStageStepper currentStage={tx.stage} />
                </div>

                {/* Attribution Breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-mist p-3.5 rounded-xl border border-line/60">
                  <div>
                    <span className="text-slate">Lead Distributing Agent:</span>
                    <p className="font-bold text-ink mt-0.5">{lead?.name} ({tx.commissionSplit.leadAgentPct}%)</p>
                  </div>
                  <div>
                    <span className="text-slate">Co-broker (1-Agent Rule):</span>
                    <p className="font-bold text-blue mt-0.5">
                      {collab ? `${collab.name} (${tx.commissionSplit.collaboratingAgentPct}%)` : "No collaborator (Direct)"}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate">Next Transaction Step:</span>
                    <p className="font-medium text-ink mt-0.5 truncate">{tx.nextActionRequired.instruction}</p>
                  </div>
                </div>

                {/* Audit Trail Preview */}
                {events.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-line/60 text-xs">
                    <span className="font-bold text-slate uppercase text-[10px] tracking-wider">
                      Recent Cryptographic Audit Event:
                    </span>
                    <p className="text-slate mt-0.5 italic">
                      &ldquo;{events[events.length - 1].summary}&rdquo; — {new Date(events[events.length - 1].timestamp).toLocaleString("en-NG")}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Verified Agent Directory */}
      <div>
        <h2 className="text-lg font-bold text-ink mb-3">Verified Agent Network</h2>
        <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-xs">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-line bg-mist text-slate font-bold uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3">Agent</th>
                <th className="px-4 py-3">Brokerage</th>
                <th className="px-4 py-3">Operating Hubs</th>
                <th className="px-4 py-3">Active Deals</th>
                <th className="px-4 py-3">Closed Deals</th>
                <th className="px-4 py-3">Reputation Tier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line/60">
              {agents.map((agent) => (
                <tr key={agent.id} className="hover:bg-mist/50 transition">
                  <td className="px-4 py-3 font-bold text-ink flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue text-[10px] font-bold text-white">
                      {agent.name.charAt(0)}
                    </div>
                    <span>{agent.name}</span>
                  </td>
                  <td className="px-4 py-3 text-slate">{agent.brokerage}</td>
                  <td className="px-4 py-3 text-slate">{agent.operatingAreas.slice(0, 2).join(", ")}</td>
                  <td className="px-4 py-3 font-bold text-blue">{agent.activeTransactionsCount}</td>
                  <td className="px-4 py-3 font-bold text-ink">{agent.closedDealsCount}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-navy/10 px-2.5 py-0.5 font-bold uppercase text-[10px] text-navy">
                      {agent.reputationBadge.replace("_", " ")}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
