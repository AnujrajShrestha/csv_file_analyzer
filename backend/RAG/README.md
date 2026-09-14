# 📊 CSV File Analyzer using Multi-Agent AI

A **Multi-Agent CSV File Analyzer** built with **LangChain**, **Mistral AI**, and **Groq LLMs**. The project automatically performs **Exploratory Data Analysis (EDA)**, **data visualization**, **correlation analysis**, and **dataset summarization** using specialized AI agents.

---

## 🚀 Features

- 📈 Automated Exploratory Data Analysis (EDA)
- 📊 Generates visualization for every dataset column
- 🔥 Creates correlation heatmap for numerical features
- 📝 Generates a concise dataset summary
- 🤖 Multi-Agent architecture using LangChain
- 📂 Saves all generated plots automatically
- 📋 Structured outputs using Pydantic models

---

## 🛠 Tech Stack

- Python
- LangChain
- Mistral AI
- Groq
- Pandas
- Matplotlib
- Seaborn
- Pydantic
- python-dotenv

---

## 📁 Project Structure

```
CSV-FILE-ANALYZER
│
├── plots/                 # Generated visualizations
├── .env
├── agents.py              # AI Agents
├── pipeline.py            # Main pipeline
├── tools.py               # Analysis tools
├── Housing.csv            # Sample dataset
├── requirements.txt
├── README.md
└── result.txt             # Sample output
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/AnujrajShrestha/csv_file_analyzer

cd CSV-File-Analyzer
```

### 2. Create virtual environment

```bash
python -m venv .venv
```

Activate it

**Windows**

```bash
.venv\Scripts\activate
```

**Linux/Mac**

```bash
source .venv/bin/activate
```

---

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

---

### 4. Create a `.env` file

```env
MISTRAL_API_KEY=your_mistral_api_key
GROQ_API_KEY=your_groq_api_key
```

---

## ▶️ Run the Project

```bash
python pipeline.py
```

---

## 🧠 Multi-Agent Workflow

```
                User Query
                     │
                     ▼
            EDA Agent (Mistral)
                     │
                     ▼
      Visualization Agent (Mistral)
                     │
                     ▼
       Correlation Agent (Groq)
                     │
                     ▼
          Summary Agent (Groq)
                     │
                     ▼
              Final Results
```

---

## 📊 Generated Outputs

### ✅ EDA Report

- Dataset Shape
- Column Names
- First Five Rows
- Data Types
- Missing Values
- Duplicate Rows
- Statistical Summary

---

### 📈 Visualizations

The project automatically creates plots for every column.

Examples:

- Histogram
- Distribution Plot
- Count Plot
- KDE Plot

All plots are saved inside

```
plots/
```

---

### 🔥 Correlation Analysis

Creates a Pearson Correlation Heatmap for numerical columns.

Example output

```
plots/correlation.png
```

---

### 📝 Dataset Summary

The summary agent returns

- Dataset Name
- Total Rows
- Total Columns
- Numerical Columns
- Categorical Columns
- Missing Values
- Duplicate Rows
- Human-readable Summary

---

## 📂 Example Output

```
Step 1 - EDA Agent
✔ Dataset analyzed

Step 2 - Visualization Agent
✔ 13 plots generated

Step 3 - Correlation Agent
✔ Correlation heatmap saved

Step 4 - Summary Agent
✔ Summary generated successfully
```

---

## 📸 Sample Dataset

The repository includes a sample dataset:

```
Housing.csv
```

You can replace it with your own CSV dataset by updating the following variable in `tools.py`:

```python
CSV_PATH = "your_dataset.csv"
```

---

## 📦 Dependencies

```
langchain
langchain-core
langchain-community
langchain-groq
langchain-mistralai

pandas
numpy
matplotlib
seaborn

pydantic
python-dotenv
```

---

## 🔮 Future Improvements

- Upload CSV through Streamlit UI
- Support multiple CSV files
- Interactive dashboards
- More visualization types
- Download analysis report as PDF
- Natural language querying over datasets
- Feature engineering suggestions
- Outlier detection
- Data cleaning recommendations

---

## 👨‍💻 Author

**Anuj Shrestha**

GitHub: https://github.com/AnujrajShrestha

---

## ⭐ If you found this project useful, consider giving it a star!