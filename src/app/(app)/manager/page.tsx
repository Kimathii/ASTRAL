import Link from "next/link";
import { properties, opportunities } from "@/lib/mock-data";
import { PropertyCard } from "@/components/ui/PropertyCard";

export default function ManagerDashboard() {
  const myProperties = properties.filter((p) => p.managerId === "mgr_1");
  const pendingCount = myProperties.filter((p) => p.verificationStatus === "pending").length;
  const activeCount = myProperties.filter((p) => p.availability === "available").length;

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-ink">Good to see you, Amarachi</h1>
          <p className="mt-1 text-sm text-slate">Here&apos;s what&apos;s moving across your properties.</p>
        </div>
        <Link
          href="/manager/properties"
          className="rounded-lg bg-blue px-4 py-2 text-sm font-medium text-white hover:bg-blue/90"
        >
          Add a property
        </Link>
      </div>

      <div className="mb-8 grid grid-cols-3 gap-4">
        <StatCard label="Listed properties" value={myProperties.length} />
        <StatCard label="Awaiting verification" value={pendingCount} accent="pending" />
        <StatCard label="Available now" value={activeCount} accent="verified" />
      </div>

      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-semibold text-ink">Your properties</h2>
        <Link href="/manager/properties" className="text-sm font-medium text-blue hover:underline">
          View all
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {myProperties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            opportunity={opportunities.find((o) => o.propertyId === property.id)}
            href={`/manager/properties/${property.id}`}
          />
        ))}
      </div>
    </div>
  );
}

function StatCard({ label, value, accent }: { label: string; value: number; accent?: "verified" | "pending" }) {
  return (
    <div className="rounded-xl border border-line bg-white p-4">
      <p className="text-sm text-slate">{label}</p>
      <p className={`mt-1 text-2xl font-semibold ${accent === "verified" ? "text-verified" : accent === "pending" ? "text-pending" : "text-ink"}`}>
        {value}
      </p>
    </div>
  );
}
