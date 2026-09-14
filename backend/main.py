from fastapi import FastAPI,HTTPException,UploadFile,File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from RAG.pipeLine import run_pipeline

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
    query: str
    
@app.post("/analyze",response_model= modelResponse)
def analyze_file(file: UploadFile= File(...)):
    try:
        if not file.filename.endswith('.csv'):
            raise HTTPException(
                status_code= 400,
                detail="Only CSV files are allowed"
            )
        
        contents= await file.read()
        file_path= f'RAG/uploads/{file.filename}'
        with open(file_path,'wb') as fs:
            fs.write(contents)
            
        result=  run_pipeline(file_path)
        
        return {
            "status": "success",
            "eda": result["eda_result"],
            "visualization": result["visual_result"],
            "correlation": result["corr_result"],
            "summary": result['summary_result']
        }
    except Exception as e:
        raise HTTPException(
            status_code= 500,
            detail=f"Something went wrong from our site {str(e)}"
        )