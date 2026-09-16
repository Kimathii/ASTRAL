import { DEAL_STAGES, DealStage } from "@/lib/types";

interface DealStageStepperProps {
  currentStage: DealStage;
  compact?: boolean;
}

export function DealStageStepper({ currentStage, compact = false }: DealStageStepperProps) {
  const currentIndex = DEAL_STAGES.findIndex((s) => s.key === currentStage);
  const activeStage = DEAL_STAGES[currentIndex] || DEAL_STAGES[0];

  if (compact) {
    return (
      <div className="inline-flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue/10 px-2.5 py-0.5 text-xs font-semibold text-blue">
          <span className="h-1.5 w-1.5 rounded-full bg-blue animate-pulse" />
          {activeStage.label}
        </span>
        <span className="text-[11px] text-slate font-medium">
          Step {currentIndex + 1} of {DEAL_STAGES.length}
        </span>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="hidden sm:flex items-center justify-between gap-1">
        {DEAL_STAGES.map((s, i) => {
          const isDone = i < currentIndex;
          const isCurrent = i === currentIndex;
          return (
            <div key={s.key} className="flex flex-1 items-center gap-1">
              <div className="flex flex-col items-center gap-1 flex-1">
                <div
                  className={[
                    "flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-colors shrink-0",
                    isDone
                      ? "bg-verified text-white"
                      : isCurrent
                      ? "border-2 border-blue bg-blue/10 text-blue ring-2 ring-blue/20"
                      : "border border-line bg-mist text-slate",
                  ].join(" ")}
                >
                  {isDone ? (
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </div>
                <span
                  className={[
                    "text-[10px] font-semibold text-center truncate max-w-[70px]",
                    isCurrent ? "text-blue font-bold" : isDone ? "text-ink" : "text-slate/70",
                  ].join(" ")}
                  title={s.label}
                >
                  {s.label}
                </span>
              </div>
              {i < DEAL_STAGES.length - 1 && (
                <div
                  className={`h-0.5 flex-1 rounded mb-4 ${
                    i < currentIndex ? "bg-verified" : "bg-line"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile view */}
      <div className="sm:hidden flex items-center justify-between rounded-xl bg-mist p-3 border border-line">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue text-xs font-bold text-white">
            {currentIndex + 1}
          </div>
          <div>
            <p className="text-xs font-bold text-ink">{activeStage.label}</p>
            <p className="text-[11px] text-slate">{activeStage.actionDescription}</p>
          </div>
        </div>
        <span className="text-[11px] font-semibold text-slate">
          {currentIndex + 1} / {DEAL_STAGES.length}
        </span>
      </div>
    </div>
  );
}
