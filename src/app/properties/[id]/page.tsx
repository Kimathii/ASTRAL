"use client";

import { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPropertyById, agents } from "@/lib/mock-data";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { VerificationBadge } from "@/components/ui/VerificationBadge";
import { PropertyRecord } from "@/lib/types";

function formatPrice(price: number, unit: PropertyRecord["priceUnit"]) {
  const amount = new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(price);
  if (unit === "rent_year") return `${amount} / year`;
  if (unit === "rent_month") return `${amount} / month`;
  return amount;
}

export default function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const property = getPropertyById(id);

  if (!property) {
    notFound();
  }

  const propertyImages = property.images && property.images.length > 0
    ? property.images
    : ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    timeSlot: "Morning (09:00 - 12:00)",
    notes: "",
  });

  const assignedAgentsList = agents.filter((a) => property.assignedAgentIds.includes(a.id));

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-mist font-sans">
      <PublicHeader />

      <main className="flex-1 py-8 sm:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav className="mb-6 flex items-center gap-2 text-xs sm:text-sm text-slate">
            <Link href="/" className="hover:text-blue transition">
              Home
            </Link>
            <span>/</span>
            <Link href="/#properties" className="hover:text-blue transition">
              Properties
            </Link>
            <span>/</span>
            <span className="text-ink font-medium truncate max-w-xs">{property.title}</span>
          </nav>

          {/* Property Title & Top Bar */}
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2.5 mb-2">
                <VerificationBadge status={property.verificationStatus} />
                <span className="rounded-full bg-ice px-3 py-0.5 text-xs font-semibold text-blue">
                  {property.propertyType}
                </span>
                <span className="rounded-full bg-white px-3 py-0.5 text-xs font-semibold text-slate border border-line capitalize">
                  {property.availability.replace("_", " ")}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-ink">
                {property.title}
              </h1>
              <p className="mt-1 flex items-center gap-1.5 text-sm sm:text-base text-slate">
                <svg className="h-4 w-4 text-blue shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {property.location}
              </p>
            </div>

            <div className="flex flex-col md:items-end">
              <span className="text-xs text-slate uppercase tracking-wider font-semibold">
                {property.priceUnit === "sale" ? "Selling Price" : "Rental Price"}
              </span>
              <p className="text-2xl sm:text-3xl font-extrabold text-blue">
                {formatPrice(property.price, property.priceUnit)}
              </p>
            </div>
          </div>

          {/* Full Image Showcase Gallery */}
          <section className="mb-10">
            <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-md">
              {/* Primary Large Image View */}
              <div className="relative aspect-16/9 sm:aspect-21/9 w-full bg-navy/10 overflow-hidden">
                <img
                  src={propertyImages[activeImageIndex]}
                  alt={`${property.title} photo ${activeImageIndex + 1}`}
                  className="h-full w-full object-cover transition-all duration-300"
                />
                <div className="absolute bottom-4 right-4 rounded-xl bg-navy/80 backdrop-blur-md px-3.5 py-1.5 text-xs font-semibold text-white">
                  Photo {activeImageIndex + 1} of {propertyImages.length}
                </div>
              </div>

              {/* Thumbnails Row */}
              {propertyImages.length > 1 && (
                <div className="p-3 sm:p-4 bg-mist/60 border-t border-line flex items-center gap-3 overflow-x-auto">
                  {propertyImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative h-16 w-24 sm:h-20 sm:w-32 shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                        activeImageIndex === idx
                          ? "border-blue ring-2 ring-blue/20 scale-102"
                          : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img src={img} alt={`Thumbnail ${idx + 1}`} className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Main Content Layout (2 Columns) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left 2 Columns: Description, Key Facts, Amenities */}
            <div className="lg:col-span-2 space-y-8">
              {/* Key Specs Card */}
              <div className="rounded-2xl border border-line bg-white p-6 shadow-xs">
                <h2 className="text-lg font-bold text-ink mb-4">Property Overview</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {property.bedrooms !== undefined && (
                    <div className="rounded-xl bg-mist p-3.5 text-center">
                      <span className="text-xs text-slate font-medium">Bedrooms</span>
                      <p className="text-lg font-bold text-ink mt-0.5">{property.bedrooms} Beds</p>
                    </div>
                  )}
                  {property.bathrooms !== undefined && (
                    <div className="rounded-xl bg-mist p-3.5 text-center">
                      <span className="text-xs text-slate font-medium">Bathrooms</span>
                      <p className="text-lg font-bold text-ink mt-0.5">{property.bathrooms} Baths</p>
                    </div>
                  )}
                  {property.sizeSqFt !== undefined && (
                    <div className="rounded-xl bg-mist p-3.5 text-center">
                      <span className="text-xs text-slate font-medium">Total Area</span>
                      <p className="text-lg font-bold text-ink mt-0.5">{property.sizeSqFt.toLocaleString()} sqft</p>
                    </div>
                  )}
                  <div className="rounded-xl bg-mist p-3.5 text-center">
                    <span className="text-xs text-slate font-medium">Category</span>
                    <p className="text-lg font-bold text-ink mt-0.5">{property.propertyType}</p>
                  </div>
                </div>
              </div>

              {/* Full Description */}
              <div className="rounded-2xl border border-line bg-white p-6 sm:p-8 shadow-xs">
                <h2 className="text-xl font-bold text-ink mb-3">About This Property</h2>
                <p className="text-slate leading-relaxed whitespace-pre-line text-sm sm:text-base">
                  {property.description || "No full description provided for this listing."}
                </p>

                {/* Features & Amenities */}
                {property.features && property.features.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-line">
                    <h3 className="text-lg font-bold text-ink mb-4">Key Amenities & Features</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {property.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2.5 text-sm text-ink">
                          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Verified Stakeholders Card */}
              <div className="rounded-2xl border border-line bg-white p-6 shadow-xs">
                <h2 className="text-lg font-bold text-ink mb-4">Transaction Network Representation</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Property Manager Card */}
                  <div className="rounded-xl border border-line/80 bg-mist/50 p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue text-white font-bold">
                        {property.managerName.charAt(0)}
                      </div>
                      <div>
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-blue">
                          Listing Property Manager
                        </span>
                        <p className="text-sm font-bold text-ink">{property.managerName}</p>
                      </div>
                    </div>
                    <p className="mt-2 text-xs text-slate">
                      Verified asset custodian authorized to process inspections and terms.
                    </p>
                  </div>

                  {/* Representing Agents */}
                  {assignedAgentsList.map((agent) => (
                    <div key={agent.id} className="rounded-xl border border-line/80 bg-mist/50 p-4">
                      <div className="flex items-center gap-3">
                        {agent.avatarUrl ? (
                          <img src={agent.avatarUrl} alt={agent.name} className="h-10 w-10 rounded-full object-cover" />
                        ) : (
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky text-white font-bold">
                            {agent.name.charAt(0)}
                          </div>
                        )}
                        <div>
                          <span className="text-[11px] font-semibold uppercase tracking-wider text-sky">
                            Assigned Astral Agent
                          </span>
                          <p className="text-sm font-bold text-ink">{agent.name}</p>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-xs text-slate">{agent.brokerage}</span>
                        <Link
                          href={`/catalogue/${agent.catalogueSlug}`}
                          className="text-xs font-semibold text-blue hover:underline"
                        >
                          View Catalogue →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Sticky Booking & Inspection Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-3xl border border-line bg-white p-6 shadow-lg">
                <div className="flex items-center justify-between border-b border-line pb-4 mb-4">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate">Price</span>
                    <p className="text-2xl font-bold text-blue">
                      {formatPrice(property.price, property.priceUnit)}
                    </p>
                  </div>
                  <span className="rounded-lg bg-emerald-50 text-emerald-700 font-semibold px-2.5 py-1 text-xs border border-emerald-200">
                    Ready for Viewing
                  </span>
                </div>

                {bookingSubmitted ? (
                  <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-5 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-3">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-base font-bold text-emerald-900">Inspection Request Sent!</h3>
                    <p className="mt-1 text-xs text-emerald-700 leading-relaxed">
                      Thank you, {bookingForm.name || "client"}. Your inspection has been registered in the Astral opportunity pipeline. The assigned agent will call you shortly.
                    </p>
                    <button
                      onClick={() => setBookingSubmitted(false)}
                      className="mt-4 text-xs font-semibold text-emerald-800 underline hover:text-emerald-900"
                    >
                      Book another slot
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="space-y-4">
                    <div>
                      <h3 className="text-base font-bold text-ink">Schedule an Inspection</h3>
                      <p className="text-xs text-slate mt-0.5">
                        Free verified tour with an accredited Astral representative.
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate mb-1">Your Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Samuel Adeleke"
                        value={bookingForm.name}
                        onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                        className="w-full rounded-xl border border-line bg-mist/50 px-3.5 py-2.5 text-sm text-ink focus:border-blue focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate mb-1">Phone Number (WhatsApp)</label>
                      <input
                        type="tel"
                        required
                        placeholder="+234 800 000 0000"
                        value={bookingForm.phone}
                        onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                        className="w-full rounded-xl border border-line bg-mist/50 px-3.5 py-2.5 text-sm text-ink focus:border-blue focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="you@example.com"
                        value={bookingForm.email}
                        onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                        className="w-full rounded-xl border border-line bg-mist/50 px-3.5 py-2.5 text-sm text-ink focus:border-blue focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs font-semibold text-slate mb-1">Preferred Date</label>
                        <input
                          type="date"
                          required
                          value={bookingForm.date}
                          onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                          className="w-full rounded-xl border border-line bg-mist/50 px-3 py-2 text-xs text-ink focus:border-blue focus:bg-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate mb-1">Preferred Time</label>
                        <select
                          value={bookingForm.timeSlot}
                          onChange={(e) => setBookingForm({ ...bookingForm, timeSlot: e.target.value })}
                          className="w-full rounded-xl border border-line bg-mist/50 px-2.5 py-2 text-xs text-ink focus:border-blue focus:bg-white focus:outline-none"
                        >
                          <option>Morning (09:00 - 12:00)</option>
                          <option>Afternoon (12:00 - 15:00)</option>
                          <option>Evening (15:00 - 17:30)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate mb-1">Special Notes / Inquiries</label>
                      <textarea
                        rows={2}
                        placeholder="Any specific questions regarding title, terms, or features..."
                        value={bookingForm.notes}
                        onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                        className="w-full rounded-xl border border-line bg-mist/50 px-3 py-2 text-xs text-ink focus:border-blue focus:bg-white focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full rounded-xl bg-blue py-3 text-sm font-bold text-white shadow-md hover:bg-blue/90 transition"
                    >
                      Confirm Inspection Request
                    </button>

                    <p className="text-[11px] text-center text-slate">
                      🔒 No fees required. Inspected by Astral vetted agents.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
