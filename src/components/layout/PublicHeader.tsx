"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export function PublicHeader() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur-md shadow-xs">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-18">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy shadow-sm transition group-hover:scale-105">
            <div className="h-4 w-4 rounded-xs bg-sky" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-navy">Astral</span>
            <span className="hidden sm:inline-block ml-2 text-xs font-semibold uppercase tracking-wider text-blue bg-ice px-2 py-0.5 rounded">
              Verified Marketplace
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate">
          <a href="/#properties" className="transition hover:text-blue">
            Explore Properties
          </a>
          <a href="/#agents" className="transition hover:text-blue">
            Featured Agents
          </a>
          <a href="/#how-it-works" className="transition hover:text-blue">
            How It Works
          </a>
          <a href="/#why-astral" className="transition hover:text-blue">
            Why Astral
          </a>
        </nav>

        {/* Right CTA & Portal Dropdown */}
        <div className="flex items-center gap-3">
          {/* Dropdown container */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              type="button"
              className="inline-flex items-center gap-2 rounded-xl bg-navy px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-navy/90 focus:outline-none focus:ring-2 focus:ring-blue/50"
              aria-expanded={dropdownOpen}
            >
              <span>Sign In / Portals</span>
              <svg
                className={`h-4 w-4 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Portal Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 origin-top-right rounded-2xl border border-line bg-white p-2 shadow-2xl ring-1 ring-black/5 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                <div className="px-3 py-2 border-b border-line mb-1">
                  <p className="text-xs font-semibold text-slate uppercase tracking-wider">Internal Access</p>
                  <p className="text-xs text-slate/80 mt-0.5">Select your role to open the portal</p>
                </div>

                <div className="space-y-1">
                  <Link
                    href="/manager"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-start gap-3 rounded-xl p-2.5 text-left transition hover:bg-ice group"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue/10 text-blue font-bold group-hover:bg-blue group-hover:text-white transition">
                      PM
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-ink group-hover:text-blue">Property Manager</p>
                      <p className="text-xs text-slate">Manage listings, titles & bookings</p>
                    </div>
                  </Link>

                  <Link
                    href="/agent"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-start gap-3 rounded-xl p-2.5 text-left transition hover:bg-ice group"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sky/15 text-sky font-bold group-hover:bg-blue group-hover:text-white transition">
                      AG
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-ink group-hover:text-blue">Agent Portal</p>
                      <p className="text-xs text-slate">Deals pipeline & personal catalogue</p>
                    </div>
                  </Link>

                  <Link
                    href="/admin"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-start gap-3 rounded-xl p-2.5 text-left transition hover:bg-ice group"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-navy/10 text-navy font-bold group-hover:bg-navy group-hover:text-white transition">
                      AD
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-ink group-hover:text-navy">Admin Center</p>
                      <p className="text-xs text-slate">Platform oversight & verification</p>
                    </div>
                  </Link>
                </div>

                <div className="mt-2 border-t border-line px-3 py-2 bg-mist/60 rounded-b-xl">
                  <p className="text-[11px] text-slate">
                    Looking for an agent's direct list?{" "}
                    <Link href="/#agents" onClick={() => setDropdownOpen(false)} className="text-blue font-semibold hover:underline">
                      See catalogues
                    </Link>
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-slate hover:text-ink hover:bg-mist"
            aria-label="Toggle navigation menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile nav drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-line bg-white px-4 py-4 space-y-3">
          <a
            href="/#properties"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate hover:text-blue"
          >
            Explore Properties
          </a>
          <a
            href="/#agents"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate hover:text-blue"
          >
            Featured Agents
          </a>
          <a
            href="/#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate hover:text-blue"
          >
            How It Works
          </a>
          <a
            href="/#why-astral"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate hover:text-blue"
          >
            Why Astral
          </a>
        </div>
      )}
    </header>
  );
}
