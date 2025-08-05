from wagtail.snippets.models import register_snippet
from wagtail.snippets.views.snippets import SnippetViewSet, SnippetViewSetGroup

from .models import ArtPiece, ArtPieceBuyForm
from .forms import ArtPieceForm


class WagtailArtPieceProfileViewSet(SnippetViewSet):
    model = ArtPiece
    form_class = ArtPieceForm
    icon = "art_piece"
    list_display = [
        "id",
        "title",
        "price",
        "creating_date_start",
        "length_cm",
        "width_cm",
        "height_cm",
        "style",
        "author"
    ]
    # Добавляем фильтры для удобства
    list_filter = ['type', 'style', 'author', 'creating_date_start']
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
