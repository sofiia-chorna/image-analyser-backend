from api.collection_api import collectionApi
from api.user_api import userApi
from services.auth_service import authService


class CollectionService:
    def __init__(self, collection_api, user_api):
        self.collection_api = collection_api
        self.user_api = user_api

    def create_collection(self, name, description, tags):
        user_data = authService.get_user()
        collection_id = self.collection_api.create_collection(name, description, tags, user_data['login'])
        self.user_api.add_collection(user_data['id'], collection_id)


collectionService = CollectionService(collection_api=collectionApi, user_api=userApi)
