from wagtail.snippets.models import register_snippet
from wagtail.snippets.views.snippets import SnippetViewSet, SnippetViewSetGroup

from .models import ArtPiece, ArtPieceBuyForm, Category
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


class WagtailArtPieceBuyFormViewSet(SnippetViewSet):
    model = ArtPieceBuyForm
    icon = "form"
    list_display = [
        "first_name", "last_name", "email", "phone_number", "artpiece", "created_at", "is_processed"
    ]
    search_filters = ["first_name", "last_name", "email", "artpiece"]
    ordering = ["-created_at"]
    form_fields = [
        "first_name", "last_name", "email", "phone_number", "description", "artpiece", "is_processed"
    ]


class ArtPieceViewSetGroup(SnippetViewSetGroup):
    items = [WagtailArtPieceProfileViewSet, WagtailArtPieceBuyFormViewSet]
    menu_label = 'Art Piece'
    menu_name = 'art_pieces_folder'


register_snippet(ArtPieceViewSetGroup)
