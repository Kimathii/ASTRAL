import { agents } from "@/lib/mock-data";

const REPUTATION_STYLE: Record<string, string> = {
  new: "bg-mist text-slate",
  trusted: "bg-blue/10 text-blue",
  top: "bg-verified/10 text-verified",
};

export default function NetworkActivityPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-1 text-2xl font-semibold text-ink">Network activity</h1>
      <p className="mb-6 text-sm text-slate">Agent activity and reputation signals across the network.</p>

      <div className="overflow-hidden rounded-xl border border-line bg-white">
        <table className="w-full text-sm">
          <thead className="border-b border-line bg-mist text-left text-xs uppercase tracking-wide text-slate">
            <tr>
              <th className="px-4 py-3 font-medium">Agent</th>
              <th className="px-4 py-3 font-medium">Brokerage</th>
              <th className="px-4 py-3 font-medium">Active</th>
              <th className="px-4 py-3 font-medium">Closed</th>
              <th className="px-4 py-3 font-medium">Reputation</th>
            </tr>
          </thead>
          <tbody>
            {agents.map((agent) => (
              <tr key={agent.id} className="border-b border-line last:border-0">
                <td className="px-4 py-3 font-medium text-ink">{agent.name}</td>
                <td className="px-4 py-3 text-slate">{agent.brokerage}</td>
                <td className="px-4 py-3 text-ink">{agent.activeOpportunities}</td>
                <td className="px-4 py-3 text-ink">{agent.closedDeals}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${REPUTATION_STYLE[agent.reputation]}`}>
                    {agent.reputation}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
