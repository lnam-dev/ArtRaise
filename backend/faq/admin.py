from django.contrib import admin
from django.contrib.admin import ModelAdmin

from .models import FAQ, HowToBuyBlock


@admin.register(HowToBuyBlock)
class HowToBuyBlockAdmin(ModelAdmin):
    """
    Адмінка для управління блоками розділу "Як купити".
    """
    list_display = (
        "id",
        "title_ua", 
        "title_en",
        "order",
        "is_active",
        "created_at"
    )
    list_display_links = ("id", "title_ua")
    list_filter = (
        "is_active",
        "created_at"
    )
    search_fields = ("title_ua", "title_en", "description_ua", "description_en")
    list_editable = ("order", "is_active")
    ordering = ("order",)
    
    fieldsets = (
        ("Українська локалізація", {
            "fields": ("title_ua", "description_ua")
        }),
        ("Англійська локалізація", {
            "fields": ("title_en", "description_en")
        }),
        ("Налаштування", {
            "fields": ("order", "is_active"),
            "description": "Порядок відображення та активність блоку"
        }),
    )
    
    # Кількість об'єктів на сторінці
    list_per_page = 20


@admin.register(FAQ)
class FAQAdmin(ModelAdmin):
    list_display = (
        "question",
        "category",
        "order",
        "is_active",
        "show_in_call_to_action",
        "show_in_question_answer",
        "show_in_how_to_buy"
    )
    list_filter = (
        "category",
        "is_active",
        "show_in_call_to_action",
        "show_in_question_answer",
        "show_in_how_to_buy"
    )
    search_fields = ("question", "answer")
    list_editable = (
        "order",
        "is_active",
        "show_in_call_to_action",
        "show_in_question_answer",
        "show_in_how_to_buy"
    )
    ordering = ("order",)
    fieldsets = (
        (None, {
            "fields": ("question", "answer", "category")
        }),
        ("Налаштування відображення", {
            "fields": (
                "order",
                "is_active",
                ("show_in_call_to_action", "show_in_question_answer", "show_in_how_to_buy")
            ),
            "description": "Виберіть де показувати це питання"
        }),
    )

