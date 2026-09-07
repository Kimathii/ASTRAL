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
  href: string;
  showVerification?: boolean;
}

export function PropertyCard({ property, opportunity, href, showVerification = true }: PropertyCardProps) {
  return (
    <Link
      href={href}
      className="group flex flex-col rounded-xl border border-line bg-white p-4 transition hover:border-blue/40 hover:shadow-[0_1px_0_0_rgba(20,80,196,0.06),0_8px_24px_-12px_rgba(20,80,196,0.25)]"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="truncate font-semibold text-ink">{property.title}</h3>
          <p className="mt-0.5 text-sm text-slate">{property.location}</p>
        </div>
        {showVerification && <VerificationBadge status={property.verificationStatus} />}
      </div>

      <div className="mt-3 flex items-center gap-2 text-sm text-slate">
        <span className="rounded-md bg-ice px-2 py-0.5 text-xs font-medium text-blue">{property.propertyType}</span>
        <span>·</span>
        <span className="capitalize">{property.availability.replace("_", " ")}</span>
      </div>

      <p className="mt-3 text-lg font-semibold text-ink">{formatPrice(property.price, property.priceUnit)}</p>

      {opportunity && (
        <div className="mt-4 border-t border-line pt-3">
          <PipelineStepper stage={opportunity.stage} compact />
        </div>
      )}
    </Link>
  );
}
