from agents_builders import build_analysis_agent
from create_report import create_report
from pathlib import Path
from data import load_data

file_path=r'C:\Users\anujs\Desktop\Anuj\csv_file-analyzer\backend\RAG\uploads\global_cars_enhanced.csv'

def run_pipeline(file) -> dict:
    print("Loading CSV...")

    csv_data = load_data(file)
    state={}
    
    print("\n"+" -"*50)
    print("Analysis agent is working ...")
    print("\n"+" -"*50)
    
    #analysis agent
    analysis_agent= build_analysis_agent()
    analysis_result = analysis_agent.invoke({
        "messages": [{
        "role": "user",
        "content": "Perform EDA on the loaded CSV dataset."
        }]
    })
    state['analysis_result']= analysis_result['structured_response']
    print("\nAnalysis result: \n")
    for name, value in state["analysis_result"].model_dump().items():
       print(f"\n{name}: {value}\n")
       
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
    