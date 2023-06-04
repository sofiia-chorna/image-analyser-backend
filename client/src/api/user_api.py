from api.api import backend_api


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

    def get_user_collections(self, user_id):
        return self.backend_api.get_request(f'/users/{user_id}/collections')

    def add_collection(self, user_id, collection_id):
        return self.backend_api.post_request(f'/users/{user_id}/collections', data={'destination': collection_id})

    def add_analyses(self, user_id, analyse_id):
        return self.backend_api.post_request(f'/users/{user_id}/analyses', data={'destination': analyse_id})


userApi = UserAPI(backend_api)
