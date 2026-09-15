from fastapi import FastAPI,HTTPException,UploadFile,File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pathlib import Path
from dotenv import load_dotenv

from RAG.pipeLine import run_pipeline

load_dotenv()

app= FastAPI()

@app.get('/')
def home():
    return{'message':"CSV file anaylser API"}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class modelResponse(BaseModel):
    status: str
    analysis: object
    
@app.post("/analyze",response_model= modelResponse)
async def analyze_file(file: UploadFile= File(...)):
    try:
        if not file.filename.endswith('.csv'):
            raise HTTPException(
                status_code= 400,
                detail="Only CSV files are allowed"
            )
        
        upload_dir = Path("RAG/uploads")
        upload_dir.mkdir(parents=True, exist_ok=True)

        # Save uploaded file
        file_path = upload_dir / file.filename

        contents = await file.read()

        with open(file_path, "wb") as fs:
            fs.write(contents)
        result=  run_pipeline(file_path)
        
        return {
            "status": "success",
            "analysis": result['analysis_result']
        }
    except Exception as e:
        raise HTTPException(
            status_code= 500,
            detail=f"Something went wrong from our site {str(e)}"
        )