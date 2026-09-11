"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { properties, agents } from "@/lib/mock-data";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { PropertyCard } from "@/components/ui/PropertyCard";
import { CustomDropdown, DropdownOption } from "@/components/ui/CustomDropdown";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedDealType, setSelectedDealType] = useState("all");
  const [activeTab, setActiveTab] = useState<"all" | "residential" | "commercial" | "sale" | "rent">("all");

  // Extract unique locations
  const regionOptions: DropdownOption[] = useMemo(() => {
    return [
      {
        value: "all",
        label: "All Regions",
        sublabel: "Abuja, Lagos & more",
        icon: (
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
      },
      {
        value: "Abuja",
        label: "Abuja (FCT)",
        sublabel: "Maitama, Jabi, Wuse II, Gwarinpa",
        icon: (
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        ),
      },
      {
        value: "Lagos",
        label: "Lagos State",
        sublabel: "Lekki Phase 1, Victoria Island",
        icon: (
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        ),
      },
    ];
  }, []);

  const typeOptions: DropdownOption[] = [
    {
      value: "all",
      label: "All Property Types",
      sublabel: "Residential & Commercial",
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      ),
    },
    {
      value: "Residential",
      label: "Residential",
      sublabel: "Villas, Duplexes, Terraces",
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      value: "Commercial",
      label: "Commercial",
      sublabel: "Office Suites, Plazas, Retail",
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
  ];

  const dealTypeOptions: DropdownOption[] = [
    {
      value: "all",
      label: "Sale & Rent",
      sublabel: "All deal structures",
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
      ),
    },
    {
      value: "sale",
      label: "For Sale",
      sublabel: "Outright purchase",
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      value: "rent",
      label: "For Rent",
      sublabel: "Annual & monthly leases",
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
        </svg>
      ),
    },
  ];

  // Filtered properties
  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {
      // Must be verified for public marketplace
      if (p.verificationStatus !== "verified") return false;

      // Tab filter
      if (activeTab === "residential" && p.propertyType !== "Residential") return false;
      if (activeTab === "commercial" && p.propertyType !== "Commercial") return false;
      if (activeTab === "sale" && p.priceUnit !== "sale") return false;
      if (activeTab === "rent" && !p.priceUnit.startsWith("rent")) return false;

      // Search keyword
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(query);
        const matchesLocation = p.location.toLowerCase().includes(query);
        const matchesDesc = p.description?.toLowerCase().includes(query);
        if (!matchesTitle && !matchesLocation && !matchesDesc) return false;
      }

      // Location filter
      if (selectedLocation !== "all") {
        if (!p.location.toLowerCase().includes(selectedLocation.toLowerCase())) return false;
      }

      // Type filter
      if (selectedType !== "all" && p.propertyType.toLowerCase() !== selectedType.toLowerCase()) {
        return false;
      }

      // Deal type filter
      if (selectedDealType === "sale" && p.priceUnit !== "sale") return false;
      if (selectedDealType === "rent" && !p.priceUnit.startsWith("rent")) return false;

      return true;
    });
  }, [searchQuery, selectedLocation, selectedType, selectedDealType, activeTab]);

  return (
    <div className="min-h-screen flex flex-col bg-mist font-sans">
      <PublicHeader />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-navy py-16 sm:py-24 text-white">
        {/* Background decorative glowing circles */}
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-blue/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-sky/15 blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold text-sky backdrop-blur-md mb-6 border border-white/15">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Direct Verified Real Estate Network
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight sm:leading-tight">
              Discover & Transact <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-sky via-white to-sky bg-clip-text text-transparent">
                100% Verified
              </span>{" "}
              Properties
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-300 text-white/80 max-w-2xl mx-auto">
              Browse authentic listings directly from verified property managers and accredited agents. Zero duplicate ghost listings, guaranteed title provenance.
            </p>
          </div>

          {/* Hero Search & Filter Bar */}
          <div className="mt-10 mx-auto max-w-4xl rounded-2xl sm:rounded-3xl bg-white p-3 sm:p-4 shadow-2xl ring-1 ring-black/5 text-ink">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Keyword Search */}
              <div className="relative">
                <label className="block text-[11px] font-bold text-slate uppercase tracking-wider mb-1 px-1">
                  Location / Keyword
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g. Maitama, Jabi, Lekki"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-xl border border-line bg-mist/60 px-3.5 py-2.5 text-xs sm:text-sm text-ink placeholder:text-slate/60 focus:border-blue focus:bg-white focus:outline-none"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-2.5 text-xs text-slate hover:text-ink"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* City / State Dropdown */}
              <CustomDropdown
                label="Region"
                value={selectedLocation}
                options={regionOptions}
                onChange={setSelectedLocation}
              />

              {/* Property Type Dropdown */}
              <CustomDropdown
                label="Property Type"
                value={selectedType}
                options={typeOptions}
                onChange={setSelectedType}
              />

              {/* Offer Type Dropdown */}
              <CustomDropdown
                label="Offer Type"
                value={selectedDealType}
                options={dealTypeOptions}
                onChange={setSelectedDealType}
              />
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="rounded-xl bg-white/5 backdrop-blur-sm p-4 border border-white/10">
              <p className="text-2xl sm:text-3xl font-bold text-sky">100%</p>
              <p className="text-xs text-white/70 mt-0.5">Verified Property Titles</p>
            </div>
            <div className="rounded-xl bg-white/5 backdrop-blur-sm p-4 border border-white/10">
              <p className="text-2xl sm:text-3xl font-bold text-sky">0</p>
              <p className="text-xs text-white/70 mt-0.5">Ghost or Phantom Listings</p>
            </div>
            <div className="rounded-xl bg-white/5 backdrop-blur-sm p-4 border border-white/10">
              <p className="text-2xl sm:text-3xl font-bold text-sky">24/7</p>
              <p className="text-xs text-white/70 mt-0.5">Inspection Booking System</p>
            </div>
            <div className="rounded-xl bg-white/5 backdrop-blur-sm p-4 border border-white/10">
              <p className="text-2xl sm:text-3xl font-bold text-sky">Direct</p>
              <p className="text-xs text-white/70 mt-0.5">Manager & Agent Links</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Properties Section */}
      <section id="properties" className="py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header & Tabs */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue">Verified Marketplace</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-ink mt-1">Available Properties</h2>
              <p className="text-sm text-slate mt-1">
                Showing {filteredProperties.length} active verified listings available for immediate inspection.
              </p>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setActiveTab("all")}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition ${
                  activeTab === "all" ? "bg-navy text-white shadow-xs" : "bg-white text-slate hover:bg-mist border border-line"
                }`}
              >
                All Listings
              </button>
              <button
                onClick={() => setActiveTab("residential")}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition ${
                  activeTab === "residential" ? "bg-navy text-white shadow-xs" : "bg-white text-slate hover:bg-mist border border-line"
                }`}
              >
                Residential
              </button>
              <button
                onClick={() => setActiveTab("commercial")}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition ${
                  activeTab === "commercial" ? "bg-navy text-white shadow-xs" : "bg-white text-slate hover:bg-mist border border-line"
                }`}
              >
                Commercial
              </button>
              <button
                onClick={() => setActiveTab("sale")}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition ${
                  activeTab === "sale" ? "bg-navy text-white shadow-xs" : "bg-white text-slate hover:bg-mist border border-line"
                }`}
              >
                For Sale
              </button>
              <button
                onClick={() => setActiveTab("rent")}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition ${
                  activeTab === "rent" ? "bg-navy text-white shadow-xs" : "bg-white text-slate hover:bg-mist border border-line"
                }`}
              >
                For Rent
              </button>
            </div>
          </div>

          {/* Properties Grid */}
          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-line bg-white p-12 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-ice text-blue mb-3">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-ink">No properties match your current filters</h3>
              <p className="mt-1 text-xs text-slate">Try resetting your search keyword or selecting "All Regions".</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedLocation("all");
                  setSelectedType("all");
                  setSelectedDealType("all");
                  setActiveTab("all");
                }}
                className="mt-4 inline-flex items-center rounded-xl bg-navy px-4 py-2 text-xs font-semibold text-white hover:bg-navy/90"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Featured Agents Section */}
      <section id="agents" className="bg-white py-14 sm:py-20 border-y border-line">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-blue">Accredited Network</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-ink mt-1">Featured Real Estate Agents</h2>
            <p className="text-sm text-slate mt-2">
              Browse curated agent catalogues. Every agent is vetted and operates transparently through Astral's digital deal pipeline.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {agents.map((agent) => {
              const agentListingsCount = properties.filter((p) => p.assignedAgentIds.includes(agent.id)).length;

              return (
                <div
                  key={agent.id}
                  className="flex flex-col sm:flex-row items-center gap-6 rounded-3xl border border-line bg-mist/50 p-6 sm:p-8 hover:border-blue/40 hover:shadow-md transition"
                >
                  <div className="relative shrink-0">
                    {agent.avatarUrl ? (
                      <img
                        src={agent.avatarUrl}
                        alt={agent.name}
                        className="h-24 w-24 rounded-2xl object-cover shadow-sm ring-2 ring-blue/20"
                      />
                    ) : (
                      <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-blue text-2xl font-bold text-white">
                        {agent.name.charAt(0)}
                      </div>
                    )}
                    <span className="absolute -bottom-2 -right-2 rounded-md bg-navy px-2 py-0.5 text-[10px] font-bold text-sky uppercase shadow-xs">
                      {agent.reputation}
                    </span>
                  </div>

                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-lg font-bold text-ink">{agent.name}</h3>
                    <p className="text-xs font-medium text-blue">{agent.brokerage}</p>
                    <p className="mt-2 text-xs text-slate line-clamp-2">{agent.bio}</p>

                    <div className="mt-3 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                      {agent.specialties.map((spec, idx) => (
                        <span key={idx} className="rounded-md bg-white border border-line px-2 py-0.5 text-[11px] text-slate">
                          {spec}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4 pt-4 border-t border-line/70 flex items-center justify-between">
                      <span className="text-xs text-slate font-medium">
                        <strong>{agentListingsCount}</strong> verified properties
                      </span>
                      <Link
                        href={`/catalogue/${agent.catalogueSlug}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-blue hover:text-navy transition"
                      >
                        View Public Catalogue →
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works / Pipeline Section */}
      <section id="how-it-works" className="py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-blue">Transparent Transactions</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-ink mt-1">How Astral Deal Flow Works</h2>
            <p className="text-sm text-slate mt-2">
              From verified discovery to legal closing, every deal progresses with cryptographic integrity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-2xl border border-line bg-white p-6 shadow-xs relative">
              <span className="text-xs font-extrabold text-blue bg-ice px-2.5 py-1 rounded-md">Step 01</span>
              <h3 className="text-base font-bold text-ink mt-3">Verified Discovery</h3>
              <p className="mt-2 text-xs text-slate leading-relaxed">
                Property managers upload properties and documents. Astral admins verify title deed authenticity before publishing.
              </p>
            </div>

            <div className="rounded-2xl border border-line bg-white p-6 shadow-xs relative">
              <span className="text-xs font-extrabold text-blue bg-ice px-2.5 py-1 rounded-md">Step 02</span>
              <h3 className="text-base font-bold text-ink mt-3">Scheduled Inspection</h3>
              <p className="mt-2 text-xs text-slate leading-relaxed">
                Clients request inspections online. Accredited agents coordinate and accompany physical site visits.
              </p>
            </div>

            <div className="rounded-2xl border border-line bg-white p-6 shadow-xs relative">
              <span className="text-xs font-extrabold text-blue bg-ice px-2.5 py-1 rounded-md">Step 03</span>
              <h3 className="text-base font-bold text-ink mt-3">Offer & Negotiation</h3>
              <p className="mt-2 text-xs text-slate leading-relaxed">
                Digital offers and terms are recorded in the central transaction pipeline, eliminating middlemen distortion.
              </p>
            </div>

            <div className="rounded-2xl border border-line bg-white p-6 shadow-xs relative">
              <span className="text-xs font-extrabold text-blue bg-ice px-2.5 py-1 rounded-md">Step 04</span>
              <h3 className="text-base font-bold text-ink mt-3">Legal Title & Close</h3>
              <p className="mt-2 text-xs text-slate leading-relaxed">
                Contracts executed and recorded transparently. Reputation and track records are automatically updated.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Astral / Trust Section */}
      <section id="why-astral" className="bg-navy text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-sky">Built for Nigeria's Market</span>
              <h2 className="text-2xl sm:text-4xl font-extrabold mt-2 leading-tight">
                Ending Real Estate Fraud & Ghost Listings Once and For All
              </h2>
              <p className="mt-4 text-sm text-slate-300 leading-relaxed text-white/80">
                Traditional property searching in Nigeria is plagued by unverified agents, phantom listings, and risky offline negotiations. Astral creates one single source of truth connecting Landlords, Agents, and Buyers.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky/20 text-sky text-xs font-bold">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-sm font-bold">Direct Manager Verification</h4>
                    <p className="text-xs text-white/70">Every property requires verified title documents before listing.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky/20 text-sky text-xs font-bold">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-sm font-bold">Dedicated Agent Catalogues</h4>
                    <p className="text-xs text-white/70">Agents distribute legitimate inventory directly to their network.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky/20 text-sky text-xs font-bold">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-sm font-bold">Unified Deal Pipeline</h4>
                    <p className="text-xs text-white/70">Live status tracking from viewing to payment and contract signing.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Card: Quick Portal Access */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
              <h3 className="text-xl font-bold text-white">Are you an Agent or Property Manager?</h3>
              <p className="mt-2 text-xs text-white/70">
                Sign in to your dedicated dashboard to manage your properties, pipeline, and inspection requests.
              </p>

              <div className="mt-6 space-y-3">
                <Link
                  href="/manager"
                  className="flex items-center justify-between rounded-xl bg-white px-5 py-3 text-sm font-semibold text-navy hover:bg-white/90 transition shadow-sm"
                >
                  <span>Property Manager Dashboard</span>
                  <span>→</span>
                </Link>

                <Link
                  href="/agent"
                  className="flex items-center justify-between rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white hover:bg-white/20 transition"
                >
                  <span>Agent Deal Dashboard</span>
                  <span>→</span>
                </Link>

                <Link
                  href="/admin"
                  className="flex items-center justify-between rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white hover:bg-white/20 transition"
                >
                  <span>Admin Control Center</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
