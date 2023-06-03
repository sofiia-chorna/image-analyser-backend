import streamlit as st
from services.auth_service import authService
from streamlit_elements import elements, mui

def user_profile():
    with elements("background_image"):
        mui.CardMedia(
            component='img',
            src="https://marketplace.canva.com/EAD2962NKnQ/2/0/1600w/canva-rainbow-gradient-pink-and-purple-virtual-background-_Tcjok-d9b4.jpg",
            alt="Rainbow Gradient",
            sx={'height': '60px'}
        )

    user_info = authService.get_user()
    col1, col2 = st.columns([1, 4])
    with col1:
        st.image(user_info['avatar_url'], width=100)
    with col2:
        st.header(user_info['name'])

    st.divider()


    st.subheader(f"Username: {user_info['login']}")
    st.subheader(f"Joined at: {user_info['created_at']}")
    st.subheader(f"Number of collections: {5}")
    st.subheader(f"Number of analyses: {50}")
    st.button('Edit Profile')

user_profile()
