from wagtail.snippets.models import register_snippet
from wagtail.snippets.views.snippets import SnippetViewSet, SnippetViewSetGroup

from .models import ArtPiece


class WagtailArtPieceProfileViewSet(SnippetViewSet):
    model = ArtPiece
    icon = "art_piece"
    list_display = [field.name for field in ArtPiece._meta.get_fields()]
    form_fields = [field.name for field in ArtPiece._meta.get_fields()]


class ArtPieceViewSetGroup(SnippetViewSetGroup):
    items = [WagtailArtPieceProfileViewSet]
    menu_label = 'Art Piece'
    menu_name = 'art_pieces_folder'


register_snippet(ArtPieceViewSetGroup)
