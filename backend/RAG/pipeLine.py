from agents_builders import build_analysis_agent
from create_report import create_report
from pathlib import Path
from data import load_data

file_path=r'C:\Users\anujs\Desktop\Anuj\csv_file-analyzer\backend\RAG\uploads\global_cars_enhanced.csv'

def run_pipeline(file) -> dict:
    print("Loading CSV...")

    load_data(file)
    state={}
    
    print("\n"+" -"*50)
    print("Analysis agent is working ...")
    print("\n"+" -"*50)
    
    #analysis agent
    analysis_agent= build_analysis_agent()
    result = analysis_agent.invoke({
        "messages": [
            {
                "role": "user",
                "content": """
                Analyze the uploaded CSV dataset.

                You must:
                1. Run EDA_tool
                2. Run visualization_tool
                3. Run correlation_tool
                4. Run summary_tool
                """
            }
        ]
    })
    state['analysis_result']= result['messages']
    print("\nAnalysis result: \n")
    for message in result["messages"]:
        print(type(message).__name__)
        print(message.content)
        print("-" * 50)
       
    create_report(state)
    
    return state

if __name__ == "__main__":
    run_pipeline(file_path)
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
                
    elif inp.lower() =="exit":
        print("Program exited")   
    