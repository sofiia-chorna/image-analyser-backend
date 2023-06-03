from ui.ui import UI
from ui.login.index import login
from state.index import app_state
import streamlit as st

st.set_page_config(initial_sidebar_state="collapsed")


# Check if the user is logged in
if app_state.is_logged_in() is False:
    # Show the login page
    login()
else:
    # Create an instance of the UI class
    ui = UI()

    # Call the setup_pages() method
    ui.setup_pages()

