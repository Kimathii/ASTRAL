import { notFound } from "next/navigation";
import Link from "next/link";
import { getAgentBySlug, properties } from "@/lib/mock-data";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { PropertyCard } from "@/components/ui/PropertyCard";

export default async function AgentCataloguePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const agent = getAgentBySlug(slug);
  if (!agent) notFound();

  const listings = properties.filter(
    (p) => p.assignedAgentIds.includes(agent.id) && p.verificationStatus === "verified"
  );

  return (
    <div className="min-h-screen flex flex-col bg-mist font-sans">
      <PublicHeader />

      <main className="flex-1 py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav className="mb-6 flex items-center gap-2 text-xs sm:text-sm text-slate">
            <Link href="/" className="hover:text-blue transition">
              Home
            </Link>
            <span>/</span>
            <Link href="/#agents" className="hover:text-blue transition">
              Agents
            </Link>
            <span>/</span>
            <span className="text-ink font-medium">{agent.name}</span>
          </nav>

          {/* Agent Profile Banner */}
          <div className="rounded-3xl border border-line bg-white p-6 sm:p-8 shadow-sm mb-10">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              {agent.avatarUrl ? (
                <img
                  src={agent.avatarUrl}
                  alt={agent.name}
                  className="h-28 w-28 rounded-2xl object-cover shadow-sm ring-2 ring-blue/20 shrink-0"
                />
              ) : (
                <div className="flex h-28 w-28 items-center justify-center rounded-2xl bg-blue text-3xl font-bold text-white shrink-0">
                  {agent.name.charAt(0)}
                </div>
              )}

              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                  <span className="rounded-md bg-navy px-2.5 py-0.5 text-[10px] font-bold text-sky uppercase">
                    Verified Astral Agent
                  </span>
                  <span className="rounded-md bg-ice px-2.5 py-0.5 text-[10px] font-bold text-blue uppercase">
                    {agent.reputation} Tier
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-bold text-ink">{agent.name}</h1>
                <p className="text-sm font-medium text-blue">{agent.brokerage}</p>
                <p className="mt-2 text-sm text-slate leading-relaxed max-w-2xl">{agent.bio}</p>

                <div className="mt-4 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  {agent.specialties.map((spec, idx) => (
                    <span key={idx} className="rounded-lg bg-mist border border-line px-3 py-1 text-xs text-ink font-medium">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Agent Stats Box */}
              <div className="flex sm:flex-col items-center justify-around gap-4 rounded-2xl bg-mist/80 p-4 border border-line/60 w-full sm:w-48 shrink-0">
                <div className="text-center">
                  <p className="text-2xl font-extrabold text-blue">{listings.length}</p>
                  <p className="text-[11px] text-slate font-medium">Active Listings</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-extrabold text-ink">{agent.closedDeals}</p>
                  <p className="text-[11px] text-slate font-medium">Deals Closed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Listings Grid */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-ink">
                Available Portfolio ({listings.length})
              </h2>
              <span className="text-xs text-slate">Direct verified inventory represented by {agent.name}</span>
            </div>

            {listings.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {listings.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-line bg-white p-12 text-center text-sm text-slate">
                No active listings from this agent at the moment.
              </div>
            )}
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}

