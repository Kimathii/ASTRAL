import { inspections, properties, opportunities } from "@/lib/mock-data";

const STATUS_STYLE: Record<string, string> = {
  requested: "bg-pending/10 text-pending",
  scheduled: "bg-blue/10 text-blue",
  completed: "bg-verified/10 text-verified",
  cancelled: "bg-rejected/10 text-rejected",
};

export default function AgentInspectionsPage() {
  const mine = inspections.filter((i) => i.agentId === "agent_1");

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-1 text-2xl font-semibold text-ink">My inspections</h1>
      <p className="mb-6 text-sm text-slate">Every inspection you&apos;ve requested, and its outcome — the events that build your reputation.</p>

      <div className="flex flex-col gap-3">
        {mine.map((inspection) => {
          const opportunity = opportunities.find((o) => o.id === inspection.opportunityId);
          const property = properties.find((p) => p.id === opportunity?.propertyId);
          return (
            <div key={inspection.id} className="rounded-xl border border-line bg-white p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-ink">{property?.title}</h3>
                <span className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${STATUS_STYLE[inspection.status]}`}>
                  {inspection.status}
                </span>
              </div>
              <p className="mt-1 text-sm text-slate">Requested {inspection.requestedAt}</p>
              {inspection.feedback && (
                <p className="mt-2 rounded-lg bg-mist p-3 text-sm text-ink">{inspection.feedback}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
