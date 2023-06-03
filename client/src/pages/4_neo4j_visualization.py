import streamlit as st
from streamlit import components
from neo4j import GraphDatabase
from neo4jvis.model.styled_graph import StyledGraph
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Access environment variables
NEO4J_URL = os.getenv('NEO4J_URI')
NEO4J_USER = os.getenv('NEO4J_USER')
NEO4J_PASSWORD = os.getenv('NEO4J_PASSWORD')

st.set_page_config(initial_sidebar_state="collapsed", layout="wide")

driver = GraphDatabase.driver(uri=NEO4J_URL, auth=(NEO4J_USER, NEO4J_PASSWORD))
graph = StyledGraph(driver, directed=True)
graph.generate_whole_graph()
graph.draw("output.html")

st.title("Neo4j Visualization")
st.write("Explore the relationships in your Neo4j graph.")

# Read the HTML file
with open("output.html", "r") as file:
    html_content = file.read()
    modified_html_content = html_content.replace('/*height: 500px;*/', 'height: 600px;')
    modified_html_content = modified_html_content.replace('top: 35;', 'top: 35px;').replace('left: 35;', 'left: 35px;')

components.v1.html(modified_html_content, height=600, scrolling=True)
