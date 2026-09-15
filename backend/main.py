from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pathlib import Path
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv

from RAG.pipeLine import run_pipeline

load_dotenv()

app = FastAPI(title="CSV File Analyzer API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = Path(__file__).resolve().parent
PLOTS_DIR = BASE_DIR / "plots"

PLOTS_DIR.mkdir(exist_ok=True)

app.mount(
    "/plots",
    StaticFiles(directory=str(PLOTS_DIR)),
    name="plots"
)


@app.get("/")
def home():
    return {
        "message": "CSV file analyzer API"
    }


class ModelResponse(BaseModel):
    status: str
    analysis: object
    plots: list[str]


@app.post("/analyze", response_model=ModelResponse)
async def analyze_file(file: UploadFile = File(...)):
    try:
        if not file.filename.lower().endswith(".csv"):
            raise HTTPException(
                status_code=400,
                detail="Only CSV files are allowed"
            )

        upload_dir = BASE_DIR / "RAG" / "uploads"
        upload_dir.mkdir(parents=True, exist_ok=True)

        file_path = upload_dir / file.filename

        contents = await file.read()

        with open(file_path, "wb") as fs:
            fs.write(contents)

        result = run_pipeline(file_path)

        plot_files = [
            f"/plots/{plot.name}"
            for plot in PLOTS_DIR.iterdir()
            if plot.is_file()
            and plot.suffix.lower() in [".png", ".jpg", ".jpeg", ".webp", ".svg"]
        ]

        return {
            "status": "success",
            "analysis": result["analysis_result"],
            "plots": plot_files,
        }

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Something went wrong from our site: {str(e)}"
        )