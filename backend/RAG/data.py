import pandas as pd

csv_data = None
csv_path = None


def load_data(file):
    global csv_data, csv_path

    csv_path = file
    csv_data = pd.read_csv(file)

    return csv_data