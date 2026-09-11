import Link from "next/link";
import { Opportunity, PropertyRecord } from "@/lib/types";
import { VerificationBadge } from "./VerificationBadge";
import { PipelineStepper } from "./PipelineStepper";

function formatPrice(price: number, unit: PropertyRecord["priceUnit"]) {
  const amount = new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(price);
  if (unit === "rent_year") return `${amount} / year`;
  if (unit === "rent_month") return `${amount} / month`;
  return amount;
}

interface PropertyCardProps {
  property: PropertyRecord;
  opportunity?: Opportunity;
  href?: string;
  showVerification?: boolean;
}

export function PropertyCard({ property, opportunity, href, showVerification = true }: PropertyCardProps) {
  const targetHref = href || `/properties/${property.id}`;
  const coverImage = property.images?.[0] || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80";

  return (
    <Link
      href={targetHref}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-blue/40 hover:shadow-lg"
    >
      {/* Property Image Container */}
      <div className="relative aspect-16/10 w-full overflow-hidden bg-slate/10">
        <img
          src={coverImage}
          alt={property.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          <span className="rounded-full bg-white/90 backdrop-blur-md px-2.5 py-1 text-xs font-semibold text-navy shadow-xs">
            {property.priceUnit === "sale" ? "For Sale" : "For Rent"}
          </span>
          {showVerification && <VerificationBadge status={property.verificationStatus} />}
        </div>

        {/* Bottom overlay price */}
        <div className="absolute bottom-3 left-3 right-3 flex items-baseline justify-between text-white">
          <p className="text-lg font-bold drop-shadow-sm">
            {formatPrice(property.price, property.priceUnit)}
          </p>
          <span className="rounded-md bg-navy/80 backdrop-blur-xs px-2 py-0.5 text-xs font-medium text-sky">
            {property.propertyType}
          </span>
        </div>
      </div>

      {/* Property Content */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex-1">
          <div className="flex items-center gap-1.5 text-xs text-slate font-medium">
            <svg className="h-3.5 w-3.5 text-blue shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="truncate">{property.location}</span>
          </div>

          <h3 className="mt-1.5 font-semibold text-ink group-hover:text-blue transition-colors line-clamp-1">
            {property.title}
          </h3>

          {/* Specs */}
          <div className="mt-3 flex items-center gap-3 border-y border-line/60 py-2.5 text-xs text-slate">
            {property.bedrooms && (
              <div className="flex items-center gap-1">
                <span className="font-semibold text-ink">{property.bedrooms}</span> Beds
              </div>
            )}
            {property.bathrooms && (
              <div className="flex items-center gap-1">
                <span className="font-semibold text-ink">{property.bathrooms}</span> Baths
              </div>
            )}
            {property.sizeSqFt && (
              <div className="flex items-center gap-1">
                <span className="font-semibold text-ink">{property.sizeSqFt.toLocaleString()}</span> sqft
              </div>
            )}
            <div className="ml-auto font-medium text-blue">
              <span className="capitalize">{property.availability.replace("_", " ")}</span>
            </div>
          </div>
        </div>

        {/* Manager / Agent Attribution */}
        <div className="mt-3 flex items-center justify-between text-xs text-slate pt-1">
          <div className="flex items-center gap-1.5 truncate">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue/10 text-[10px] font-bold text-blue">
              {property.managerName.charAt(0)}
            </div>
            <span className="truncate">Manager: <strong className="text-ink font-medium">{property.managerName}</strong></span>
          </div>

          <span className="text-blue font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
            Details →
          </span>
        </div>

        {opportunity && (
          <div className="mt-3 border-t border-line pt-3">
            <PipelineStepper stage={opportunity.stage} compact />
          </div>
        )}
      </div>
    </Link>
  );
}

