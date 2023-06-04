import numpy as np
import json
import csv
import streamlit as st
from io import BytesIO


def download_dict_as_json(data):
    # Convert the dictionary to JSON string with compatible data types
    json_data = json.dumps(data, indent=4, default=lambda x: np.float64(x) if isinstance(x, np.float32) else x)

    # Create a BytesIO object to hold the file in memory
    buffer = BytesIO()

    # Write the JSON string to the BytesIO buffer
    buffer.write(json_data.encode())

    # Set the file pointer at the beginning of the buffer
    buffer.seek(0)

    # Return the BytesIO buffer
    return buffer


def download_dict_as_csv(data):
    # Create a BytesIO object to hold the file in memory
    buffer = BytesIO()

    # Write the dictionary to a CSV file in the BytesIO buffer
    writer = csv.DictWriter(buffer, fieldnames=data.keys())
    writer.writeheader()
    writer.writerow(list(data.values()))  # Convert values to a list

    # Set the file pointer at the beginning of the buffer
    buffer.seek(0)

    # Return the BytesIO buffer
    return buffer

def export_data_component(json_data):
    # Define the export function
    def handle_download():
        file_format = st.session_state.file_format

        if file_format == 'JSON':
            file_obj = download_dict_as_json(json_data)
            return file_obj, "data.json", "application/json"

        elif file_format == 'CSV':
            file_obj = download_dict_as_csv(json_data)
            return file_obj, "data.csv", "text/csv"


    # Display the file format selection radio buttons
    st.radio("Choose the format of export", ('JSON', 'CSV'), key='file_format')

    file_obj, file_name, mime = handle_download()

    st.download_button(
        label="Download Data",
        data=file_obj,
        file_name=file_name,
        mime=mime
    )
