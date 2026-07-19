from agents import build_eda_agent,build_visualization_agent,build_correaltion_agent,build_summary_agent
from langchain_mistralai import MistralAIEmbeddings
from pathlib import Path

embedding_model = MistralAIEmbeddings(model="mistral-embed")

def run_pipeline(query: str) -> dict:
    state={}
    
    print("\n"+" -"*50)
    print("Step 1 - EDA agent is working ...")
    print("\n"+" -"*50)
    
    #EDA agent
    eda_agent= build_eda_agent()
    eda_result= eda_agent.invoke({
        'messages':[{
            'role':'user',
            'content': f"perform EDA process of {query}"
        }]
    })
    state['eda_result']= eda_result['structured_response']
    print("\nEDA result: \n")
    for name, value in state["eda_result"].model_dump().items():
       print(f"\n{name}: {value}\n")
       
    print("\n"+" -"*50)
    print("Step 2 - Visualization agent is working ...")
    print("\n"+" -"*50)
    
    # Visualization agent
    visual_agent= build_visualization_agent()
    visual_result= visual_agent.invoke({
        'messages':[{
            'role':'user',
            'content': f"perform visualization process of {query}"
        }]
    })
    state['visual_result']= visual_result['structured_response']
    print("\nVisualization results: \n")
    for key, value in state["visual_result"].model_dump().items():
       print(f"{key}: {value}")
       
    print("\n"+" -"*50)
    print("Step 3 - Correlation agent is working ...")
    print("\n"+" -"*50)
    
    # Correlation agent
    corr_agent= build_correaltion_agent()
    corr_result= corr_agent.invoke({
        'messages':[{
            'role':'user',
            'content': f"perform correlation process of {query}"}]
    })
    state['corr_result']= corr_result['structured_response']
    print("\nCorrelation result: \n")
    for key, value in state["corr_result"].model_dump().items():
       print(f"{key}: {value}")
    
    print("\n"+" -"*50)
    print("Step 4 - Summary agent is working ...")
    print("\n"+" -"*50)
       
    #summary agent
    summary_agent= build_summary_agent()
    summary_result= summary_agent.invoke({
        'messages':[{
            'role':'user',
            'content': f"perform correlation process of {query}"}]
    })
    
    state['summary_result']= summary_result['structured_response']
    print("\nSummary results: \n")
    for key, value in state['summary_result'].model_dump().items():
       print(f"{key}: {value}")
    
    return state

if __name__ == "__main__":
    run_pipeline("Preform EDA,Visualition and correaltion process")
    print("\nType 'exit' to end the program.")
    print("Type '0' to delete all plot files.")

    inp = input(">> ")

    if inp == "0":
        plots_dir = Path("plots")

        if plots_dir.exists():
            for file in plots_dir.iterdir():
                if file.is_file():
                    file.unlink()

            print("All plot files deleted successfully.")  
            
        else:
            print("'plots' folder does not exist.")   
        print("Program exited")  
                
    elif inp.lower =="exit":
        print("Program exited")   
    