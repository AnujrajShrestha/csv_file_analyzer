import {
  AlertTriangle,
  Lightbulb,
  Sparkles,
} from "lucide-react";

function formatTitle(title) {
  if (!title) return "Insight";

  return title
    .replaceAll("_", " ")
    .replace(/\b\w/g, (char) =>
      char.toUpperCase()
    );
}

function renderValue(value) {
  if (value === null || value === undefined) {
    return (
      <span className="text-gray-600">
        No data available
      </span>
    );
  }

  if (typeof value === "string") {
    return (
      <p className="whitespace-pre-wrap text-sm leading-7 text-gray-300">
        {value}
      </p>
    );
  }

  if (
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return (
      <p className="text-lg font-medium text-white">
        {String(value)}
      </p>
    );
  }

  return (
    <pre className="max-h-80 overflow-auto whitespace-pre-wrap text-xs leading-6 text-gray-400">
      {JSON.stringify(value, null, 2)}
    </pre>
  );
}

export default function InsightCard({
  title,
  value,
  type = "default",
}) {
  const Icon =
    type === "warning"
      ? AlertTriangle
      : type === "tip"
        ? Lightbulb
        : Sparkles;

  return (
    <div className="group rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl transition-all duration-300 hover:border-indigo-400/20 hover:bg-white/[0.05]">
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-xl border border-indigo-400/20 bg-indigo-500/10 p-2">
          <Icon
            size={17}
            className="text-indigo-300"
          />
        </div>

        <h3 className="text-sm font-semibold text-white">
          {formatTitle(title)}
        </h3>
      </div>

      {renderValue(value)}
    </div>
  );
}
