import { notFound } from "next/navigation";
import Link from "next/link";
import { getPropertyById, transactions } from "@/lib/mock-data";
import { VerificationBadge } from "@/components/ui/VerificationBadge";
import { DealStageStepper } from "@/components/ui/DealStageStepper";

function formatNgn(amount: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default async function AgentOpportunityDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const property = getPropertyById(id);
  if (!property) notFound();

  // Check if a transaction is already active for this property
  const activeTx = transactions.find((t) => t.propertyId === property.id);

  const priceDisplay =
    property.priceUnit === "sale"
      ? formatNgn(property.price)
      : `${formatNgn(property.price)} / year`;

  // Calculate estimated total commission
  const commissionAmount = Math.round((property.price * property.commercialTerms.totalCommissionPct) / 100);

  return (
    <div className="mx-auto max-w-4xl">
      {/* Top Breadcrumb & Actions */}
      <div className="mb-4 flex items-center justify-between">
        <Link
          href="/agent"
          className="inline-flex items-center gap-1 text-xs font-semibold text-slate hover:text-ink transition"
        >
          ← Back to Opportunity Feed
        </Link>
        <span className="font-mono text-xs text-slate uppercase">Canonical ID: {property.id}</span>
      </div>

      {/* Main Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-start justify-between gap-4 rounded-2xl border border-line bg-white p-6 shadow-xs">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <VerificationBadge status={property.verificationStatus} />
            <span className="rounded-md bg-ice px-2 py-0.5 text-xs font-bold text-blue">
              {property.propertyType}
            </span>
            <span className="text-xs text-slate">
              Verified on {property.verifiedAt || property.addedAt}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-ink">{property.title}</h1>
          <p className="mt-1 text-sm text-slate">{property.location} • {property.addressSummary}</p>
          <p className="mt-3 text-2xl font-extrabold text-blue">{priceDisplay}</p>
        </div>

        <div className="flex flex-col gap-2.5 w-full md:w-auto shrink-0">
          {activeTx ? (
            <Link
              href={`/agent/transactions/${activeTx.id}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-verified px-5 py-3 text-sm font-bold text-white shadow-sm hover:bg-verified/90 transition"
            >
              <span>Open Active Deal ({activeTx.id})</span>
              <span>→</span>
            </Link>
          ) : (
            <Link
              href={`/agent/transactions/TRX-2026-001`}
              className="inline-flex items-center justify-center rounded-xl bg-blue px-5 py-3 text-sm font-bold text-white shadow-sm hover:bg-blue/90 transition"
            >
              Claim & Work this Opportunity
            </Link>
          )}

          <Link
            href={`/catalogue/chiamaka-nwosu`}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-line bg-white px-4 py-2.5 text-xs font-semibold text-ink hover:bg-mist transition"
          >
            <span>Preview in Public Catalogue</span>
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </Link>
        </div>
      </div>

      {/* If an active transaction exists, show live stepper banner */}
      {activeTx && (
        <div className="mb-6 rounded-2xl border border-blue/30 bg-ice/40 p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-blue uppercase tracking-wider">
              Active Transaction: {activeTx.id}
            </span>
            <Link
              href={`/agent/transactions/${activeTx.id}`}
              className="text-xs font-bold text-blue hover:underline"
            >
              View Full Transaction Workspace →
            </Link>
          </div>
          <DealStageStepper currentStage={activeTx.stage} />
        </div>
      )}

      {/* Property Photos Grid */}
      {property.images && property.images.length > 0 && (
        <div className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-3 overflow-hidden rounded-2xl">
          <div className="sm:col-span-2 aspect-16/10 overflow-hidden rounded-xl bg-slate/10">
            <img
              src={property.images[0]}
              alt={property.title}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-3">
            {property.images.slice(1, 3).map((img, i) => (
              <div key={i} className="aspect-16/10 flex-1 overflow-hidden rounded-xl bg-slate/10">
                <img src={img} alt="" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left 2 Cols: Passport Specs & Description */}
        <div className="md:col-span-2 flex flex-col gap-6">
          {/* Property Passport Specs */}
          <div className="rounded-2xl border border-line bg-white p-6 shadow-xs">
            <h2 className="text-base font-bold text-ink mb-4">Property Passport Specifications</h2>
            <dl className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div className="rounded-lg bg-mist p-3">
                <dt className="text-slate">Bedrooms</dt>
                <dd className="text-base font-bold text-ink mt-0.5">{property.bedrooms || "N/A"}</dd>
              </div>
              <div className="rounded-lg bg-mist p-3">
                <dt className="text-slate">Bathrooms</dt>
                <dd className="text-base font-bold text-ink mt-0.5">{property.bathrooms || "N/A"}</dd>
              </div>
              <div className="rounded-lg bg-mist p-3">
                <dt className="text-slate">Floor Area</dt>
                <dd className="text-base font-bold text-ink mt-0.5">{property.sizeSqFt ? `${property.sizeSqFt.toLocaleString()} sqft` : "N/A"}</dd>
              </div>
              <div className="rounded-lg bg-mist p-3">
                <dt className="text-slate">Availability</dt>
                <dd className="text-base font-bold text-ink mt-0.5 capitalize">{property.availability.replace("_", " ")}</dd>
              </div>
              <div className="rounded-lg bg-mist p-3">
                <dt className="text-slate">Source Type</dt>
                <dd className="text-base font-bold text-ink mt-0.5">{property.sourceType === "pm" ? "Verified PM" : "Agent Supplied"}</dd>
              </div>
              <div className="rounded-lg bg-mist p-3">
                <dt className="text-slate">Mandate Holder</dt>
                <dd className="text-base font-bold text-ink mt-0.5 truncate">{property.managerName}</dd>
              </div>
            </dl>

            <div className="mt-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate mb-2">Description</h3>
              <p className="text-sm leading-relaxed text-slate">{property.description}</p>
            </div>

            {property.features && (
              <div className="mt-5 border-t border-line/70 pt-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate mb-2">Key Amenities</h3>
                <div className="flex flex-wrap gap-2">
                  {property.features.map((f, i) => (
                    <span key={i} className="rounded-md border border-line bg-mist px-2.5 py-1 text-xs font-medium text-ink">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Col: Commercial Terms & Collaboration Rules */}
        <div className="flex flex-col gap-6">
          <div className="rounded-2xl border border-line bg-white p-6 shadow-xs">
            <div className="flex items-center gap-2 mb-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue text-xs font-bold text-white">
                %
              </span>
              <h2 className="text-base font-bold text-ink">Commercial Terms</h2>
            </div>

            <div className="rounded-xl border border-blue/20 bg-blue/5 p-4 text-center mb-4">
              <p className="text-xs text-slate">Total Agency Fee</p>
              <p className="text-2xl font-extrabold text-blue mt-0.5">
                {property.commercialTerms.totalCommissionPct}% Commission
              </p>
              <p className="text-xs font-semibold text-slate mt-1">
                ≈ {formatNgn(commissionAmount)}
              </p>
            </div>

            <div className="space-y-3 text-xs border-y border-line/70 py-4">
              <div className="flex justify-between">
                <span className="text-slate">Collaboration Allowed:</span>
                <strong className="text-ink font-semibold">
                  {property.commercialTerms.collaborationAllowed ? "Yes" : "No (Direct Only)"}
                </strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate">Max Additional Agents:</span>
                <strong className="text-ink font-semibold">
                  {property.commercialTerms.maxCollaboratingAgents} Co-broker Limit
                </strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate">Default Split Ratio:</span>
                <strong className="text-ink font-semibold">50% / 50%</strong>
              </div>
            </div>

            {property.commercialTerms.notes && (
              <div className="mt-4 rounded-xl bg-mist p-3 text-xs text-slate">
                <span className="font-bold text-ink">PM Mandate Note:</span>
                <p className="mt-0.5 italic">{property.commercialTerms.notes}</p>
              </div>
            )}

            <div className="mt-5">
              <Link
                href={`/agent/transactions/TRX-2026-001`}
                className="flex w-full items-center justify-center rounded-xl bg-blue py-3 text-center text-xs font-bold text-white shadow-xs hover:bg-blue/90 transition"
              >
                Start Transaction with Client
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
