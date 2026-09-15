import { FileBarChart, Server } from "lucide-react";

export default function Navbar({ backendOnline }) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#030712]/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="rounded-xl border border-indigo-400/20 bg-indigo-500/10 p-2">
            <FileBarChart
              size={20}
              className="text-indigo-300"
            />
          </div>

          <div>
            <h1 className="text-sm font-semibold text-white sm:text-base">
              CSV Analyzer
            </h1>

            <p className="hidden text-xs text-gray-600 sm:block">
              AI-powered data exploration
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5">
          <span
            className={`h-2 w-2 rounded-full ${
              backendOnline
                ? "bg-emerald-400 shadow-lg shadow-emerald-400/50"
                : "bg-red-400 shadow-lg shadow-red-400/40"
            }`}
          />

          <span className="hidden text-xs text-gray-400 sm:block">
            {backendOnline
              ? "Backend online"
              : "Backend offline"}
          </span>

          <span className="text-xs text-gray-400 sm:hidden">
            {backendOnline ? "Online" : "Offline"}
          </span>
        </div>
      </div>
    </header>
  );
}

