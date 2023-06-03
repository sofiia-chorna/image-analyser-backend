import streamlit as st


# Define a class to manage user state
class UserState:
    def __init__(self):
        self.logged_in = False
        self.user = None

    def login(self):
        self.logged_in = True

    def is_logged_in(self):
        return self.logged_in

    def set_user(self, data):
        self.user = data
        if 'user' not in st.session_state:
            st.session_state.user = data

    def get_user(self):
        return st.session_state.user

# Create an instance of the UserState class
user_state = UserState()
