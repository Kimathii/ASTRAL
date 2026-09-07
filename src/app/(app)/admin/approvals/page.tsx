import { properties } from "@/lib/mock-data";
import { VerificationBadge } from "@/components/ui/VerificationBadge";

export default function ApprovalQueuePage() {
  const pending = properties.filter((p) => p.verificationStatus === "pending");

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-1 text-2xl font-semibold text-ink">Approval queue</h1>
      <p className="mb-6 text-sm text-slate">Review and verify property submissions before they become visible to agents.</p>

      <div className="flex flex-col gap-3">
        {pending.map((property) => (
          <div key={property.id} className="rounded-xl border border-line bg-white p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium text-ink">{property.title}</h3>
                <p className="text-sm text-slate">{property.location} · submitted by {property.managerName}</p>
              </div>
              <VerificationBadge status={property.verificationStatus} />
            </div>
            <div className="mt-4 flex gap-2">
              <button className="rounded-lg bg-verified px-3 py-1.5 text-sm font-medium text-white hover:bg-verified/90">
                Verify
              </button>
              <button className="rounded-lg border border-line px-3 py-1.5 text-sm font-medium text-ink hover:bg-mist">
                Reject
              </button>
            </div>
          </div>
        ))}

        {pending.length === 0 && (
          <div className="rounded-xl border border-dashed border-line bg-white p-8 text-center text-sm text-slate">
            Nothing waiting on review.
          </div>
        )}
      </div>
    </div>
  );
}
