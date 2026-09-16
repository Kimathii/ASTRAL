import Link from "next/link";
import { properties, transactions } from "@/lib/mock-data";
import { VerificationBadge } from "@/components/ui/VerificationBadge";

function formatNgn(amount: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function AgentOpportunityFeed() {
  // All verified canonical Property Passports available on Astral Link
  const verifiedProperties = properties.filter((p) => p.verificationStatus === "verified");

  return (
    <div className="mx-auto max-w-6xl">
      {/* Header & Value Proposition */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-line pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-blue/10 px-2 py-0.5 text-xs font-bold text-blue uppercase">
              Astral Link Network
            </span>
            <span className="text-xs text-slate">• Abuja & Lagos Pilot</span>
          </div>
          <h1 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-ink">
            Verified Opportunity Feed
          </h1>
          <p className="mt-1 text-sm text-slate">
            Genuine briefs with verified mandates, locked commercial terms, and commission protection.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/agent/transactions"
            className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-4 py-2.5 text-xs font-semibold text-ink shadow-xs hover:border-blue/40 transition"
          >
            <span>My Active Deals</span>
            <span className="rounded-full bg-blue px-2 py-0.5 text-[10px] font-bold text-white">
              {transactions.length}
            </span>
          </Link>
          <Link
            href="/catalogue/chiamaka-nwosu"
            className="inline-flex items-center gap-1.5 rounded-xl bg-navy px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-navy/90 transition"
          >
            <span>Public Catalogue</span>
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Network Stats Bar */}
      <div className="mb-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-xl border border-line bg-white p-3.5">
          <p className="text-xs text-slate">Verified Inventory</p>
          <p className="text-xl font-bold text-ink mt-0.5">{verifiedProperties.length} Properties</p>
        </div>
        <div className="rounded-xl border border-line bg-white p-3.5">
          <p className="text-xs text-slate">Avg. Listing Commission</p>
          <p className="text-xl font-bold text-blue mt-0.5">5% – 10%</p>
        </div>
        <div className="rounded-xl border border-line bg-white p-3.5">
          <p className="text-xs text-slate">Co-broker Protection</p>
          <p className="text-xl font-bold text-verified mt-0.5">Enforced (Max 1)</p>
        </div>
        <div className="rounded-xl border border-line bg-white p-3.5">
          <p className="text-xs text-slate">Live Mandate Check</p>
          <p className="text-xl font-bold text-ink mt-0.5">100% PM Verified</p>
        </div>
      </div>

      {/* Property Passport Feed */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {verifiedProperties.map((property) => {
          const activeTx = transactions.find((t) => t.propertyId === property.id);
          const priceDisplay =
            property.priceUnit === "sale"
              ? formatNgn(property.price)
              : `${formatNgn(property.price)} / year`;

          return (
            <div
              key={property.id}
              className="flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-xs transition hover:border-blue/40 hover:shadow-md"
            >
              {/* Media Container */}
              <div className="relative aspect-16/9 w-full bg-slate/10 overflow-hidden">
                <img
                  src={property.images?.[0]}
                  alt={property.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold text-navy backdrop-blur-xs shadow-xs">
                    {property.priceUnit === "sale" ? "For Sale" : "For Rent"}
                  </span>
                  <VerificationBadge status={property.verificationStatus} />
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-3 left-3 right-3 flex items-baseline justify-between text-white">
                  <div>
                    <span className="font-mono text-[10px] text-sky font-semibold tracking-wider uppercase">
                      Passport: {property.id}
                    </span>
                    <p className="text-lg font-bold drop-shadow-sm">{priceDisplay}</p>
                  </div>
                  <span className="rounded-md bg-navy/80 px-2 py-0.5 text-xs font-semibold text-sky backdrop-blur-xs">
                    {property.propertyType}
                  </span>
                </div>
              </div>

              {/* Passport Specs & Commercial Terms */}
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center gap-1.5 text-xs font-medium text-slate">
                  <svg className="h-3.5 w-3.5 text-blue shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="truncate">{property.location}</span>
                  {property.addressSummary && (
                    <span className="text-slate/60 text-[11px] truncate">({property.addressSummary})</span>
                  )}
                </div>

                <h3 className="mt-1 font-bold text-ink text-base line-clamp-1">{property.title}</h3>

                {/* Physical Specifications */}
                <div className="mt-2.5 flex items-center gap-3 text-xs text-slate border-b border-line/60 pb-3">
                  {property.bedrooms && (
                    <div>
                      <strong className="text-ink font-semibold">{property.bedrooms}</strong> Beds
                    </div>
                  )}
                  {property.bathrooms && (
                    <div>
                      <strong className="text-ink font-semibold">{property.bathrooms}</strong> Baths
                    </div>
                  )}
                  {property.sizeSqFt && (
                    <div>
                      <strong className="text-ink font-semibold">{property.sizeSqFt.toLocaleString()}</strong> sqft
                    </div>
                  )}
                  <div className="ml-auto text-[11px] font-medium text-slate">
                    Source: <strong className="text-ink">{property.managerName}</strong>
                  </div>
                </div>

                {/* Commercial Terms & One Additional Agent Rule */}
                <div className="mt-3 rounded-xl bg-mist p-3 text-xs border border-line/60">
                  <div className="flex items-center justify-between font-semibold">
                    <span className="text-ink">
                      Commission: <strong className="text-blue">{property.commercialTerms.totalCommissionPct}% Fee</strong>
                    </span>
                    <span className="text-slate font-normal">
                      Co-broker Limit: <strong className="text-ink font-semibold">{property.commercialTerms.maxCollaboratingAgents} Agent</strong>
                    </span>
                  </div>
                  {property.commercialTerms.notes && (
                    <p className="mt-1 text-[11px] text-slate line-clamp-1 italic">
                      &ldquo;{property.commercialTerms.notes}&rdquo;
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="mt-4 pt-2 flex items-center justify-between gap-3">
                  <Link
                    href={`/agent/opportunities/${property.id}`}
                    className="text-xs font-semibold text-slate hover:text-blue transition"
                  >
                    View Passport Details →
                  </Link>

                  {activeTx ? (
                    <Link
                      href={`/agent/transactions/${activeTx.id}`}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-verified/10 px-3 py-2 text-xs font-bold text-verified hover:bg-verified/20 transition"
                    >
                      <span className="h-2 w-2 rounded-full bg-verified" />
                      Deal in Progress ({activeTx.stage})
                    </Link>
                  ) : (
                    <Link
                      href={`/agent/opportunities/${property.id}`}
                      className="inline-flex items-center rounded-lg bg-blue px-3.5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-blue/90 transition"
                    >
                      Work this Opportunity
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
