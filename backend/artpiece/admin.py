from django.contrib import admin
from .models import ArtPiece, Tag


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = [
        "name_ua",
        "name",
        "slug", 
        "priority",
        "is_active",
        "color"
    ]
    list_filter = ["is_active"]
    search_fields = ["name", "name_ua"]
    ordering = ["priority", "name"]
    prepopulated_fields = {"slug": ("name",)}


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
    list_filter = ["title", "price", "category"]
    search_fields = ["title"]
    filter_horizontal = ["tags"]

