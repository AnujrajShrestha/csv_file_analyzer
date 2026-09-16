# 📊 AI CSV File Analyzer

An AI-powered **full-stack CSV analysis application** that combines a modern React frontend with a FastAPI backend and an AI/RAG-powered data analysis pipeline.

Upload a CSV file and let the application automatically analyze the dataset, generate visualizations, calculate statistics and correlations, and provide AI-generated insights.

> **Upload → Analyze → Visualize → Get AI Insights**

---

## ✨ Features

* 📂 Upload CSV datasets
* 📊 Automatic dataset analysis
* 🔎 Exploratory Data Analysis (EDA)
* 📈 Automatic data visualizations
* 🔥 Correlation analysis
* 🤖 AI-generated dataset insights
* 🧠 RAG / multi-agent analysis pipeline
* 📋 Dataset statistics
* 🗂️ Numerical and categorical column detection
* ❌ Missing-value analysis
* 📉 Generated plots
* ⚡ FastAPI backend
* ⚛️ React frontend
* 🔌 LLM-powered analysis
* 🌐 Full-stack architecture

---

# 🏗️ Architecture

The project is divided into two major parts:

```text
                    ┌─────────────────────┐
                    │       User          │
                    │   Uploads CSV File  │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │      Frontend       │
                    │   React + Vite      │
                    └──────────┬──────────┘
                               │
                         HTTP API Request
                               │
                               ▼
                    ┌─────────────────────┐
                    │       Backend       │
                    │      FastAPI        │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │    RAG Pipeline     │
                    │  AI Agents + Tools  │
                    └──────────┬──────────┘
                               │
                ┌──────────────┼──────────────┐
                ▼              ▼              ▼
           EDA Agent     Visualization   Correlation
                              Agent          Agent
                │              │              │
                └──────────────┼──────────────┘
                               ▼
                    ┌─────────────────────┐
                    │   AI Insights       │
                    │   + Raw Results     │
                    │   + Generated Plots │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │      Frontend       │
                    │   Analysis Dashboard│
                    └─────────────────────┘
```

---

# 📁 Project Structure

The repository is organized into separate frontend and backend applications.

```text
csv_file_analyzer/
│
├── backend/
│   │
│   ├── RAG/
│   │   ├── agents.py
│   │   ├── tools.py
│   │   ├── pipeLine.py
│   │   └── ...
│   │
│   ├── plots/
│   │   └── generated plots
│   │
│   ├── uploads/
│   │   └── uploaded CSV files
│   │
│   ├── main.py
│   ├── data.py
│   ├── create_report.py
│   ├── requirements.txt
│   └── ...
│
├── frontend/
│   │
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── ...
│   │
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── ...
│
└── README.md
```

> The exact internal files may evolve as the project develops, but the main architecture remains **frontend + backend + RAG pipeline**.

---

# 🎨 Frontend

The frontend provides the user interface for uploading CSV files and displaying the analysis results.

### Frontend responsibilities

* CSV upload interface
* Dataset overview
* Dataset statistics
* AI insights
* Raw analysis results
* Visualization display
* Loading states
* Error handling
* Communication with the FastAPI backend

### Frontend stack

* React
* Vite
* JavaScript
* CSS
* REST API

---

# ⚙️ Backend

The backend is built using **FastAPI** and acts as the bridge between the frontend, CSV processing logic, and AI pipeline.

### Backend responsibilities

* Receive CSV uploads
* Store uploaded datasets
* Process CSV files
* Run the AI analysis pipeline
* Generate visualizations
* Return analysis results
* Serve generated plots
* Provide API endpoints for the frontend

---

# 🤖 AI / RAG Pipeline

The most important part of this project is the AI-powered analysis pipeline.

Instead of simply running predefined Pandas operations, the project uses specialized AI agents and tools to analyze the uploaded dataset.

The pipeline follows a structure similar to:

```text
CSV
 │
 ▼
Load Dataset
 │
 ▼
EDA Agent
 │
 ├── Dataset shape
 ├── Data types
 ├── Missing values
 ├── Numerical columns
 ├── Categorical columns
 └── Statistical information
 │
 ▼
Visualization Agent
 │
 ├── Distribution plots
 ├── Categorical plots
 └── Other relevant visualizations
 │
 ▼
Correlation Analysis
 │
 └── Correlation heatmap
 │
 ▼
AI Analysis
 │
 ▼
Final Results
```

---

# 🧠 AI Agents

The application uses separate responsibilities for different parts of the analysis.

### 🔍 EDA Agent

Responsible for understanding the basic structure and characteristics of the dataset.

It can analyze:

* Number of rows
* Number of columns
* Column names
* Data types
* Missing values
* Numerical features
* Categorical features
* Statistical summaries

---

### 📊 Visualization Agent

Responsible for determining and generating useful visualizations from the dataset.

Generated plots are stored by the backend and can then be displayed by the frontend.

---

### 🔥 Correlation Analysis

Numerical columns can be analyzed using correlation calculations.

The application can generate a correlation heatmap to help identify relationships between numerical variables.

---

### 💡 AI Insights

After the dataset has been processed, the LLM generates human-readable insights based on the analysis results.

Example:

```text
The dataset contains 10,000 rows and 12 columns.

Several numerical features show strong correlations,
while some columns contain missing values that may
require preprocessing before machine learning.
```

---

# 🛠️ Technology Stack

## Frontend

| Technology | Purpose           |
| ---------- | ----------------- |
| React      | UI development    |
| Vite       | Frontend tooling  |
| JavaScript | Application logic |
| CSS        | Styling           |

## Backend

| Technology | Purpose                   |
| ---------- | ------------------------- |
| Python     | Backend language          |
| FastAPI    | REST API                  |
| Pandas     | CSV processing            |
| NumPy      | Numerical operations      |
| Matplotlib | Visualization             |
| Seaborn    | Statistical visualization |

## AI

| Technology   | Purpose                        |
| ------------ | ------------------------------ |
| LangChain    | LLM application framework      |
| Mistral AI   | AI-powered analysis            |
| Groq         | LLM inference                  |
| RAG Pipeline | Context-aware dataset analysis |

---

# 🚀 Getting Started

## 1. Clone the Repository

```bash
git clone https://github.com/AnujrajShrestha/csv_file_analyzer.git

cd csv_file_analyzer
```

---

# ⚙️ Backend Setup

Navigate to the backend:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv .venv
```

Activate it on Windows:

```bash
.venv\Scripts\activate
```

Install the dependencies:

```bash
pip install -r requirements.txt
```

---

## 🔐 Environment Variables

Create a `.env` file inside the backend directory.

```env
MISTRAL_API_KEY=your_mistral_api_key
GROQ_API_KEY=your_groq_api_key
```

Use your own API keys.

**Never commit your `.env` file to GitHub.**

---

## ▶️ Start the Backend

From the `backend` directory:

```bash
uvicorn main:app --reload
```

The API will run at:

```text
http://127.0.0.1:8000
```

FastAPI Swagger documentation:

```text
http://127.0.0.1:8000/docs
```

---

# 🎨 Frontend Setup

Open another terminal.

From the project root:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

# 🔄 Running the Full Application

You need two terminals.

### Terminal 1 — Backend

```bash
cd backend
.venv\Scripts\activate
uvicorn main:app --reload
```

### Terminal 2 — Frontend

```bash
cd frontend
npm install
npm run dev
```

Then open the frontend URL provided by Vite.

---

# 📊 Analysis Results

After uploading a CSV file, the application provides information such as:

### Dataset Overview

```text
Rows
Columns
Missing Values
Numerical Columns
Categorical Columns
```

### AI Insights

The AI generates insights based on the dataset and analysis performed by the backend.

### Raw Results

The application can also expose the structured output generated by the analysis pipeline.

### Visualizations

Generated plots are stored in the backend:

```text
backend/
└── plots/
```

and can be displayed in the frontend dashboard.

---

# 📸 Application

The project includes a frontend dashboard designed to present:

* Dataset overview
* AI-generated insights
* Raw analysis results
* Data visualizations
* Analysis status
* Uploaded dataset information

---

# 🚧 Deployment Status

## Why isn't there a live demo? 😂😭

The application is **fully developed with both frontend and backend**, but the author has not deployed the complete AI/RAG application publicly.

And the reason is very simple:

```text
Money:        $0
Subscriptions: None
Paid API:      💀
Cloud budget:  💀
Deployment:    "Localhost is production" 😂
```

### In other words...

> **The author couldn't deploy this RAG application because of no money and no subscription. 😂😭**

The application can be run locally by providing the required API keys.

So if you're wondering:

**"Where is the live demo?"**

The answer is:

> `localhost:5173` — proudly hosted on the author's own computer. 😂

---

# 🔮 Future Improvements

Possible future improvements include:

* 🌐 Deploy frontend and backend
* ☁️ Deploy the RAG pipeline to a cloud platform
* 📊 Add more interactive visualizations
* 🧠 Improve AI-generated insights
* 💬 Add conversational CSV querying
* 🔎 Ask questions directly about uploaded datasets
* 📄 Generate downloadable reports
* 🧹 Add automated data-cleaning recommendations
* 🚨 Add outlier detection
* 📈 Add advanced statistical analysis
* 🔐 Add authentication
* ⚡ Improve pipeline performance
* 📦 Add support for larger datasets

---

# 🎯 What I Learned

This project was built to gain practical experience with:

* Building full-stack applications
* React + Vite
* FastAPI
* REST APIs
* Pandas
* Data analysis
* Data visualization
* LangChain
* RAG architectures
* AI agents
* LLM tool usage
* Mistral AI
* Groq
* Connecting frontend and backend
* Handling uploaded files
* Serving generated files through an API

---

# 👨‍💻 Author

**Anuj Shrestha**

GitHub: [@AnujrajShrestha](https://github.com/AnujrajShrestha)

---

# ⭐ Support

If you find the project interesting, consider giving the repository a ⭐.

And if someone wants to sponsor the deployment infrastructure...

**The RAG app would finally escape localhost. 😂😭**

---

## 📜 License

This project is intended for learning, experimentation, and educational purposes.
