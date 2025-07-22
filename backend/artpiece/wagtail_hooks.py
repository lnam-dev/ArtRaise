from wagtail.snippets.models import register_snippet
from wagtail.snippets.views.snippets import SnippetViewSet, SnippetViewSetGroup

from .models import ArtPiece
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


class ArtPieceViewSetGroup(SnippetViewSetGroup):
    items = [WagtailArtPieceProfileViewSet]
    menu_label = 'Art Piece'
    menu_name = 'art_pieces_folder'


register_snippet(ArtPieceViewSetGroup)
