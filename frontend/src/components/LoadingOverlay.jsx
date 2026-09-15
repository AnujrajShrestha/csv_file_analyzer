import {
  BrainCircuit,
  Database,
  Loader2,
  Sparkles,
} from "lucide-react";

export default function LoadingOverlay({
  visible,
}) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-[#030712]/80 p-5 backdrop-blur-md">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#080b16]/95 p-7 shadow-2xl shadow-indigo-500/10">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-indigo-400/20 bg-indigo-500/10">
          <BrainCircuit
            size={28}
            className="animate-pulse text-indigo-300"
          />
        </div>

        <div className="mt-6 text-center">
          <h3 className="text-lg font-semibold text-white">
            Analyzing your dataset
          </h3>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Your AI pipeline is processing the CSV.
            This can take a little while.
          </p>
        </div>

        <div className="mt-7 space-y-3">
          <LoadingStep
            icon={Database}
            text="Loading dataset"
          />

          <LoadingStep
            icon={Sparkles}
            text="Running AI analysis"
          />

          <LoadingStep
            icon={BrainCircuit}
            text="Generating insights"
          />

          <LoadingStep
            icon={Loader2}
            text="Creating visualizations"
          />
        </div>

        <div className="mt-7 h-1 overflow-hidden rounded-full bg-white/5">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
        </div>
      </div>
    </div>
  );
}

function LoadingStep({ icon: Icon, text }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.025] px-4 py-3">
      <Icon
        size={16}
        className="text-indigo-300"
      />

      <span className="text-xs text-gray-500">
        {text}
      </span>

      <Loader2
        size={13}
        className="ml-auto animate-spin text-gray-700"
      />
    </div>
  );
}
