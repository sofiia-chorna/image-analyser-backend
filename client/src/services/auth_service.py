import json
from api.auth_api import authApi
from localStoragePy import localStoragePy


class AuthService:
    def __init__(self):
        self.localStorage = localStoragePy('my-app-app', 'json')

    def github_login(self, code):
        user_data = authApi.github_login(code)
        self.localStorage.setItem('user_data', user_data)
        return user_data

    def get_github_login_url(self):
        return authApi.get_github_login_url()

    def get_user(self):
        user_data = self.localStorage.getItem('user_data')
        return json.loads(user_data.replace("'", "\"").replace('False', '""').replace('True', '""'))


authService = AuthService()
