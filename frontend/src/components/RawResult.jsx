import {
  Check,
  Code2,
  Copy,
} from "lucide-react";
import { useState } from "react";

export default function RawResult({ data }) {
  const [copied, setCopied] = useState(false);

  const formattedData = JSON.stringify(
    data,
    null,
    2
  );

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(
        formattedData
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch {
      console.error("Unable to copy result");
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#050816]">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
          </div>

          <div className="flex items-center gap-2">
            <Code2
              size={14}
              className="text-gray-600"
            />

            <span className="text-xs text-gray-600">
              analysis.json
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-2 rounded-lg border border-white/10 px-2.5 py-1.5 text-xs text-gray-500 transition hover:bg-white/5 hover:text-white"
        >
          {copied ? (
            <>
              <Check size={13} />
              Copied
            </>
          ) : (
            <>
              <Copy size={13} />
              Copy
            </>
          )}
        </button>
      </div>

      <pre className="max-h-[550px] overflow-auto p-5 text-xs leading-6 text-gray-400">
        {formattedData}
      </pre>
    </div>
  );
}
