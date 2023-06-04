from api.api import backend_api


class AnalyseAPI:
    def __init__(self, backend_api):
        self.backend_api = backend_api

    def create_analyse(self, analyse_data):
        return self.backend_api.post_request('/analyses', data=analyse_data)

analyseApi = AnalyseAPI(backend_api)
