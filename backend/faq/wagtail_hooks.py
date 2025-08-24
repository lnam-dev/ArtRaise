from wagtail.snippets.models import register_snippet
from wagtail.snippets.views.snippets import SnippetViewSet, SnippetViewSetGroup
from .models import FAQ, FAQCategory, CallToAction

class WagtailFAQCategoryViewSet(SnippetViewSet):
    model = FAQCategory
    icon = "folder-open-inverse"
    list_display = ["name", "code"]
    search_filters = ["name", "code"]
    ordering = ["name"]
    form_fields = ["name", "code"]

class WagtailFAQProfileViewSet(SnippetViewSet):
    model = FAQ
    icon = "help"
    list_display = ["question", "answer", "category", "created_at"]
    search_filters = ["question"]
    ordering = ["-id"]
    form_fields = ["question", "answer", "category"]

class WagtailCallToActionViewSet(SnippetViewSet):
    model = CallToAction
    icon = "mail"
    list_display = ["name", "email", "question", "created_at"]
    search_filters = ["name", "email", "question"]
    ordering = ["-created_at"]
    form_fields = ["name", "email", "question", "show_in_call_to_action"]

class FAQViewSetGroup(SnippetViewSetGroup):
    items = [WagtailFAQCategoryViewSet, WagtailFAQProfileViewSet, WagtailCallToActionViewSet]
    menu_label = "FAQ"
    menu_name = "FAQ_folder"


register_snippet(FAQViewSetGroup)


