from wagtail.snippets.models import register_snippet
from wagtail.snippets.views.snippets import SnippetViewSet
from wagtail.admin.panels import FieldPanel, MultiFieldPanel

from .models import Slide


class WagtailSlideViewSet(SnippetViewSet):
    model = Slide
    icon = "image"
    menu_label = "Slider"
    menu_name = "slider"
    
    list_display = [
        "title",
        "subtitle",
        "is_active",
        "order",
        "get_link_type",
        "created_at",
    ]
    
    list_filter = ['is_active', 'created_at', 'updated_at']
    search_fields = ['title', 'subtitle', 'description']
    ordering = ['order', '-created_at']

    # Group fields for convenient editing
    panels = [
        MultiFieldPanel([
            FieldPanel('title'),
            FieldPanel('subtitle'),
            FieldPanel('image'),
            FieldPanel('description'),
        ], heading="Main Information"),
        
        MultiFieldPanel([
            FieldPanel('order'),
            FieldPanel('is_active'),
        ], heading="Display Settings"),
        
        MultiFieldPanel([
            FieldPanel('linked_artpiece'),
            FieldPanel('linked_author'),
            FieldPanel('linked_event'),
            FieldPanel('custom_link'),
        ], heading="Links"),
    ]


# Register the viewset directly instead of using ViewSetGroup
register_snippet(WagtailSlideViewSet)
