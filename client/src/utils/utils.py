import streamlit as st
import webbrowser
import time
import pyautogui


def redirect(route):
    # Clear existing query parameters
    st.experimental_get_query_params().clear()
    time.sleep(2)
    pyautogui.hotkey('ctrl', 'w')

    # Open route
    url = f"http://localhost:3002/{route}"
    webbrowser.open(url, new=0)
