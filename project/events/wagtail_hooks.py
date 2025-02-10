from wagtail.snippets.models import register_snippet
from wagtail.snippets.views.snippets import SnippetViewSet, SnippetViewSetGroup

from .models import Event


class WagtailEventProfileViewSet(SnippetViewSet):
    model = Event
    icon = "event"
    list_display = [
        "title",
        "place",
        "ticket_price",
        "description",
        "start_date",
        "end_date",
    ]
    search_filters = ["title", "start_date", "end_date"]
    ordering = ["start_date"]
    form_fields = [
        "title",
        "place",
        "ticket_price",
        "description",
        "start_date",
        "end_date",
    ]


class EventViewSetGroup(SnippetViewSetGroup):
    items = [WagtailEventProfileViewSet]
    menu_label = "Events"
    menu_name = "events_folder"


register_snippet(EventViewSetGroup)
