from dotenv import load_dotenv
from langchain.agents import create_agent
from langchain_mistralai import ChatMistralAI

from tools import EDA_tool,visualization_tool,correlation_tool,summary_tool,VisualizationOutput,CorrelationOutput,SummaryOutput,EDA_format

load_dotenv()

llm = ChatMistralAI(
    model="mistral-small-latest",
    temperature=0,
)
    
def build_analysis_agent():
    return create_agent(
        model=llm,
        tools=[EDA_tool,visualization_tool,correlation_tool,summary_tool]
    )