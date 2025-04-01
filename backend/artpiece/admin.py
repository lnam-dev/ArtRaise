from django.contrib import admin
from .models import ArtPiece


@admin.register(ArtPiece)
class ArtPieceAdmin(admin.ModelAdmin):
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
    list_filter = ["title", "price", "type"]
    search_fields = ["title"]

