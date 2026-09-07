import { notFound } from "next/navigation";
import { getAgentBySlug, properties } from "@/lib/mock-data";

// Public, unauthenticated surface — the "B2B2C acquisition channel" from the
// product doc. Consumers never log in; a request here becomes a trackable
// event that flows back into the authenticated app as a lead.

export default async function AgentCataloguePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const agent = getAgentBySlug(slug);
  if (!agent) notFound();

  const listings = properties.filter(
    (p) => p.assignedAgentIds.includes(agent.id) && p.verificationStatus === "verified"
  );

  return (
    <div className="min-h-screen bg-mist">
      <header className="border-b border-line bg-navy">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-sky/20">
              <div className="h-3 w-3 rounded-sm bg-sky" />
            </div>
            <span className="text-[15px] font-semibold text-white">Astral</span>
          </div>
          <span className="text-sm text-white/70">Verified agent catalogue</span>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-6 py-10">
        <h1 className="text-2xl font-semibold text-ink">{agent.name}</h1>
        <p className="mt-1 text-sm text-slate">
          {agent.brokerage} · {agent.specialties.join(", ")}
        </p>

        <div className="mt-8 grid grid-cols-2 gap-4">
          {listings.map((property) => (
            <div key={property.id} className="rounded-xl border border-line bg-white p-4">
              <h3 className="font-semibold text-ink">{property.title}</h3>
              <p className="mt-0.5 text-sm text-slate">{property.location}</p>
              <p className="mt-3 text-lg font-semibold text-ink">
                {new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(property.price)}
                {property.priceUnit === "rent_year" && " / year"}
              </p>
              <button className="mt-4 w-full rounded-lg bg-blue px-4 py-2 text-sm font-medium text-white hover:bg-blue/90">
                Request an inspection
              </button>
            </div>
          ))}
        </div>

        {listings.length === 0 && (
          <div className="mt-8 rounded-xl border border-dashed border-line bg-white p-8 text-center text-sm text-slate">
            No active listings from this agent right now.
          </div>
        )}
      </div>
    </div>
  );
}
