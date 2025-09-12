from wagtail.snippets.models import register_snippet
from wagtail.snippets.views.snippets import SnippetViewSet, SnippetViewSetGroup
from .models import FAQ, FAQCategory, CallToAction, HowToBuyBlock


class WagtailHowToBuyBlockViewSet(SnippetViewSet):
    """
    Wagtail snippet для управління блоками "Як купити"
    """
    model = HowToBuyBlock
    icon = "list-ol"
    menu_label = "Як купити"
    list_display = ["order", "title_ua", "title_en", "is_active", "created_at"]
    list_filter = ["is_active", "created_at"]
    search_fields = ["title_ua", "title_en", "description_ua", "description_en"]
    ordering = ["order"]
    form_fields = [
        "title_ua", "title_en", 
        "description_ua", "description_en",
        "order", "is_active"
    ]


class WagtailFAQProfileViewSet(SnippetViewSet):
    model = FAQ
    icon = "help"
    list_display = ["question", "category", "show_in_how_to_buy", "show_in_question_answer", "show_in_call_to_action", "created_at"]
    search_filters = ["question"]
    ordering = ["-id"]
    form_fields = ["question", "answer", "category", "show_in_how_to_buy", "show_in_question_answer", "show_in_call_to_action", "order", "is_active"]


class WagtailFAQCategoryViewSet(SnippetViewSet):
    model = FAQCategory
    icon = "folder-open-inverse"
    list_display = ["name"]
    search_filters = ["name"]
    ordering = ["name"]
    form_fields = ["name"]


class WagtailCallToActionViewSet(SnippetViewSet):
    model = CallToAction
    icon = "mail"
    list_display = ["name", "email", "question", "created_at"]
    search_filters = ["name", "email", "question"]
    ordering = ["-created_at"]
    form_fields = ["name", "email", "question", "show_in_call_to_action"]

class FAQViewSetGroup(SnippetViewSetGroup):
    items = [WagtailHowToBuyBlockViewSet, WagtailFAQCategoryViewSet, WagtailFAQProfileViewSet, WagtailCallToActionViewSet]
    menu_label = "FAQ"
    menu_name = "FAQ_folder"

register_snippet(FAQViewSetGroup)


