import streamlit as st
from services.collection_service import collectionService


def create_collection(name, description, tags):
    collectionService.create_collection(name, description, tags)


st.header("Collections")

# Form for collection creation
st.subheader("Create Collection")
name = st.text_input("Name")
description = st.text_area("Description")
tags = st.text_input("Tags (comma-separated)")

if st.button("Create"):
    tags_list = [tag.strip() for tag in tags.split(",")]
    create_collection(name, description, tags_list)
    st.success("Collection created successfully!")

st.divider()

# Form for collection search
st.subheader("Search Collection")

col1, col2, col3, col4 = st.columns(4)
with col1:
    search_name = st.text_input("Collection name", help="Support wildcard")

with col2:
    search_desc = st.text_input("Description", help="Support rexeg")

with col3:
    search_time_from = st.date_input("Created From")

with col4:
    search_time_to = st.date_input("Created To")


# with col21:
search_tags = st.multiselect("Tags", options=["Autumn", "Test Collection", "Trends 2023"])

# with col22:
st.button("Search", type="primary")
