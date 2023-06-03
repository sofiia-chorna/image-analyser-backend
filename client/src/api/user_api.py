from api import APIClient


class UserAPI:
    def __init__(self, backend_api):
        self.backend_api = backend_api

    def create_user(self, user_data):
        response = self.backend_api.post('/users', json=user_data)
        return response.json()

    def get_user(self, user_id):
        response = self.backend_api.get(f'/users/{user_id}')
        return response.json()

    def update_user(self, user_id, user_data):
        response = self.backend_api.put(f'/users/{user_id}', json=user_data)
        return response.json()

    def delete_user(self, user_id):
        response = self.backend_api.delete(f'/users/{user_id}')
        return response.json()


# Example usage
backend_api = APIClient("http://localhost:8000/api")  # Replace with your backend API base URL
api = UserAPI(backend_api)
