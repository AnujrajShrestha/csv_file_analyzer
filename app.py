import streamlit as st
import pandas as pd
from pathlib import Path
import os

from pipeLine import run_pipeline

st.set_page_config(
    page_title="CSV File Analyzer",
    page_icon="📊",
    layout="wide"
)

st.title("📊 Multi-Agent CSV File Analyzer")

uploaded_file = st.file_uploader(
    "Upload CSV File",
    type=["csv"]
)

if uploaded_file:

    os.makedirs("uploads", exist_ok=True)

    csv_path = Path("uploads") / uploaded_file.name

    with open(csv_path, "wb") as f:
        f.write(uploaded_file.getbuffer())

    df = pd.read_csv(csv_path)

    st.success("Dataset Loaded Successfully!")

    st.subheader("Dataset Preview")

    st.dataframe(df.head(10), use_container_width=True)

    c1, c2, c3 = st.columns(3)

    c1.metric("Rows", df.shape[0])
    c2.metric("Columns", df.shape[1])
    c3.metric("Missing Values", int(df.isnull().sum().sum()))

    st.divider()

    if st.button("🚀 Run Analysis", use_container_width=True):

        with st.spinner("Running AI Agents..."):

            import tools
            tools.CSV_PATH = str(csv_path)

            result = run_pipeline("Analyze uploaded CSV")

        st.success("Analysis Completed!")

        st.divider()

        st.header("📋 Dataset Summary")

        st.json(result["summary_result"].model_dump())

        st.header("📊 EDA")

        st.json(result["eda_result"].model_dump())

        st.header("🔥 Correlation")

        st.json(result["corr_result"].model_dump())

        st.header("📈 Visualizations")

        plot_dir = Path("plots")

        images = list(plot_dir.glob("*.png"))

        cols = st.columns(2)

        for i, img in enumerate(images):
            with cols[i % 2]:
                st.image(str(img), caption=img.stem)