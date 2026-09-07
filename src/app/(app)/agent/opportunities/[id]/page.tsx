import { notFound } from "next/navigation";
import { getPropertyById, getOpportunitiesForProperty } from "@/lib/mock-data";
import { PipelineStepper } from "@/components/ui/PipelineStepper";

export default async function AgentOpportunityPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const property = getPropertyById(id);
  if (!property) notFound();

  const [opportunity] = getOpportunitiesForProperty(property.id);
  const alreadyInterested = opportunity?.interestedAgentIds.includes("agent_1");

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-ink">{property.title}</h1>
          <p className="mt-1 text-sm text-slate">{property.location}</p>
        </div>
        <button
          disabled={alreadyInterested}
          className="rounded-lg bg-blue px-4 py-2 text-sm font-medium text-white transition hover:bg-blue/90 disabled:cursor-not-allowed disabled:bg-line disabled:text-slate"
        >
          {alreadyInterested ? "Interest expressed" : "Express interest"}
        </button>
      </div>

      {opportunity && (
        <div className="mb-6 rounded-xl border border-line bg-white p-5">
          <h2 className="mb-4 text-sm font-semibold text-ink">Pipeline</h2>
          <PipelineStepper stage={opportunity.stage} />
        </div>
      )}

      <div className="rounded-xl border border-line bg-white p-5">
        <h2 className="mb-3 text-sm font-semibold text-ink">Property details</h2>
        <dl className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-slate">Type</dt>
            <dd className="font-medium text-ink">{property.propertyType}</dd>
          </div>
          <div>
            <dt className="text-slate">Availability</dt>
            <dd className="font-medium capitalize text-ink">{property.availability.replace("_", " ")}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
