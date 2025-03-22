from wagtail.snippets.models import register_snippet
from wagtail.snippets.views.snippets import SnippetViewSet, SnippetViewSetGroup

from .models import ArtPiece


class WagtailArtPieceProfileViewSet(SnippetViewSet):
    model = ArtPiece
    icon = "art_piece"
    list_display = [
        "id",
        "title",
        "price",
        "length_cm",
        "width_cm",
        "height_cm",
        "style",
        "author"
    ]
    form_fields = ['__all__']


class ArtPieceViewSetGroup(SnippetViewSetGroup):
    items = [WagtailArtPieceProfileViewSet]
    menu_label = 'Art Piece'
    menu_name = 'art_pieces_folder'


register_snippet(ArtPieceViewSetGroup)
