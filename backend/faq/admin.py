from django.contrib import admin
from django.contrib.admin import ModelAdmin

from .models import FAQ


@admin.register(FAQ)
class FAQAdmin(ModelAdmin):
    list_display = ("question", "answer")
    list_filter = ("question",)
    search_fields = ("question", "answer")
    fieldsets = (
        (None, {"fields": ("question", "answer") }),
    )

