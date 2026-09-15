from dotenv import load_dotenv
from langchain_chroma import Chroma
from langchain_mistralai import MistralAIEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import CSVLoader

load_dotenv()

model_embedding= MistralAIEmbeddings(model='mistral-embed')

def loadCSV(file_path):
    loader= CSVLoader(file_path)
    docs= loader.load()
    return docs

def create_chunks(docs):
    splitter= RecursiveCharacterTextSplitter(
        chunk_size= 800,
        chunk_overlap= 80
    )
    
    chunks= splitter.split_documents(docs)
    return chunks

def create_db(chunks):
    db_path= 'csv_db'
    
    return Chroma.from_documents(
        documents= chunks,
        embedding= model_embedding,
        persist_directory=db_path
    )
    
def run_db(file):
    print("loading file...")
    docs= loadCSV(file)
    print("Creating chunks...")
    chunks= create_chunks(docs)
    print("Storing chunks in database...")
    return create_db(chunks)

def load_context(query):
    vectorStore= Chroma(
        persist_directory='csv_db',
        embedding_function= model_embedding
    )
    
    retriever= vectorStore.as_retriever(
        search_type= 'mmr',
        search_kwargs={
            'k':5,
            'fetch_k': 8,
            'lambda_mult': 0.5
        }
    )
    
    docs= retriever.invoke(query)
    context= "\n\n".join(doc.page_content for doc in docs)
    return context
