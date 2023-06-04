from api.user_api import userApi
from api.analyse_api import analyseApi
from api.collection_api import collectionApi


class UserService:
    def __init__(self, user_api, analyse_api, collection_api):
        self.user_api = user_api
        self.analyse_api = analyse_api
        self.collection_api = collection_api


    def get_user_collections(self, user_id):
        response = self.user_api.get_user_collections(user_id)
        return response.get('data')

    def save_analyses(self, collection, analyses):
        created_analyse = self.analyse_api.create_analyse(analyses)
        self.collection_api.add_analyses(collection['id'], created_analyse['id'])


userService = UserService(user_api=userApi, analyse_api=analyseApi, collection_api=collectionApi)
