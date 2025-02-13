from django.contrib import admin
from .models import ArtPiece


@admin.register(ArtPiece)
class ArtPieceAdmin(admin.ModelAdmin):
    list_display = [field.name for field in ArtPiece._meta.get_fields()]
    list_filter = ["title", "price", "type"]
    search_fields = ["title"]

