import Link from "next/link";
import { properties, agents, transactions } from "@/lib/mock-data";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { VerificationBadge } from "@/components/ui/VerificationBadge";
import { DEAL_STAGES } from "@/lib/types";

function formatNgn(amount: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function Home() {
  const verifiedProperties = properties.filter((p) => p.verificationStatus === "verified");

  return (
    <div className="flex min-h-screen flex-col bg-white text-ink">
      <PublicHeader />

      {/* Hero Section: The B2B Transaction Network */}
      <section className="relative overflow-hidden bg-gradient-to-b from-mist via-white to-white border-b border-line pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue/20 bg-blue/5 px-3.5 py-1 text-xs font-semibold text-blue mb-6 shadow-xs">
              <span className="h-2 w-2 rounded-full bg-blue animate-pulse" />
              <span>Astral Link • Professional Transaction Network</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-navy leading-[1.15]">
              Connect. Distribute. <span className="text-blue">Close.</span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-slate leading-relaxed">
              The professional collaboration network connecting Property Managers and top Real Estate Agents to execute genuine property transactions with upfront commission protection and zero duplicate listings.
            </p>

            {/* Dual Direct Workspace Portals */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/agent"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-blue px-7 py-3.5 text-sm font-bold text-white shadow-md hover:bg-blue/90 hover:scale-[1.02] transition"
              >
                <span>Enter Agent Workspace</span>
                <span>→</span>
              </Link>
              <Link
                href="/manager"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-line bg-white px-7 py-3.5 text-sm font-bold text-ink shadow-xs hover:border-blue/40 hover:bg-mist transition"
              >
                <span>Property Manager Portal</span>
              </Link>
            </div>

            {/* Quick Pilot Credibility Tags */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-slate border-t border-line/70 pt-6">
              <span className="flex items-center gap-1.5 font-medium">
                <svg className="h-4 w-4 text-verified" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                Canonical Property Passports
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <svg className="h-4 w-4 text-verified" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                One-Additional-Agent Rule
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <svg className="h-4 w-4 text-verified" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                Protected Attribution Logs
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <svg className="h-4 w-4 text-verified" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                Abuja & Lagos Pilot
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* The 8-Stage Transaction Workflow Diagram */}
      <section id="workflow" className="py-16 sm:py-20 border-b border-line bg-mist/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-blue">The Core Proposition</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-ink mt-1">
              One Repeatable Transaction Loop
            </h2>
            <p className="text-sm text-slate mt-2">
              Proving the complete chain from supply to commission attribution:
              PM → Astral → Agent → Consumer → Inspection → Offer → Legal → Close.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {DEAL_STAGES.map((stage, idx) => (
              <div
                key={stage.key}
                className="flex flex-col items-center text-center p-3.5 rounded-xl border border-line bg-white shadow-2xs"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-navy text-xs font-bold text-white mb-2 shadow-xs">
                  {idx + 1}
                </div>
                <h3 className="text-xs font-bold text-ink">{stage.label}</h3>
                <p className="text-[10px] text-slate mt-1 line-clamp-3 leading-snug">
                  {stage.actionDescription}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl bg-white border border-line p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-verified/10 text-verified font-bold">
                ✓
              </div>
              <div>
                <p className="text-sm font-bold text-ink">What needs to happen next?</p>
                <p className="text-xs text-slate">Every transaction clearly displays who holds the ball, whether agent, PM, or admin.</p>
              </div>
            </div>
            <Link
              href="/agent/transactions/TRX-2026-001"
              className="text-xs font-bold text-blue hover:underline shrink-0"
            >
              Inspect Live Transaction Workspace →
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Verified Property Passports */}
      <section id="passports" className="py-16 sm:py-20 border-b border-line">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue">Canonical Inventory</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-ink mt-1">
                Property Passports on Link
              </h2>
              <p className="text-sm text-slate mt-1">
                Every property has exactly one canonical record with verified commercial terms.
              </p>
            </div>
            <Link
              href="/agent"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue hover:text-navy transition"
            >
              <span>Explore All Opportunities</span>
              <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {verifiedProperties.slice(0, 3).map((property) => {
              const priceDisplay =
                property.priceUnit === "sale"
                  ? formatNgn(property.price)
                  : `${formatNgn(property.price)} / year`;

              return (
                <div
                  key={property.id}
                  className="flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-xs transition hover:border-blue/40 hover:shadow-md"
                >
                  <div className="relative aspect-16/10 w-full bg-slate/10 overflow-hidden">
                    <img
                      src={property.images?.[0]}
                      alt={property.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="rounded-full bg-white/95 px-2.5 py-0.5 text-[10px] font-bold text-navy shadow-xs">
                        {property.id}
                      </span>
                      <VerificationBadge status={property.verificationStatus} />
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <p className="text-base font-bold drop-shadow-sm">{priceDisplay}</p>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-4">
                    <p className="text-xs text-slate truncate">{property.location}</p>
                    <h3 className="font-bold text-ink text-sm mt-0.5 line-clamp-1">{property.title}</h3>

                    {/* Commercial Terms Pill */}
                    <div className="mt-3 rounded-lg bg-mist p-2.5 text-xs border border-line/60">
                      <div className="flex justify-between font-semibold">
                        <span className="text-blue">{property.commercialTerms.totalCommissionPct}% Fee</span>
                        <span className="text-slate">Co-broker: Max {property.commercialTerms.maxCollaboratingAgents}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-2 border-t border-line flex items-center justify-between">
                      <span className="text-[11px] text-slate">Source: {property.managerName}</span>
                      <Link
                        href={`/agent/opportunities/${property.id}`}
                        className="text-xs font-bold text-blue hover:underline"
                      >
                        Claim & Work →
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Rules & Commission Protection Architecture */}
      <section id="collaboration" className="py-16 sm:py-20 border-b border-line bg-navy text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-sky">Built for Trust</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
              Why Professionals Trade on Astral Link
            </h2>
            <p className="text-sm text-slate-300 mt-2">
              Commission protection happens when the collaboration is formed, not after the deal moves to WhatsApp.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky/20 text-sky font-bold mb-4">
                1
              </div>
              <h3 className="text-base font-bold text-white">The One Additional Agent Rule</h3>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                Default rule: originating agents may bring only one additional co-broker into a deal. This stops uncontrolled commission chains, disputes, and margin dilution.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky/20 text-sky font-bold mb-4">
                2
              </div>
              <h3 className="text-base font-bold text-white">Locked Upfront Split Terms</h3>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                Before full client or property details are disclosed, both agents accept agreed commercial terms (e.g. 50/50 split), recorded immutably in the transaction.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky/20 text-sky font-bold mb-4">
                3
              </div>
              <h3 className="text-base font-bold text-white">Protected Audit Trail</h3>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                Every action (opportunity claim, invite, inspection, offer) appends to a tamper-evident event log that proves attribution even if communication continues offline.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Network Pilot Stats */}
      <section id="network" className="py-16 sm:py-20 bg-mist">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-line bg-white p-8 sm:p-12 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <span className="rounded-md bg-ice px-2.5 py-1 text-xs font-bold text-blue uppercase">
                Active Pilot
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-ink mt-3">
                Ready to transact on Astral Link?
              </h2>
              <p className="text-sm text-slate mt-2">
                Join verified Property Managers and leading brokers in Abuja and Lagos. Prove the loop, protect your commission, and close faster.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
              <Link
                href="/agent"
                className="rounded-xl bg-blue px-6 py-3.5 text-center text-xs font-bold text-white shadow-xs hover:bg-blue/90 transition"
              >
                Open Agent Workspace
              </Link>
              <Link
                href="/manager"
                className="rounded-xl border border-line bg-mist px-6 py-3.5 text-center text-xs font-bold text-ink hover:bg-white transition"
              >
                Property Manager Portal
              </Link>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
