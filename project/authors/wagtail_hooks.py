from wagtail.snippets.models import register_snippet
from wagtail.snippets.views.snippets import SnippetViewSet, SnippetViewSetGroup

from .models import Author


class WagtailAuthorProfileViewSet(SnippetViewSet):
    model = Author
    icon = "author"
    list_display = [field.name for field in Author._meta.get_fields()]
    search_filters = ["fullname", "style"]
    ordering = ["fullname"]
    form_fields = [field.name for field in Author._meta.get_fields()]


class AuthorsViewSetGroup(SnippetViewSetGroup):
    items = [WagtailAuthorProfileViewSet]
    menu_label = 'Authors'
    menu_name = 'authors_folder'


register_snippet(AuthorsViewSetGroup)
