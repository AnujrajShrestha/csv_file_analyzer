from dotenv import load_dotenv
from langchain.agents import create_agent
from langchain_mistralai import ChatMistralAI
from langchain_groq import ChatGroq

from tools import EDA_tool,visualization_tool,correlation_tool,summary_tool,VisualizationOutput,CorrelationOutput,SummaryOutput,EDA_format

load_dotenv()

llm_mistral= ChatMistralAI(
    model="mistral-large-latest",
    temperature=0
)

llm_groq= ChatGroq(
    model="llama-3.3-70b-versatile",
    temperature=0,
)
    
def build_eda_agent():
    return create_agent(
        model= llm_mistral,
        tools=[EDA_tool],
        response_format=EDA_format,
    )


def build_visualization_agent():
    return create_agent(
        model= llm_mistral,
        tools= [visualization_tool],
        response_format= VisualizationOutput
    )

def build_correaltion_agent():
    return create_agent(
        model= llm_groq,
        tools= [correlation_tool],
        response_format= CorrelationOutput
    )

def build_summary_agent():
    return create_agent(
        model=llm_groq,
        tools= [summary_tool],
        response_format= SummaryOutput
    )