import { PIPELINE_STAGES, PipelineStage } from "@/lib/types";

// The opportunity's stage is a first-class visual object, not a buried
// status field — this renders everywhere an opportunity appears.

export function PipelineStepper({ stage, compact = false }: { stage: PipelineStage; compact?: boolean }) {
  const currentIndex = PIPELINE_STAGES.findIndex((s) => s.key === stage);

  if (compact) {
    const current = PIPELINE_STAGES[currentIndex];
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-blue/10 px-2.5 py-1 text-xs font-medium text-blue">
        <span className="h-1.5 w-1.5 rounded-full bg-blue" />
        {current.label}
      </span>
    );
  }

  return (
    <ol className="flex items-center gap-2">
      {PIPELINE_STAGES.map((s, i) => {
        const isDone = i < currentIndex;
        const isCurrent = i === currentIndex;
        return (
          <li key={s.key} className="flex flex-1 items-center gap-2">
            <div className="flex flex-col items-center gap-1.5 min-w-0">
              <div
                className={[
                  "flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-semibold shrink-0",
                  isDone
                    ? "border-blue bg-blue text-white"
                    : isCurrent
                    ? "border-blue bg-white text-blue"
                    : "border-line bg-white text-slate",
                ].join(" ")}
              >
                {i + 1}
              </div>
              <span
                className={[
                  "text-xs font-medium text-center leading-tight",
                  isCurrent ? "text-ink" : "text-slate",
                ].join(" ")}
              >
                {s.label}
              </span>
            </div>
            {i < PIPELINE_STAGES.length - 1 && (
              <div className={`h-0.5 flex-1 rounded ${isDone ? "bg-blue" : "bg-line"}`} />
            )}
          </li>
        );
      })}
    </ol>
  );
}
