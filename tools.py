from langchain.tools import tool
import pandas as pd

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import seaborn as sns

from pydantic import BaseModel,Field
from typing import List,Any,Dict

CSV_PATH = ""

class EDA_format(BaseModel):
    """Structured EDA report."""

    shape: str = Field(
        description="Dataset shape in the format '(rows, columns)'."
    )

    columns: List[str] = Field(
        description="List of all column names."
    )

    first_five_rows: List[Dict[str, Any]] = Field(
        description="First five rows of the dataset."
    )

    data_types: Dict[str, str] = Field(
        description="Dictionary mapping each column to its data type."
    )

    missing_values: Dict[str, int] = Field(
        description="Missing value count for each column."
    )

    duplicate_rows: int = Field(
        description="Number of duplicate rows."
    )

    summary_statistics: Dict[str, Dict[str, Any]] = Field(
        description="Statistical summary for each column."
    )

@tool
def EDA_tool(query: str) -> EDA_format:
    """
    Performs Exploratory Data Analysis on the uploaded CSV.
    """

    df = pd.read_csv(CSV_PATH)

    result = f"""
Shape:
{df.shape}

Columns:
{list(df.columns)}

First Five Rows:
{df.head()}

Data Types:
{df.dtypes}

Missing Values:
{df.isnull().sum()}

Duplicate Rows:
{df.duplicated().sum()}

Summary Statistics:
{df.describe(include='all')}
    """

    return result

class VisualizationOutput(BaseModel):
    """Structured output for the visualization tool."""

    status: str = Field(
        description="Status of the visualization generation process."
    )

    output_directory: str = Field(
        description="Directory where all plot images are saved."
    )

    generated_plots: List[str] = Field(
        description="List of generated plot image filenames."
    )

    total_plots: int = Field(
        description="Total number of plots generated."
    )
    

@tool
def visualization_tool(query: str) -> VisualizationOutput:
    """
    Creates visualizations for every column.
    """

    df = pd.read_csv(CSV_PATH)

    generated_plots = []

    for column in df.columns:

        plt.figure(figsize=(6, 4))

        if df[column].dtype == "object":
            sns.countplot(x=df[column])
            plt.xticks(rotation=45)
        else:
            sns.histplot(df[column], kde=True)

        plt.tight_layout()

        filename = f"{column}.png"
        plt.savefig(f"plots/{filename}")

        generated_plots.append(filename)

        plt.close()

    return VisualizationOutput(
        status="Success",
        output_directory="plots",
        generated_plots=generated_plots,
        total_plots=len(generated_plots)
    )

class CorrelationOutput(BaseModel):
    """Structured output for the correlation analysis tool."""

    status: str = Field(
        description="Status of the correlation analysis."
    )

    output_file: str = Field(
        description="Path of the generated correlation heatmap image."
    )

    correlation_method: str = Field(
        description="Method used to compute the correlation matrix."
    )

    numeric_columns: list[str] = Field(
        description="List of numerical columns included in the correlation analysis."
    )

@tool
def correlation_tool(query: str) -> CorrelationOutput:
    """
    Generates a correlation heatmap for numerical columns.
    """

    from pathlib import Path

    Path("plots").mkdir(exist_ok=True)

    df = pd.read_csv(CSV_PATH)

    numeric_df = df.select_dtypes(include="number")

    plt.figure(figsize=(10, 8))

    sns.heatmap(
        numeric_df.corr(),
        annot=True,
        cmap="coolwarm"
    )

    plt.tight_layout()

    output_path = "plots/correlation.png"
    plt.savefig(output_path)
    plt.close()

    return CorrelationOutput(
        status="Success",
        output_file=output_path,
        correlation_method="Pearson",
        numeric_columns=numeric_df.columns.tolist()
    )
    
class SummaryOutput(BaseModel):
    """Structured dataset summary."""

    status: str = Field(
        description="Status of summary generation."
    )

    dataset_name: str = Field(
        description="Name of the dataset."
    )

    total_rows: int = Field(
        description="Number of rows."
    )

    total_columns: int = Field(
        description="Number of columns."
    )

    numerical_columns: list[str] = Field(
        description="List of numerical columns."
    )

    categorical_columns: list[str] = Field(
        description="List of categorical columns."
    )

    missing_values: int = Field(
        description="Total missing values."
    )

    duplicate_rows: int = Field(
        description="Total duplicate rows."
    )

    summary: str = Field(
        description="Human-readable summary of the dataset."
    )


@tool
def summary_tool(query: str) -> SummaryOutput:
    """
    Generates a concise summary of the dataset.
    """

    df = pd.read_csv(CSV_PATH)

    numerical_cols = df.select_dtypes(include="number").columns.tolist()
    categorical_cols = df.select_dtypes(exclude="number").columns.tolist()

    total_missing = int(df.isnull().sum().sum())
    duplicate_rows = int(df.duplicated().sum())

    summary_text = (
        f"The dataset contains {df.shape[0]} rows and {df.shape[1]} columns. "
        f"It has {len(numerical_cols)} numerical columns and "
        f"{len(categorical_cols)} categorical columns. "
        f"There are {total_missing} missing values and "
        f"{duplicate_rows} duplicate rows."
    )

    return SummaryOutput(
        status="Success",
        dataset_name=CSV_PATH,
        total_rows=df.shape[0],
        total_columns=df.shape[1],
        numerical_columns=numerical_cols,
        categorical_columns=categorical_cols,
        missing_values=total_missing,
        duplicate_rows=duplicate_rows,
        summary=summary_text,
    )