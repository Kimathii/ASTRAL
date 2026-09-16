import { inspections, properties, opportunities } from "@/lib/mock-data";

const STATUS_STYLE: Record<string, string> = {
  requested: "bg-pending/10 text-pending",
  scheduled: "bg-blue/10 text-blue",
  completed: "bg-verified/10 text-verified",
  cancelled: "bg-rejected/10 text-rejected",
};

export default function AgentInspectionsPage() {
  const mine = inspections.filter((i) => i.agentId === "agent_1");

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-1 text-2xl font-semibold text-ink">My inspections</h1>
      <p className="mb-6 text-sm text-slate">Every inspection you&apos;ve requested, and its outcome — the events that build your reputation.</p>

      <div className="flex flex-col gap-3">
        {mine.map((inspection) => {
          const property = properties.find((p) => p.id === inspection.propertyId);
          return (
            <div key={inspection.id} className="rounded-xl border border-line bg-white p-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono text-slate uppercase">{inspection.transactionId}</span>
                  <h3 className="font-semibold text-ink">{property?.title}</h3>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${STATUS_STYLE[inspection.status]}`}>
                  {inspection.status}
                </span>
              </div>
              <p className="mt-1 text-xs text-slate">
                Requested: {inspection.requestedAt}
                {inspection.scheduledFor && ` • Scheduled: ${new Date(inspection.scheduledFor).toLocaleString("en-NG", { dateStyle: "medium", timeStyle: "short" })}`}
              </p>
              {inspection.feedback && (
                <div className="mt-3 rounded-lg border border-line/60 bg-mist p-3 text-xs">
                  <div className="flex items-center justify-between font-medium text-ink mb-1">
                    <span>Interest: <strong className="capitalize text-blue">{inspection.feedback.interestLevel}</strong></span>
                    <span>Accuracy Rating: <strong>{inspection.feedback.propertyAccuracyScore}/5</strong></span>
                  </div>
                  {inspection.feedback.clientFeedbackNotes && (
                    <p className="text-slate mt-1 italic">&ldquo;{inspection.feedback.clientFeedbackNotes}&rdquo;</p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
