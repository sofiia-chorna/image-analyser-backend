from st_pages import Page, show_pages, add_page_title


class UI:
    @staticmethod
    def setup_pages():
        # Optional -- adds the title and icon to the current page
        add_page_title()

        # Specify what pages should be shown in the sidebar, and what their titles and icons should be
        show_pages(
            [
                Page("ui/home/1_home.py", "Home", "🏠"),
                Page("ui/profile/2_profile.py", "Profile", "👤"),
                Page("ui/collection/3_collection.py", "Collections", "📚"),
                Page("ui/analyse/analyse.py", "Analyses", "🤖"),
            ]
        )
