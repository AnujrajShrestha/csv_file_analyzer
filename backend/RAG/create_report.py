def create_report(state: dict):

    separator = "\n" + "-" * 60 + "\n"

    with open("report.txt", "w", encoding="utf-8") as fs:   
        fs.write("\nAnalysis result: \n")
        for message in state["analysis_result"]:
            fs.write(type(message).__name__)
            fs.write(message.content)
            fs.write("-" * 50)

        

    return "report.txt"