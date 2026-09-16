import Link from "next/link";
import { properties, transactions, agents, inspections } from "@/lib/mock-data";
import { VerificationBadge } from "@/components/ui/VerificationBadge";
import { DealStageStepper } from "@/components/ui/DealStageStepper";

function formatNgn(amount: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function ManagerDashboard() {
  // Current logged in PM: Amarachi Longws ("mgr_1")
  const myProperties = properties.filter((p) => p.managerId === "mgr_1");
  const myPropertyIds = myProperties.map((p) => p.id);

  // Transactions active on this PM's properties
  const myTransactions = transactions.filter((t) => myPropertyIds.includes(t.propertyId));

  // Inspections linked to this PM's inventory
  const myInspections = inspections.filter((i) => myPropertyIds.includes(i.propertyId));

  const totalInventoryValue = myProperties.reduce((acc, p) => acc + p.price, 0);

  return (
    <div className="mx-auto max-w-6xl">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-line pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-blue/10 px-2 py-0.5 text-xs font-bold text-blue uppercase">
              Property Manager Portal
            </span>
            <span className="text-xs text-slate">• Supply Side</span>
          </div>
          <h1 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-ink">
            Good to see you, Amarachi
          </h1>
          <p className="mt-1 text-sm text-slate">
            Manage your canonical property passports, monitor authorized agent distribution, and track live transactions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/manager/properties"
            className="inline-flex items-center gap-1.5 rounded-xl bg-blue px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-blue/90 transition"
          >
            <span>+ Submit New Property</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="mb-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-line bg-white p-4 shadow-xs">
          <p className="text-xs font-medium text-slate">Listed Passports</p>
          <p className="mt-1 text-2xl font-bold text-ink">{myProperties.length}</p>
          <span className="text-[11px] text-verified font-medium">100% Verified</span>
        </div>

        <div className="rounded-2xl border border-line bg-white p-4 shadow-xs">
          <p className="text-xs font-medium text-slate">Active In-Flight Deals</p>
          <p className="mt-1 text-2xl font-bold text-blue">{myTransactions.length}</p>
          <span className="text-[11px] text-slate font-medium">Across your mandates</span>
        </div>

        <div className="rounded-2xl border border-line bg-white p-4 shadow-xs">
          <p className="text-xs font-medium text-slate">Upcoming Inspections</p>
          <p className="mt-1 text-2xl font-bold text-ink">{myInspections.length}</p>
          <span className="text-[11px] text-slate font-medium">Client viewings booked</span>
        </div>

        <div className="rounded-2xl border border-line bg-white p-4 shadow-xs">
          <p className="text-xs font-medium text-slate">Total Mandate Portfolio</p>
          <p className="mt-1 text-2xl font-bold text-ink truncate">{formatNgn(totalInventoryValue)}</p>
          <span className="text-[11px] text-slate font-medium">Annualized listing value</span>
        </div>
      </div>

      {/* Section 1: Active Transactions / What Needs to Happen Next */}
      <div className="mb-8">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-ink">Active Transactions on Your Mandates</h2>
            <p className="text-xs text-slate">Deals currently being distributed and worked by Astral agents.</p>
          </div>
          <Link href="/agent/transactions" className="text-xs font-semibold text-blue hover:underline">
            View All Deal Logs →
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          {myTransactions.map((tx) => {
            const property = properties.find((p) => p.id === tx.propertyId);
            const leadAgent = agents.find((a) => a.id === tx.leadAgentId);
            const collaborator = tx.collaboratingAgentId ? agents.find((a) => a.id === tx.collaboratingAgentId) : null;

            return (
              <div
                key={tx.id}
                className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-2xl border border-line bg-white p-5 shadow-xs"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-bold text-blue">{tx.id}</span>
                    <span className="text-xs text-slate">•</span>
                    <span className="text-xs font-medium text-ink truncate">{property?.title}</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate mt-1.5">
                    <span>
                      Lead Agent: <strong className="text-ink">{leadAgent?.name}</strong>
                    </span>
                    {collaborator && (
                      <span>
                        Co-broker: <strong className="text-blue">{collaborator.name}</strong> (1 Additional Agent Enforced)
                      </span>
                    )}
                    {tx.clientRef && (
                      <span>
                        Buyer/Tenant: <strong className="text-ink">{tx.clientRef.name}</strong>
                      </span>
                    )}
                  </div>
                </div>

                <div className="md:w-64 shrink-0 rounded-xl bg-mist p-3 border border-line/60">
                  <DealStageStepper currentStage={tx.stage} compact />
                  <p className="text-[11px] text-slate mt-1 line-clamp-1">
                    <strong className="text-ink font-semibold">Action: </strong>
                    {tx.nextActionRequired.instruction}
                  </p>
                </div>

                <div className="shrink-0 flex items-center gap-3 border-t md:border-t-0 border-line/60 pt-3 md:pt-0">
                  <Link
                    href={`/agent/transactions/${tx.id}`}
                    className="rounded-xl bg-navy px-4 py-2 text-xs font-semibold text-white hover:bg-navy/90 transition shadow-xs"
                  >
                    View Deal Room →
                  </Link>
                </div>
              </div>
            );
          })}

          {myTransactions.length === 0 && (
            <div className="rounded-2xl border border-dashed border-line bg-white p-8 text-center text-xs text-slate">
              No active transactions on your properties at this moment.
            </div>
          )}
        </div>
      </div>

      {/* Section 2: Canonical Property Passports Inventory */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-ink">Your Canonical Property Passports</h2>
            <p className="text-xs text-slate">Verified inventory registered with Astral.</p>
          </div>
          <Link href="/manager/properties" className="text-xs font-semibold text-blue hover:underline">
            Manage All Inventory →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {myProperties.map((property) => {
            const priceDisplay =
              property.priceUnit === "sale"
                ? formatNgn(property.price)
                : `${formatNgn(property.price)} / year`;

            return (
              <div
                key={property.id}
                className="flex flex-col sm:flex-row overflow-hidden rounded-2xl border border-line bg-white shadow-xs transition hover:border-blue/40"
              >
                <div className="relative sm:w-44 aspect-16/10 sm:aspect-auto bg-slate/10 overflow-hidden shrink-0">
                  <img
                    src={property.images?.[0]}
                    alt={property.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <VerificationBadge status={property.verificationStatus} />
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-4 justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] text-slate font-bold uppercase">{property.id}</span>
                      <span className="text-xs font-bold text-blue">{priceDisplay}</span>
                    </div>

                    <h3 className="font-bold text-ink text-sm mt-1 line-clamp-1">{property.title}</h3>
                    <p className="text-xs text-slate truncate mt-0.5">{property.location}</p>

                    {/* Commercial Terms Pill */}
                    <div className="mt-3 rounded-lg bg-mist p-2 text-xs border border-line/60 flex items-center justify-between font-medium">
                      <span>Listing Fee: <strong className="text-blue">{property.commercialTerms.totalCommissionPct}%</strong></span>
                      <span>Co-broker Rule: <strong className="text-ink">Max {property.commercialTerms.maxCollaboratingAgents}</strong></span>
                    </div>
                  </div>

                  <div className="mt-4 pt-2 border-t border-line/60 flex items-center justify-between">
                    <span className="text-[11px] text-slate">
                      <strong>{property.assignedAgentIds.length}</strong> Agents Distributing
                    </span>
                    <Link
                      href={`/manager/properties/${property.id}`}
                      className="text-xs font-bold text-blue hover:underline"
                    >
                      Passport Details →
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
