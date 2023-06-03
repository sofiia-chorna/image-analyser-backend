from state.user.index import UserState


class AppState:
    def __init__(self):
        self.user_state = UserState()

    def is_logged_in(self):
        return self.user_state.is_logged_in()

    def login(self):
        self.user_state.login()

    def set_user(self, data):
        self.user_state.set_user(data)

    def get_user(self):
        return self.user_state.get_user()

app_state = AppState()
