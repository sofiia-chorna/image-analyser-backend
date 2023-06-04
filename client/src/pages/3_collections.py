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

# Form for collection search
st.subheader("Search Collection")