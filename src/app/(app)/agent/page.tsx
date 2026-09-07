import { properties, opportunities } from "@/lib/mock-data";
import { PropertyCard } from "@/components/ui/PropertyCard";

export default function AgentDashboard() {
  // Agent sees distributed opportunities — not every property in the system.
  const distributed = properties.filter(
    (p) => p.verificationStatus === "verified" && p.assignedAgentIds.includes("agent_1")
  );

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="mb-1 text-2xl font-semibold text-ink">Opportunities for you</h1>
      <p className="mb-6 text-sm text-slate">Verified properties distributed to you by property managers.</p>

      <div className="grid grid-cols-2 gap-4">
        {distributed.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            opportunity={opportunities.find((o) => o.propertyId === property.id)}
            href={`/agent/opportunities/${property.id}`}
            showVerification={false}
          />
        ))}
      </div>

      {distributed.length === 0 && (
        <div className="rounded-xl border border-dashed border-line bg-white p-8 text-center text-sm text-slate">
          No opportunities assigned to you yet.
        </div>
      )}
    </div>
  );
}
