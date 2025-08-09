from wagtail.snippets.models import register_snippet
from wagtail.snippets.views.snippets import SnippetViewSet, SnippetViewSetGroup

from .models import FAQ, CallToAction


class WagtailFAQProfileViewSet(SnippetViewSet):
    model = FAQ
    icon = "FAQ"
    list_display = ["question", "answer", "created_at"]
    search_filters = ["question"]
    ordering = ["-id"]
    form_fields = ["question", "answer"]


class WagtailCallToActionViewSet(SnippetViewSet):
    model = CallToAction
    icon = "mail"
    list_display = ["name", "email", "question", "created_at"]
    search_filters = ["name", "email", "question"]
    ordering = ["-created_at"]
    form_fields = ["name", "email", "question", "show_in_call_to_action"]


class FAQViewSetGroup(SnippetViewSetGroup):
    items = [WagtailFAQProfileViewSet, WagtailCallToActionViewSet]
    menu_label = "FAQ"
    menu_name = "FAQ_folder"


register_snippet(FAQViewSetGroup)
