from api.api import backend_api


class AuthApi:
    def __init__(self, backend_api):
        self.url = '/auth'
        self.backend_api = backend_api

    def get_github_login_url(self):
        response = self.backend_api.get_request(self.url + '/github')
        return response.get('url')

    def github_login(self, code):
        return self.backend_api.post_request(self.url + '/github', {"code": code})


authApi = AuthApi(backend_api)
