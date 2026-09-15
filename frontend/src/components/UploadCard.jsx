import { useRef, useState } from "react";
import {
  FileSpreadsheet,
  Loader2,
  Upload,
  X,
} from "lucide-react";

export default function UploadCard({
  file,
  setFile,
  onAnalyze,
  loading,
}) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  function handleFile(selectedFile) {
    if (!selectedFile) return;

    if (!selectedFile.name.toLowerCase().endsWith(".csv")) {
      alert("Only CSV files are allowed.");
      return;
    }

    setFile(selectedFile);
  }

  function handleDrop(event) {
    event.preventDefault();
    setDragging(false);

    const droppedFile = event.dataTransfer.files?.[0];

    handleFile(droppedFile);
  }

  return (
    <div
      onDragOver={(event) => {
        event.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      className={`relative overflow-hidden rounded-3xl border p-7 text-center backdrop-blur-xl transition-all duration-300 sm:p-12 ${
        dragging
          ? "border-indigo-400 bg-indigo-500/10 shadow-2xl shadow-indigo-500/10"
          : "border-white/10 bg-white/[0.035] hover:border-white/20"
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-purple-500/[0.05]" />

      <div className="relative">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-indigo-400/20 bg-indigo-500/10">
          <Upload
            size={28}
            className="text-indigo-300"
          />
        </div>

        <h3 className="text-xl font-semibold text-white">
          Upload your CSV
        </h3>

        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
          Drag and drop your dataset here or choose a
          CSV file from your computer.
        </p>

        <input
          ref={inputRef}
          type="file"
          accept=".csv,text/csv"
          className="hidden"
          onChange={(event) =>
            handleFile(event.target.files?.[0])
          }
        />

        {!file ? (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="mt-7 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white transition-all hover:border-indigo-400/30 hover:bg-indigo-500/10"
          >
            Choose CSV file
          </button>
        ) : (
          <div className="mx-auto mt-7 max-w-md">
            <div className="flex items-center justify-between rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4 text-left">
              <div className="flex min-w-0 items-center gap-3">
                <FileSpreadsheet
                  size={21}
                  className="shrink-0 text-emerald-400"
                />

                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-white">
                    {file.name}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setFile(null)}
                disabled={loading}
                className="rounded-lg p-2 text-gray-500 transition hover:bg-white/10 hover:text-white disabled:opacity-40"
              >
                <X size={17} />
              </button>
            </div>

            <button
              type="button"
              onClick={onAnalyze}
              disabled={loading}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all hover:bg-indigo-400 hover:shadow-indigo-500/30 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2
                    size={17}
                    className="animate-spin"
                  />
                  Analyzing dataset...
                </>
              ) : (
                <>
                  <Upload size={17} />
                  Analyze Dataset
                </>
              )}
            </button>
          </div>
        )}

        <p className="mt-5 text-xs text-gray-700">
          Supported format: CSV
        </p>
      </div>
    </div>
  );
}
