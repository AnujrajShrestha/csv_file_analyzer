
const API_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export async function analyzeCSV(file) {
  const formData = new FormData();

  formData.append("file", file);

  const response = await fetch(`${API_URL}/analyze`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.detail || "Failed to analyze CSV file"
    );
  }

  return data;
}

export function getPlotUrl(path) {
  if (!path) return "";

  if (path.startsWith("http")) {
    return path;
  }

  return `${API_URL}${path}`;
}

export async function checkBackend() {
  try {
    const response = await fetch(`${API_URL}/`);

    return response.ok;
  } catch {
    return false;
  }
}
