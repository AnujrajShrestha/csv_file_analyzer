CSV File Analyzer using Multi-Agent AI

A multi-agent AI application built with LangChain, Mistral AI, and Groq that performs Exploratory Data Analysis (EDA), data visualization, correlation analysis, and dataset summarization on CSV files.

Each task is handled by a dedicated AI agent using custom LangChain tools and structured outputs powered by Pydantic.

Features
Multi-agent architecture
Automated Exploratory Data Analysis (EDA)
Dataset visualization
Correlation heatmap generation
Automatic dataset summary
Structured outputs using Pydantic models
Individual agents for different tasks
Automatic saving of generated plots
Delete generated plots from terminal
Project Structure
CSV-FILE-ANALYZER/
│
├── plots/
│   ├── airconditioning.png
│   ├── area.png
│   ├── basement.png
│   ├── bathrooms.png
│   ├── bedrooms.png
│   ├── correlation.png
│   ├── furnishingstatus.png
│   ├── guestroom.png
│   ├── hotwaterheating.png
│   ├── mainroad.png
│   ├── parking.png
│   ├── prefarea.png
│   ├── price.png
│   └── stories.png
│
├── tools.py
├── agents.py
├── pipeline.py
├── Housing.csv
├── requirements.txt
├── .env
└── README.md
Architecture
                User Query
                     │
                     ▼
              Pipeline Controller
                     │
     ┌───────────────┼────────────────┐
     │               │                │
     ▼               ▼                ▼
 EDA Agent     Visualization Agent   Correlation Agent
     │               │                │
     └───────────────┼────────────────┘
                     │
                     ▼
              Summary Agent
                     │
                     ▼
          Structured Final Output
Tech Stack
Python
LangChain
Mistral AI
Groq
Pandas
Matplotlib
Seaborn
Pydantic
Installation

Clone the repository

git clone https://github.com/yourusername/csv-file-analyzer.git

cd csv-file-analyzer

Create virtual environment

python -m venv venv

Activate environment

Windows
venv\Scripts\activate
Linux / macOS
source venv/bin/activate

Install dependencies

pip install -r requirements.txt
Environment Variables

Create a .env file.

MISTRAL_API_KEY=your_mistral_api_key
GROQ_API_KEY=your_groq_api_key
Running the Project
python pipeline.py
Agents
1. EDA Agent

Performs:

Dataset shape
Column names
First five rows
Data types
Missing values
Duplicate rows
Summary statistics

Tool used:

EDA_tool()

Output:

EDA_format
2. Visualization Agent

Generates visualizations for every dataset column.

For numerical columns:

Histogram
KDE Plot

For categorical columns:

Count Plot

Generated images are stored inside

plots/

Tool used:

visualization_tool()

Output:

VisualizationOutput
3. Correlation Agent

Creates

Pearson Correlation Matrix
Heatmap

Saved as

plots/correlation.png

Tool used

correlation_tool()

Output

CorrelationOutput
4. Summary Agent

Produces a concise summary including

Dataset name
Number of rows
Number of columns
Numerical columns
Categorical columns
Missing values
Duplicate rows

Tool

summary_tool()

Output

SummaryOutput
Example Output
Step 1 - EDA Agent

✔ Shape
✔ Columns
✔ Missing Values
✔ Statistics

--------------------------------

Step 2 - Visualization Agent

✔ Generated 13 plots

--------------------------------

Step 3 - Correlation Agent

✔ Correlation Heatmap Saved

--------------------------------

Step 4 - Summary Agent

✔ Dataset Summary Generated
Generated Visualizations

The application automatically generates plots for each column.

Example:

plots/

price.png

area.png

bedrooms.png

bathrooms.png

stories.png

mainroad.png

guestroom.png

basement.png

parking.png

prefarea.png

furnishingstatus.png

correlation.png
Cleaning Generated Files

After execution the program provides two options.

Delete all generated plots

0

Exit

exit
Current Dataset

The project currently uses

Housing.csv

You can replace it with your own CSV file by updating:

CSV_PATH = "your_dataset.csv"

inside

tools.py
Future Improvements
Streamlit web interface
CSV file upload support
Download analysis report as PDF
Interactive Plotly visualizations
Multiple dataset support
Feature importance analysis
Machine learning recommendations
RAG-powered dataset Q&A
Automatic insight generation using LLMs
Requirements
langchain
langchain-core
langchain-groq
langchain-mistralai
pandas
matplotlib
seaborn
pydantic
python-dotenv
Author

Anuj Shrestha

GitHub: https://github.com/AnujrajShrestha

License

This project is licensed under the MIT License.

Notes

Your agents and tools are implemented correctly, but the sample result.txt shows that the Visualization, Correlation, and Summary agents sometimes return LLM-generated placeholder values (e.g., 100 rows, column1, column2) instead of the actual tool output. This happens because the agent is generating a structured response rather than directly using the tool's returned object. A good next improvement would be to configure the agents so they always return the tool's actual Pydantic output, ensuring the reported results exactly match the generated plots and dataset.