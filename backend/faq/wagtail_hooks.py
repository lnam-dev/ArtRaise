from wagtail.snippets.models import register_snippet
from wagtail.snippets.views.snippets import SnippetViewSet, SnippetViewSetGroup

from .models import FAQ


class WagtailFAQProfileViewSet(SnippetViewSet):
    model = FAQ
    icon = "FAQ"
    list_display = ["question", "answer"]
    search_filters = ["question"]
    ordering = ["-id"]
    form_fields = ["question", "answer"]


class FAQViewSetGroup(SnippetViewSetGroup):
    items = [WagtailFAQProfileViewSet]
    menu_label = "FAQ"
    menu_name = "FAQ_folder"


register_snippet(FAQViewSetGroup)
