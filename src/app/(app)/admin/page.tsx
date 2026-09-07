import Link from "next/link";
import { properties, agents, inspections, opportunities } from "@/lib/mock-data";

export default function AdminOverviewPage() {
  const pendingReview = properties.filter((p) => p.verificationStatus === "pending").length;

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="mb-1 text-2xl font-semibold text-ink">Network overview</h1>
      <p className="mb-6 text-sm text-slate">What&apos;s moving across Astral right now.</p>

      <div className="mb-8 grid grid-cols-4 gap-4">
        <Stat label="Properties" value={properties.length} />
        <Stat label="Active agents" value={agents.length} />
        <Stat label="Open opportunities" value={opportunities.length} />
        <Stat label="Inspections logged" value={inspections.length} />
      </div>

      {pendingReview > 0 && (
        <Link
          href="/admin/approvals"
          className="mb-6 flex items-center justify-between rounded-xl border border-pending/30 bg-pending/5 px-5 py-4"
        >
          <span className="text-sm font-medium text-ink">
            {pendingReview} {pendingReview === 1 ? "property needs" : "properties need"} verification review
          </span>
          <span className="text-sm font-medium text-pending">Review now →</span>
        </Link>
      )}

      <div className="rounded-xl border border-line bg-white p-5">
        <h2 className="mb-4 text-sm font-semibold text-ink">Pipeline distribution</h2>
        <div className="flex flex-col gap-2">
          {["discover", "inspect", "negotiate", "legal_close", "grow"].map((stage) => {
            const count = opportunities.filter((o) => o.stage === stage).length;
            return (
              <div key={stage} className="flex items-center gap-3">
                <span className="w-24 shrink-0 text-sm capitalize text-slate">{stage.replace("_", " & ")}</span>
                <div className="h-2 flex-1 rounded-full bg-mist">
                  <div
                    className="h-2 rounded-full bg-blue"
                    style={{ width: `${(count / Math.max(opportunities.length, 1)) * 100}%` }}
                  />
                </div>
                <span className="w-4 text-right text-sm font-medium text-ink">{count}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-line bg-white p-4">
      <p className="text-sm text-slate">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-ink">{value}</p>
    </div>
  );
}
