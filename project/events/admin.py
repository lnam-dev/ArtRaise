from django.contrib import admin
from django.contrib.admin import ModelAdmin

from .models import Event


@admin.register(Event)
class EventAdmin(ModelAdmin):
    list_display = (
        "title",
        "place",
        "ticket_price",
        "description",
        "start_date",
        "end_date",
    )
    list_filter = ("ticket_price", "place", "start_date")
    search_fields = ("title", "place")
    fieldsets = (
        (None, {"fields": ("title", "place")}),
        ("Details", {"fields": (
            "ticket_price",
            "description",
            "start_date",
            "end_date",
        )}
        )
    )

