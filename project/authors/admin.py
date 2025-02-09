from django.contrib import admin
from django.contrib.admin import ModelAdmin
from .models import Author


@admin.register(Author)
class AuthorAdmin(ModelAdmin):
    list_display = ("fullname", "style", "category")  # Поля, що відображаються в списку
    list_filter = ("style", "category")  # Фільтри для бокової панелі
    search_fields = ("fullname", "style", "theme")  # Поля для пошуку
    ordering = ("fullname",)  # Сортування за замовчуванням

    fieldsets = (
        (None, {"fields": ("fullname", "bio_text")}),  # Група полів для загальної інформації
        ("Details", {"fields": ("style", "theme", "expression_type", "category")}),  # Додаткові поля
    )
