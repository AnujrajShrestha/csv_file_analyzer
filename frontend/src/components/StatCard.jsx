import { Activity } from "lucide-react";

export default function StatCard({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400/30 hover:bg-white/[0.055]">
      <div className="mb-4 flex items-center justify-between">
        <div className="rounded-xl border border-white/10 bg-white/5 p-2.5">
          <Icon
            size={18}
            className="text-indigo-300"
          />
        </div>

        <Activity
          size={15}
          className="text-emerald-400 opacity-0 transition-opacity group-hover:opacity-100"
        />
      </div>

      <p className="text-sm text-gray-500">
        {label}
      </p>

      <p className="mt-1 truncate text-2xl font-semibold tracking-tight text-white">
        {value ?? "—"}
      </p>
    </div>
  );
}
