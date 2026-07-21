def create_report(state: dict):

    separator = "\n" + "-" * 60 + "\n"

    with open("report.txt", "w", encoding="utf-8") as fs:

        fs.write(separator)
        fs.write("Step 1 - EDA Agent\n")
        fs.write(separator)

        for key, value in state["eda_result"].model_dump().items():
            fs.write(f"{key}: {value}\n")

        fs.write(separator)
        fs.write("Step 2 - Visualization Agent\n")
        fs.write(separator)

        for key, value in state["visual_result"].model_dump().items():
            fs.write(f"{key}: {value}\n")

        fs.write(separator)
        fs.write("Step 3 - Correlation Agent\n")
        fs.write(separator)

        for key, value in state["corr_result"].model_dump().items():
            fs.write(f"{key}: {value}\n")

        fs.write(separator)
        fs.write("Step 4 - Summary Agent\n")
        fs.write(separator)

        for key, value in state["summary_result"].model_dump().items():
            fs.write(f"{key}: {value}\n")

    return "report.txt"