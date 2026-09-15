import { useEffect, useMemo, useState } from "react";

import {
  AlertCircle,
  BarChart3,
  CheckCircle2,
  Database,
  FileBarChart,
  Server,
  Sparkles,
  Upload,
} from "lucide-react";

import AnimatedBackground from "./components/AnimatedBackground";
import Navbar from "./components/Navbar";
import UploadCard from "./components/UploadCard";
import StatCard from "./components/StatCard";
import InsightCard from "./components/InsightCard";
import PlotCard from "./components/PlotCard";
import RawResult from "./components/RawResult";
import LoadingOverlay from "./components/LoadingOverlay";

import {
  analyzeCSV,
  checkBackend,
  getPlotUrl,
} from "./services/api";


/* =========================================================
   Helpers
========================================================= */

function getMessageContent(message) {
  if (!message) return "";

  if (typeof message === "string") {
    return message;
  }

  return typeof message.content === "string"
    ? message.content
    : "";
}


function getAnalysisMessages(analysis) {
  if (!Array.isArray(analysis)) {
    return [];
  }

  return analysis;
}


/* =========================================================
   Extract EDA information
========================================================= */

function extractEDA(analysis) {
  const messages = getAnalysisMessages(analysis);

  const edaMessage = messages.find(
    (message) =>
      message?.type === "tool" &&
      message?.name === "EDA_tool"
  );

  if (!edaMessage?.content) {
    return {};
  }

  const content = edaMessage.content;

  const result = {
    rows: null,
    columns: null,
    missing: 0,
    numeric: 0,
    categorical: 0,
    duplicateRows: 0,
  };


  /* -----------------------------
     Shape
     Example:
     shape='(10000, 10)'
  ----------------------------- */

  const shapeMatch = content.match(
    /shape=['"]?\((\d+),\s*(\d+)\)['"]?/
  );

  if (shapeMatch) {
    result.rows = Number(shapeMatch[1]);
    result.columns = Number(shapeMatch[2]);
  }


  /* -----------------------------
     Missing values

     We know the EDA result contains:
     missing_values={
       'College_ID': 0,
       ...
     }
  ----------------------------- */

  const missingMatch = content.match(
    /missing_values=\{([\s\S]*?)\}\s+duplicate_rows/
  );

  if (missingMatch) {
    const missingValuesText = missingMatch[1];

    const values = missingValuesText.match(/:\s*(\d+)/g);

    if (values) {
      result.missing = values.reduce(
        (total, value) =>
          total + Number(value.replace(":", "").trim()),
        0
      );
    }
  }


  /* -----------------------------
     Duplicate rows
  ----------------------------- */

  const duplicateMatch = content.match(
    /duplicate_rows=(\d+)/
  );

  if (duplicateMatch) {
    result.duplicateRows = Number(
      duplicateMatch[1]
    );
  }


  /* -----------------------------
     data_types

     Example:
     data_types={
       'College_ID': 'str',
       'IQ': 'int64',
       ...
     }
  ----------------------------- */

  const dataTypesMatch = content.match(
    /data_types=\{([\s\S]*?)\}\s+missing_values/
  );

  if (dataTypesMatch) {
    const dataTypesText = dataTypesMatch[1];

    const typeMatches =
      dataTypesText.match(/:\s*['"][^'"]+['"]/g);

    if (typeMatches) {
      typeMatches.forEach((item) => {
        const type = item
          .split(":")[1]
          .replaceAll("'", "")
          .replaceAll('"', "")
          .trim();

        if (
          type === "str" ||
          type === "object" ||
          type.includes("category")
        ) {
          result.categorical += 1;
        } else {
          result.numeric += 1;
        }
      });
    }
  }

  return result;
}


/* =========================================================
   Extract final AI summary
========================================================= */

function extractFinalSummary(analysis) {
  const messages = getAnalysisMessages(analysis);

  /*
    The final AI message contains:

    ### Dataset Overview

    ...
    
    ### 1. Exploratory Data Analysis

    ...
  */

  const aiMessages = messages.filter(
    (message) =>
      message?.type === "ai" &&
      typeof message?.content === "string" &&
      message.content.trim().length > 0
  );

  if (aiMessages.length === 0) {
    return "";
  }

  return aiMessages[aiMessages.length - 1].content;
}


/* =========================================================
   Extract generated plots
========================================================= */

function extractPlots(analysis) {
  const messages = getAnalysisMessages(analysis);

  const plots = [];

  /* -----------------------------
     Visualization tool
  ----------------------------- */

  const visualizationMessage = messages.find(
    (message) =>
      message?.type === "tool" &&
      message?.name === "visualization_tool"
  );

  if (visualizationMessage?.content) {
    const content = visualizationMessage.content;

    const match = content.match(
      /generated_plots=\[([\s\S]*?)\]\s+total_plots/
    );

    if (match) {
      const filenames = match[1].match(
        /['"]([^'"]+\.png)['"]/g
      );

      if (filenames) {
        filenames.forEach((filename) => {
          const cleanName = filename
            .replaceAll("'", "")
            .replaceAll('"', "");

          plots.push(`/plots/${cleanName}`);
        });
      }
    }
  }


  /* -----------------------------
     Correlation plot
  ----------------------------- */

  const correlationMessage = messages.find(
    (message) =>
      message?.type === "tool" &&
      message?.name === "correlation_tool"
  );

  if (
    correlationMessage &&
    !plots.includes("/plots/correlation.png")
  ) {
    plots.push("/plots/correlation.png");
  }


  return plots;
}


/* =========================================================
   Markdown-ish AI summary renderer
========================================================= */

function SummaryContent({ content }) {
  if (!content) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-sm text-gray-500">
        No AI summary was returned.
      </div>
    );
  }

  /*
    Split markdown content into readable sections.
  */

  const lines = content.split("\n");

  return (
    <div className="space-y-3">
      {lines.map((line, index) => {
        const trimmed = line.trim();

        if (!trimmed) {
          return <div key={index} className="h-1" />;
        }


        /* Heading */

        if (trimmed.startsWith("###")) {
          return (
            <h3
              key={index}
              className="mt-5 text-lg font-semibold text-indigo-300"
            >
              {trimmed.replace(/^###\s*/, "")}
            </h3>
          );
        }


        /* Bold heading */

        if (
          trimmed.startsWith("**") &&
          trimmed.endsWith("**")
        ) {
          return (
            <h4
              key={index}
              className="mt-4 font-semibold text-white"
            >
              {trimmed.replaceAll("**", "")}
            </h4>
          );
        }


        /* Bullet */

        if (
          trimmed.startsWith("* ") ||
          trimmed.startsWith("- ")
        ) {
          return (
            <div
              key={index}
              className="flex gap-3 text-sm leading-7 text-gray-300"
            >
              <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400" />

              <span>
                {trimmed
                  .replace(/^[*-]\s*/, "")
                  .replaceAll("**", "")}
              </span>
            </div>
          );
        }


        /* Numbered list */

        if (/^\d+\.\s/.test(trimmed)) {
          return (
            <div
              key={index}
              className="flex gap-3 text-sm leading-7 text-gray-300"
            >
              <span className="font-semibold text-indigo-300">
                {trimmed.match(/^\d+/)?.[0]}.
              </span>

              <span>
                {trimmed
                  .replace(/^\d+\.\s*/, "")
                  .replaceAll("**", "")}
              </span>
            </div>
          );
        }


        return (
          <p
            key={index}
            className="text-sm leading-7 text-gray-300"
          >
            {trimmed.replaceAll("**", "")}
          </p>
        );
      })}
    </div>
  );
}


/* =========================================================
   Analysis Result
========================================================= */

function AnalysisResult({ data }) {
  const analysis = data?.analysis;

  const statistics = useMemo(
    () => extractEDA(analysis),
    [analysis]
  );

  const summary = useMemo(
    () => extractFinalSummary(analysis),
    [analysis]
  );

  const plots = useMemo(
    () => extractPlots(analysis),
    [analysis]
  );


  return (
    <div className="space-y-12">

      {/* ============================================
          Dataset Overview
      ============================================ */}

      <section>
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <div className="rounded-xl border border-indigo-400/20 bg-indigo-500/10 p-2">
              <Database
                size={18}
                className="text-indigo-300"
              />
            </div>

            <h2 className="text-xl font-semibold text-white">
              Dataset Overview
            </h2>
          </div>

          <p className="mt-2 text-sm text-gray-500">
            Basic information extracted from your CSV.
          </p>
        </div>


        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">

          <StatCard
            icon={Database}
            label="Rows"
            value={statistics.rows ?? "—"}
          />

          <StatCard
            icon={FileBarChart}
            label="Columns"
            value={statistics.columns ?? "—"}
          />

          <StatCard
            icon={AlertCircle}
            label="Missing Values"
            value={statistics.missing ?? "—"}
          />

          <StatCard
            icon={BarChart3}
            label="Numeric"
            value={statistics.numeric || "—"}
          />

          <StatCard
            icon={FileBarChart}
            label="Categorical"
            value={statistics.categorical || "—"}
          />

        </div>


        {/* Extra dataset information */}

        <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.025] p-4">

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-gray-500">

            <span>
              Duplicate rows:
              <strong className="ml-1 text-gray-300">
                {statistics.duplicateRows ?? "—"}
              </strong>
            </span>

            <span>
              Dataset:
              <strong className="ml-1 text-gray-300">
                {statistics.rows ?? "—"} ×{" "}
                {statistics.columns ?? "—"}
              </strong>
            </span>

          </div>

        </div>
      </section>


      {/* ============================================
          AI Insights
      ============================================ */}

      <section>
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <div className="rounded-xl border border-indigo-400/20 bg-indigo-500/10 p-2">
              <Sparkles
                size={18}
                className="text-indigo-300"
              />
            </div>

            <h2 className="text-xl font-semibold text-white">
              AI Insights
            </h2>
          </div>

          <p className="mt-2 text-sm text-gray-500">
            Insights generated by your analysis pipeline.
          </p>
        </div>


        <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-6 backdrop-blur-xl">

          <SummaryContent content={summary} />

        </div>
      </section>


      {/* ============================================
          Visualizations
      ============================================ */}

      {plots.length > 0 && (
        <section>

          <div className="mb-6">
            <div className="flex items-center gap-3">
              <div className="rounded-xl border border-indigo-400/20 bg-indigo-500/10 p-2">
                <BarChart3
                  size={18}
                  className="text-indigo-300"
                />
              </div>

              <h2 className="text-xl font-semibold text-white">
                Visualizations
              </h2>
            </div>

            <p className="mt-2 text-sm text-gray-500">
              Plots generated by the backend analysis pipeline.
            </p>
          </div>


          <div className="grid gap-5 lg:grid-cols-2">

            {plots.map((plot, index) => (
              <PlotCard
                key={`${plot}-${index}`}
                src={getPlotUrl(plot)}
                index={index}
              />
            ))}

          </div>

        </section>
      )}


      {/* ============================================
          Raw Result
      ============================================ */}

      <section>

        <div className="mb-6">
          <div className="flex items-center gap-3">

            <div className="rounded-xl border border-indigo-400/20 bg-indigo-500/10 p-2">
              <FileBarChart
                size={18}
                className="text-indigo-300"
              />
            </div>

            <h2 className="text-xl font-semibold text-white">
              Raw Result
            </h2>

          </div>

          <p className="mt-2 text-sm text-gray-500">
            Complete response returned by the FastAPI backend.
          </p>

        </div>


        <RawResult data={data} />

      </section>

    </div>
  );
}


/* =========================================================
   Main App
========================================================= */

export default function App() {

  const [file, setFile] = useState(null);

  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [backendOnline, setBackendOnline] = useState(false);


  /* --------------------------------------------
     Backend health check
  -------------------------------------------- */

  useEffect(() => {

    let mounted = true;

    async function checkAPI() {

      const online = await checkBackend();

      if (mounted) {
        setBackendOnline(online);
      }

    }

    checkAPI();

    return () => {
      mounted = false;
    };

  }, []);


  /* --------------------------------------------
     Analyze CSV
  -------------------------------------------- */

  async function handleAnalyze() {

    if (!file) {
      setError("Please select a CSV file first.");
      return;
    }

    setLoading(true);
    setError("");
    setData(null);


    try {

      const result = await analyzeCSV(file);

      console.log("Backend response:", result);

      setData(result);


      setTimeout(() => {

        document
          .getElementById("results")
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });

      }, 150);

    } catch (err) {

      console.error("CSV analysis error:", err);

      setError(
        err?.message ||
          "Something went wrong while analyzing the CSV."
      );

    } finally {

      setLoading(false);

    }
  }


  return (
    <div className="min-h-screen overflow-x-hidden bg-[#030712] text-gray-200">

      <AnimatedBackground />

      <Navbar backendOnline={backendOnline} />


      <main className="relative mx-auto max-w-7xl px-5 pb-20 pt-14 lg:px-8 lg:pt-20">

        {/* ======================================
            Hero
        ====================================== */}

        <section className="mx-auto max-w-4xl text-center">

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-3 py-1.5 text-xs font-medium text-indigo-300">

            <Sparkles size={13} />

            AI-Powered CSV Analysis

          </div>


          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">

            Understand your data

            <span className="block bg-gradient-to-r from-indigo-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">

              without the busywork.

            </span>

          </h1>


          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base">

            Upload a CSV and let your FastAPI analysis
            pipeline perform exploratory analysis,
            generate AI insights, and create
            visualizations.

          </p>

        </section>


        {/* ======================================
            Upload
        ====================================== */}

        <section className="mx-auto mt-12 max-w-3xl">

          <UploadCard
            file={file}
            setFile={setFile}
            onAnalyze={handleAnalyze}
            loading={loading}
          />


          {error && (

            <div className="mt-5 flex gap-3 rounded-2xl border border-red-400/20 bg-red-500/5 p-5">

              <AlertCircle
                size={19}
                className="mt-0.5 shrink-0 text-red-400"
              />

              <div>

                <p className="text-sm font-medium text-red-300">
                  Analysis failed
                </p>

                <p className="mt-1 text-sm leading-6 text-gray-500">
                  {error}
                </p>

              </div>

            </div>

          )}

        </section>


        {/* ======================================
            Results
        ====================================== */}

        {data && (

          <section
            id="results"
            className="mt-20 scroll-mt-24"
          >

            <div className="mb-10 flex flex-col justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-end">

              <div>

                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400">
                  Analysis complete
                </p>

                <h2 className="text-3xl font-bold text-white">
                  Dataset Report
                </h2>

              </div>


              <div className="flex items-center gap-2 text-xs text-emerald-400">

                <CheckCircle2 size={15} />

                Pipeline completed successfully

              </div>

            </div>


            <AnalysisResult data={data} />

          </section>

        )}


        {/* ======================================
            Empty State
        ====================================== */}

        {!data && !loading && (

          <section className="mx-auto mt-16 grid max-w-4xl gap-4 sm:grid-cols-3">

            {[
              {
                icon: Upload,
                title: "Upload",
                text: "Drop any CSV dataset into the analyzer.",
              },
              {
                icon: Sparkles,
                title: "Analyze",
                text: "Your AI-powered backend pipeline processes the data.",
              },
              {
                icon: BarChart3,
                title: "Explore",
                text: "Review insights, statistics and generated plots.",
              },
            ].map((item) => {

              const Icon = item.icon;

              return (

                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.025] p-5 transition hover:border-indigo-400/20 hover:bg-white/[0.04]"
                >

                  <Icon
                    size={20}
                    className="mb-4 text-indigo-300"
                  />

                  <h3 className="text-sm font-semibold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-xs leading-6 text-gray-600">
                    {item.text}
                  </p>

                </div>

              );

            })}

          </section>

        )}

      </main>


      {/* ======================================
          Footer
      ====================================== */}

      <footer className="border-t border-white/10 py-7">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 text-xs text-gray-600 sm:flex-row lg:px-8">

          <p>
            CSV Analyzer · FastAPI + AI Pipeline
          </p>

          <div className="flex items-center gap-2">

            <Server size={13} />

            Local analysis backend

          </div>

        </div>

      </footer>


      {/* ======================================
          Loading
      ====================================== */}

      <LoadingOverlay visible={loading} />

    </div>
  );
}
