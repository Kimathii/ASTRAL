import Link from "next/link";

export function PublicFooter() {
  return (
    <footer className="border-t border-line bg-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky/20">
                <div className="h-3.5 w-3.5 rounded-xs bg-sky" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">Astral</span>
            </div>
            <p className="text-sm text-slate-300 text-white/70">
              The verified transaction network powering authentic real estate deals across Nigeria.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              100% Title-Verified Listings
            </div>
          </div>

          {/* Col 2: Marketplace */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Explore</h4>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li>
                <a href="/#properties" className="hover:text-white transition">
                  Verified Properties
                </a>
              </li>
              <li>
                <a href="/#agents" className="hover:text-white transition">
                  Featured Agents
                </a>
              </li>
              <li>
                <a href="/#how-it-works" className="hover:text-white transition">
                  Transaction Pipeline
                </a>
              </li>
              <li>
                <a href="/#why-astral" className="hover:text-white transition">
                  Verification Guarantee
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Agent Catalogues */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Agent Direct</h4>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li>
                <Link href="/catalogue/chiamaka-nwosu" className="hover:text-white transition">
                  Chiamaka Nwosu (Luxury & Residential)
                </Link>
              </li>
              <li>
                <Link href="/catalogue/david-osei" className="hover:text-white transition">
                  David Osei (Commercial & Office)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Portals */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Portals & Sign In</h4>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li>
                <Link href="/manager" className="hover:text-white transition">
                  Property Manager Portal →
                </Link>
              </li>
              <li>
                <Link href="/agent" className="hover:text-white transition">
                  Agent Deal Portal →
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-white transition">
                  Admin Control Center →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© {new Date().getFullYear()} Astral Network by GOZ. All rights reserved.</p>
          <p>Built for transparent, verified property transactions.</p>
        </div>
      </div>
    </footer>
  );
}
