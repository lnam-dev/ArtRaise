from wagtail.snippets.models import register_snippet
from wagtail.snippets.views.snippets import SnippetViewSet, SnippetViewSetGroup

from .models import ArtPiece, Category
from .forms import ArtPieceForm


@register_snippet
class WagtailCategoryViewSet(SnippetViewSet):
    """Управління категоріями в CMS"""
    model = Category
    icon = "tag"
    list_display = [
        "name_ua",
        "name_en", 
        "slug",
        "is_active",
        "order"
    ]
    list_filter = ['is_active']
    search_fields = ['name_ua', 'name_en', 'description']
    ordering = ['order', 'name_ua']


@register_snippet  
class WagtailArtPieceProfileViewSet(SnippetViewSet):
    model = ArtPiece
    form_class = ArtPieceForm
    icon = "art_piece"
    list_display = [
        "id",
        "title",
        "price",
        "category",
        "creating_date_start",
        "length_cm",
        "width_cm",
        "height_cm",
        "style",
        "author"
    ]
    # Оновлені фільтри з category замість type
    list_filter = ['category', 'style', 'author', 'creating_date_start']
    search_fields = ['title', 'description']
