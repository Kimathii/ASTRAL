import { notFound } from "next/navigation";
import { getPropertyById, getOpportunitiesForProperty } from "@/lib/mock-data";
import { VerificationBadge } from "@/components/ui/VerificationBadge";
import { PipelineStepper } from "@/components/ui/PipelineStepper";

export default async function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const property = getPropertyById(id);
  if (!property) notFound();

  const [opportunity] = getOpportunitiesForProperty(property.id);

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-ink">{property.title}</h1>
          <p className="mt-1 text-sm text-slate">{property.location}</p>
        </div>
        <VerificationBadge status={property.verificationStatus} />
      </div>

      {opportunity && (
        <div className="mb-6 rounded-xl border border-line bg-white p-5">
          <h2 className="mb-4 text-sm font-semibold text-ink">Opportunity pipeline</h2>
          <PipelineStepper stage={opportunity.stage} />
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <DetailRow label="Property type" value={property.propertyType} />
        <DetailRow label="Availability" value={property.availability.replace("_", " ")} />
        <DetailRow label="Assigned agents" value={String(property.assignedAgentIds.length)} />
        <DetailRow label="Added" value={property.addedAt} />
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-line bg-white p-4">
      <p className="text-xs text-slate">{label}</p>
      <p className="mt-0.5 text-sm font-medium capitalize text-ink">{value}</p>
    </div>
  );
}
