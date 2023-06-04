from api.api import backend_api


class CollectionAPI:
    def __init__(self, backend_api):
        self.backend_api = backend_api

    def add_analyses(self, collection_id, analyses_id):
        return self.backend_api.post_request(f'/collections/{collection_id}/analyses', data={'destination': analyses_id})

    def create_collection(self, name, desc, tags, user):
        return self.backend_api.post_request('/collections/', data={'name': name, 'description': desc,
                                                                    'tags': tags, 'author': user})


collectionApi = CollectionAPI(backend_api)
