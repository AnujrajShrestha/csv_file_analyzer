# CSV Analyzer — RAG Engine

A modular **Retrieval-Augmented Generation (RAG) and AI-powered CSV analysis engine** built with Python. The system combines traditional data analysis with LLM-powered agents and tools to analyze uploaded CSV datasets and generate meaningful insights from the data.

The RAG engine is designed as the AI/data-analysis layer of the **CSV File Analyzer** project.

## ✨ Features

* 📂 Load and analyze CSV datasets
* 📊 Automated Exploratory Data Analysis (EDA)
* 🧠 LLM-powered data analysis
* 🤖 Agent-based architecture
* 🛠️ Custom tools for dataset operations
* 🔎 Natural-language interaction with CSV data
* 📈 Statistical and structural analysis
* 📝 Automated generation of dataset insights
* ⚡ Pipeline-based execution
* 🔌 Designed to work with a FastAPI backend
* 🔐 API keys managed through environment variables

---

## 🧠 How It Works

The RAG engine processes a CSV dataset through multiple stages.

```text
                CSV File
                   │
                   ▼
            ┌─────────────┐
            │ CSV Loader  │
            └──────┬──────┘
                   │
                   ▼
          ┌─────────────────┐
          │ Dataset / Data  │
          │   Preparation   │
          └────────┬────────┘
                   │
                   ▼
          ┌─────────────────┐
          │   EDA Agent     │
          │                 │
          │ Structure       │
          │ Statistics      │
          │ Missing Values  │
          │ Data Types      │
          └────────┬────────┘
                   │
                   ▼
          ┌─────────────────┐
          │ Analysis Tools  │
          └────────┬────────┘
                   │
                   ▼
          ┌─────────────────┐
          │   LLM Agent     │
          │                 │
          │ Insights        │
          │ Interpretation  │
          │ Recommendations │
          └────────┬────────┘
                   │
                   ▼
             Final Analysis
```

The pipeline separates **data processing**, **tools**, and **LLM reasoning**, making the system easier to extend and maintain.

---

## 🏗️ Architecture

The RAG directory follows a modular architecture.

```text
RAG/
│
├── agents/
│   └── ...                  # AI agents responsible for analysis
│
├── tools.py                 # Tools used by agents
├── data.py                  # Dataset loading / data state
├── pipeLine.py              # Main analysis pipeline
├── ...
└── README.md
```

> The exact contents of the directory may evolve as the project develops.

### Pipeline

The main pipeline coordinates the analysis workflow:

```text
CSV
 │
 ▼
Load Dataset
 │
 ▼
EDA
 │
 ▼
Data Analysis
 │
 ▼
LLM Reasoning
 │
 ▼
Generate Insights
```

---

## 🤖 Agent-Based Analysis

The project uses an agent-oriented approach rather than relying on a single LLM prompt.

An agent can:

1. Understand the current analysis task.
2. Select an appropriate tool.
3. Execute the tool against the dataset.
4. Inspect the result.
5. Generate an explanation or insight.

This makes the system more flexible than simply sending the entire CSV to an LLM.

---

## 🛠️ Tools

The tools layer provides the operations that AI agents can use to interact with the dataset.

Typical operations include:

* Dataset inspection
* Column analysis
* Data type inspection
* Missing-value analysis
* Statistical calculations
* Data summarization
* Data filtering
* Other Pandas-based operations

Conceptually:

```python
Agent
   │
   ├── analyze_dataset()
   ├── inspect_columns()
   ├── calculate_statistics()
   ├── analyze_missing_values()
   └── summarize_data()
```

The LLM decides **what needs to be analyzed**, while Python/Pandas performs the actual computation.

---

## 📊 EDA Agent

The EDA stage is responsible for understanding the structure and quality of the uploaded dataset.

It can analyze information such as:

* Number of rows
* Number of columns
* Column names
* Data types
* Missing values
* Duplicate records
* Numerical statistics
* Categorical columns
* Dataset structure

Example output:

```text
Dataset Shape:
Rows: 10,000
Columns: 12

Missing Values:
age       23
income    15

Numerical Columns:
age
income
experience

Categorical Columns:
gender
city
education
```

This information can then be passed to subsequent agents for deeper analysis.

---

## 🔄 RAG / LLM Workflow

The system follows a tool-assisted RAG-style workflow:

```text
User Query
    │
    ▼
LLM / Agent
    │
    ▼
Select Tool
    │
    ▼
Execute Python / Pandas Operation
    │
    ▼
Tool Result
    │
    ▼
LLM Interpretation
    │
    ▼
Final Answer
```

This approach helps keep numerical operations grounded in the actual dataset rather than asking the LLM to calculate everything itself.

---

## 🧰 Tech Stack

| Technology    | Purpose                          |
| ------------- | -------------------------------- |
| Python        | Core programming language        |
| Pandas        | CSV processing and data analysis |
| NumPy         | Numerical operations             |
| LangChain     | LLM/agent orchestration          |
| Mistral       | LLM-powered reasoning            |
| FastAPI       | Backend API                      |
| Pydantic      | Data validation                  |
| python-dotenv | Environment configuration        |

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/AnujrajShrestha/csv_file_analyzer.git
cd csv_file_analyzer
```

### 2. Navigate to the backend

```bash
cd backend
```

### 3. Create a virtual environment

```bash
python -m venv .venv
```

### 4. Activate the environment

#### Windows

```powershell
.venv\Scripts\activate
```

#### Linux / macOS

```bash
source .venv/bin/activate
```

### 5. Install dependencies

```bash
pip install -r requirements.txt
```

---

## 🔐 Environment Variables

Create a `.env` file inside the backend directory.

Example:

```env
MISTRAL_API_KEY=your_mistral_api_key
```

If additional providers or services are used by the project, add their API keys to the same environment file.

**Never commit your `.env` file to GitHub.**

---

## ▶️ Running the RAG Pipeline

From the `backend/RAG` directory:

```bash
python pipeLine.py
```

The pipeline will load the CSV and execute the analysis stages.

Example:

```text
Loading CSV...

--------------------------------------------

Step 1 - EDA agent is working ...

--------------------------------------------

Step 2 - Analysis agent is working ...

--------------------------------------------

Generating final insights...
```

---

## 🚀 Running with FastAPI

The RAG engine can be integrated with the FastAPI backend.

From the `backend` directory:

```bash
python -m uvicorn main:app --reload
```

The API will be available at:

```text
http://127.0.0.1:8000
```

FastAPI documentation:

```text
http://127.0.0.1:8000/docs
```

The backend can use the RAG pipeline to process an uploaded CSV and return the generated analysis to the frontend.

---

## 📡 Backend Architecture

The complete application follows this architecture:

```text
React Frontend
      │
      │ HTTP
      ▼
FastAPI Backend
      │
      ▼
CSV Upload / Validation
      │
      ▼
RAG Pipeline
      │
      ├── EDA Agent
      │
      ├── Analysis Tools
      │
      └── LLM Agent
      │
      ▼
Analysis / Insights
      │
      ▼
FastAPI Response
      │
      ▼
React Frontend
```

---

## 🎯 Example Use Cases

The system can be used to answer questions such as:

```text
What are the main characteristics of this dataset?

Which columns contain missing values?

What is the average value of the numerical columns?

Which columns are strongly correlated?

Are there unusual values in the dataset?

What are the most important patterns in this data?

Give me a summary of this dataset.
```

Instead of manually performing every analysis, the agent can determine which tools are required and use the dataset to generate the answer.

---

## 🔮 Future Improvements

Possible improvements include:

* [ ] Add more specialized analysis agents
* [ ] Add visualization-generation tools
* [ ] Add correlation analysis
* [ ] Add outlier detection
* [ ] Add automatic feature analysis
* [ ] Add dataset profiling
* [ ] Add conversational memory
* [ ] Improve agent tool selection
* [ ] Add structured JSON responses
* [ ] Add RAG evaluation
* [ ] Add caching for repeated queries
* [ ] Add support for larger datasets
* [ ] Add streaming LLM responses
* [ ] Improve error handling and fallback mechanisms

---

## 📌 Design Philosophy

The core idea behind this project is:

> **Let Python perform the computation and let the LLM perform the reasoning and explanation.**

For example, instead of asking an LLM to calculate the average of a column directly:

```text
User
 │
 ▼
LLM
 │
 ▼
Pandas Tool
 │
 ▼
Actual Dataset Calculation
 │
 ▼
Result
 │
 ▼
LLM Explanation
```

This provides a more reliable architecture for data-analysis applications because numerical and statistical operations are performed directly on the dataset.

---

## 👨‍💻 Author

**Anuj Shrestha**

GitHub:
https://github.com/AnujrajShrestha

---

## 📄 License

This project is intended for learning, experimentation, and development of AI-powered data-analysis systems.
