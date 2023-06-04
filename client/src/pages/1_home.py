import json
import torch
import cv2
import base64
from io import BytesIO
import streamlit as st
from PIL import Image
import numpy as np
import pandas as pd
import plotly.graph_objects as go
from processor.config import config
from processor.image_processor import process_image
from services.user_service import userService
from services.auth_service import authService


def format_collection(collection):
    return f"{collection['name']}"


def handle_save(option, image_base64, tags_json):
    userService.save_analyses(option, {
        "image": image_base64,
        "result": tags_json
    })


@st.cache_data()
def load_s3_file_structure(path: str = 'all_image_files.json') -> dict:
    """Retrieves JSON document outing the S3 file structure"""
    with open(path, "r") as f:
        return json.load(f)


@st.cache_data()
def get_user_collections():
    user_info = authService.get_user()
    return userService.get_user_collections(8)


if __name__ == '__main__':
    all_image_files = load_s3_file_structure()
    n_classes = len(config['all_classes'])
    model = torch.load(config['model'], map_location=torch.device('cpu'))
    for param in model.parameters():
        param.requires_grad = False
    model.eval()

    if 'threshold' not in st.session_state:
        st.session_state.threshold = 70
    if 'image' not in st.session_state:
        st.session_state.image = None
    if 'result_file' not in st.session_state:
        st.session_state.result_file = None
    if 'result_class_ids' not in st.session_state:
        st.session_state.result_class_ids = None
    if 'result_class_names' not in st.session_state:
        st.session_state.result_class_names = None
    if 'result_scores' not in st.session_state:
        st.session_state.result_scores = None

    types_of_clothes = sorted(list(all_image_files['test'].keys()))
    types_of_clothes = [clothes.title() for clothes in types_of_clothes]

    st.title('Welcome to Clothes Segmentation Project!')
    st.write("""
            Either upload your own image or select from
            the sidebar to get a preconfigured image.
            The image you select or upload will be fed
            through the Deep Neural Network in real-time
            and the output will be displayed on the screen.
            """)

    threshold = st.slider('Threshold value', 0, 100, st.session_state.threshold)
    st.session_state.threshold = threshold

    uploaded_file = st.file_uploader("Choose an image...")
    img = None
    if uploaded_file is not None:  # if user uploaded a file
        st.image(uploaded_file, caption='Input Image', use_column_width=True)
        img = Image.open(uploaded_file)
        m = np.array(img)
        m = cv2.resize(m, (362, 562), interpolation=cv2.INTER_AREA)

        # Update image in session state
        st.session_state.image = img

        # Rerun the processing
        with st.spinner('Processing the image...'):
            result_file, result_class_ids, result_class_names, result_scores = process_image(model, m, threshold)
        # Update the result in session state
        st.session_state.result_file = result_file
        st.session_state.result_class_ids = result_class_ids
        st.session_state.result_class_names = result_class_names
        st.session_state.result_scores = result_scores

    # Display the previous result if available
    if st.session_state.result_file is not None:
        st.header(f"Here is the result of segmentation:")
        img = Image.open(st.session_state.result_file)
        resized_image = img.resize((336, 562))
        st.image(resized_image, caption='Clothes Segmentation')

        # Convert image to RGBA mode
        rgba_image = resized_image.convert("RGBA")

        # Save the image as PNG
        image_buffer = BytesIO()
        rgba_image.save(image_buffer, format="PNG")
        image_buffer.seek(0)

        # Convert the PNG image to base64
        image_base64 = base64.b64encode(image_buffer.getvalue()).decode("utf-8")

        # Compress the image
        with open(result_file, "rb") as file:
            col1, col2 = st.columns(2)
            with col1:
                st.download_button(
                    label="Download result image",
                    data=file,
                    file_name="segmentation_result.png",
                    mime="image/png"
                )
            with col2:
                collections = get_user_collections()
                collection_names = [collection['name'] for collection in collections]
                option = st.selectbox("Choose the collection to save", options=collections,
                                      format_func=format_collection)
                tags = [
                    {
                        "class_name": st.session_state.result_class_names[class_id],
                        "confidence": round(float(score), 3)
                    }
                    for class_id, score in zip(st.session_state.result_class_ids, st.session_state.result_scores)
                ]
                tags_json = json.dumps(tags)
                st.button(label="Save to collection", type="primary", on_click=handle_save, args=(option, image_base64, tags_json))

            st.subheader("Analyses scores")

            # Convert scores to percentages
            result_scores_percent = [f'{score * 100:.2f}%' for score in st.session_state.result_scores]

            # Create a list of tuples combining the data
            data = list(zip(st.session_state.result_class_names.values(), result_scores_percent))

            # Create a DataFrame from the list of tuples
            df = pd.DataFrame(data, columns=['Class Name', 'Score'])
            st.dataframe(df, use_container_width=True)

            # Create a bar chart using Plotly
            st.subheader("Chart view")
            fig = go.Figure(
                data=go.Bar(x=list(st.session_state.result_class_names.values()), y=st.session_state.result_scores))
            fig.update_layout(
                xaxis_title="Class",
                yaxis_title="Score",
            )
            st.plotly_chart(fig)

            # Display the data as JSON using Streamlit
            st.subheader("JSON view")
            data = {
                "tags": [
                    {
                        "class_name": st.session_state.result_class_names[class_id],
                        "confidence": score
                    }
                    for class_id, score in zip(st.session_state.result_class_ids, st.session_state.result_scores)
                ]
            }
            st.json(data)
