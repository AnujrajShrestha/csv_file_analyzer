import { useState } from "react";
import {
  BarChart3,
  ExternalLink,
  Maximize2,
  X,
} from "lucide-react";

import { getPlotUrl } from "../services/api";

export default function PlotCard({
  src,
  index,
  title,
}) {
  const [error, setError] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  const imageUrl = getPlotUrl(src);

  if (error) {
    return (
      <div className="flex min-h-64 items-center justify-center rounded-2xl border border-red-400/10 bg-red-500/5 p-6 text-center">
        <div>
          <BarChart3
            size={25}
            className="mx-auto mb-3 text-red-400"
          />

          <p className="text-sm font-medium text-gray-400">
            Unable to load visualization
          </p>

          <p className="mt-2 break-all text-xs text-gray-600">
            {imageUrl}
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] transition-all duration-300 hover:border-indigo-400/20">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <div className="flex min-w-0 items-center gap-2">
            <BarChart3
              size={16}
              className="shrink-0 text-indigo-300"
            />

            <span className="truncate text-sm font-medium text-gray-300">
              {title || `Visualization ${index + 1}`}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setFullscreen(true)}
              className="rounded-lg p-2 text-gray-500 transition hover:bg-white/10 hover:text-white"
              title="Fullscreen"
            >
              <Maximize2 size={15} />
            </button>

            <a
              href={imageUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg p-2 text-gray-500 transition hover:bg-white/10 hover:text-white"
              title="Open image"
            >
              <ExternalLink size={15} />
            </a>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setFullscreen(true)}
          className="block w-full bg-black/20 p-3"
        >
          <img
            src={imageUrl}
            alt={
              title ||
              `Generated visualization ${index + 1}`
            }
            onError={() => setError(true)}
            className="max-h-[500px] w-full rounded-xl object-contain transition duration-500 group-hover:scale-[1.01]"
          />
        </button>
      </div>

      {fullscreen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-5 backdrop-blur-md"
          onClick={() => setFullscreen(false)}
        >
          <button
            type="button"
            onClick={() => setFullscreen(false)}
            className="absolute right-5 top-5 rounded-xl border border-white/10 bg-white/10 p-3 text-white hover:bg-white/20"
          >
            <X size={20} />
          </button>

          <img
            src={imageUrl}
            alt={
              title ||
              `Generated visualization ${index + 1}`
            }
            className="max-h-[90vh] max-w-[95vw] rounded-xl object-contain"
            onClick={(event) =>
              event.stopPropagation()
            }
          />
        </div>
      )}
    </>
  );
}
