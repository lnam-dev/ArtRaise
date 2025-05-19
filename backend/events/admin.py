from django.contrib import admin
from django.contrib.admin import ModelAdmin
from .models import Event


@admin.register(Event)
class EventAdmin(ModelAdmin):
    list_display = (
        "title",
        "location_name",
        "location_details",
        "ticket_price",
        "description",
        "start_date",
        "end_date",
    )
    list_filter = ("ticket_price", "location_name", "start_date")
    search_fields = ("title", "location_name")
    fieldsets = (
        (None, {"fields": ("title", "location_name")}),
        ("Details", {"fields": (
            "location_details"
            "ticket_price",
            "description",
            "start_date",
            "end_date",
        )}
        )
    )

