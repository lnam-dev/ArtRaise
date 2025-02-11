from django.contrib import admin
from django.contrib.admin import ModelAdmin
from .models import Author


@admin.register(Author)
class AuthorAdmin(ModelAdmin):
    list_display = ("fullname", "style",  "theme", "expression_type", "event")
    list_filter = ("style",)
    search_fields = ("fullname", "style", "theme")
    ordering = ("fullname",)

    fieldsets = (
        (None, {"fields": ("fullname", "bio_text")}),
        ("Details", {"fields": ("style", "theme", "expression_type", "event")}),
    )
