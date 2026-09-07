import { properties } from "@/lib/mock-data";
import { PropertyCard } from "@/components/ui/PropertyCard";

export default function ManagerPropertiesPage() {
  const myProperties = properties.filter((p) => p.managerId === "mgr_1");

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="mb-1 text-2xl font-semibold text-ink">My properties</h1>
      <p className="mb-6 text-sm text-slate">Every property you&apos;ve submitted to Astral, and its verification status.</p>

      <div className="grid grid-cols-2 gap-4">
        {myProperties.map((property) => (
          <PropertyCard key={property.id} property={property} href={`/manager/properties/${property.id}`} />
        ))}
      </div>
    </div>
  );
}
