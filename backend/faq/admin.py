from django.contrib import admin
from django.contrib.admin import ModelAdmin

from .models import FAQ


@admin.register(FAQ)
class FAQAdmin(ModelAdmin):
    list_display = ("question", "category", "order", "is_active", "show_in_call_to_action")
    list_filter = ("category", "is_active", "show_in_call_to_action")
    search_fields = ("question", "answer")
    list_editable = ("order", "is_active", "show_in_call_to_action")
    ordering = ("order",)
    fieldsets = (
        (None, {"fields": ("question", "answer", "category")}),
        ("Налаштування відображення", {"fields": ("order", "is_active", "show_in_call_to_action")}),
    )

