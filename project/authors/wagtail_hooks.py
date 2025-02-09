from wagtail.snippets.models import register_snippet
from wagtail.snippets.views.snippets import SnippetViewSet, SnippetViewSetGroup

from .models import Author


class WagtailAuthorProfileViewSet(SnippetViewSet):
    model = Author
    icon = "author"
    list_display = [
        "fullname",
        "bio_text",
        "style",
        "theme",
        "expression_type",
        "category",
    ]
    search_filters = ["fullname", "style"]
    ordering = ["fullname"]
    form_fields = [
        "fullname",
        "bio_text",
        "style",
        "theme",
        "expression_type",
        "category",
    ]


class AuthorsViewSetGroup(SnippetViewSetGroup):
    items = [WagtailAuthorProfileViewSet]
    menu_label = 'Authors'
    menu_name = 'authors_folder'


register_snippet(AuthorsViewSetGroup)
