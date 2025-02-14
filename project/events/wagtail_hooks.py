from wagtail.snippets.models import register_snippet
from wagtail.snippets.views.snippets import SnippetViewSet, SnippetViewSetGroup

from .models import Event


class WagtailEventProfileViewSet(SnippetViewSet):
    model = Event
    icon = "event"
    list_display = [field.name for field in Event._meta.get_fields()]
    search_filters = ["title", "start_date", "end_date"]
    ordering = ["start_date"]
    form_fields = [field.name for field in Event._meta.get_fields()]


class EventViewSetGroup(SnippetViewSetGroup):
    items = [WagtailEventProfileViewSet]
    menu_label = "Events"
    menu_name = "events_folder"


register_snippet(EventViewSetGroup)
