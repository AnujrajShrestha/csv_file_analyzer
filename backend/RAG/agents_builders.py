from dotenv import load_dotenv
from langchain.agents import create_agent
import os
from .tools import EDA_tool,visualization_tool,correlation_tool,summary_tool
from langchain_groq import ChatGroq

load_dotenv()

llm = ChatGroq(
    model="openai/gpt-oss-20b",
    max_retries=5,
    temperature=0
)
    
def build_analysis_agent():
    return create_agent(
        model=llm,
        tools=[EDA_tool,visualization_tool,correlation_tool,summary_tool],
    )