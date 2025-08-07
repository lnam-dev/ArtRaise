import django_filters
from .models import ArtPiece, Category
from authors.models import Author

# Заготовка під множинне значення через кому
class CharInFilter(django_filters.BaseInFilter, django_filters.CharFilter):
    pass

class ArtPieceFilter(django_filters.FilterSet):
    # Текстовий пошук
    title = django_filters.CharFilter(field_name="title", lookup_expr="icontains")

    # Ціна
    price_max = django_filters.NumberFilter(field_name="price", lookup_expr="lte")
    price_min = django_filters.NumberFilter(field_name="price", lookup_expr="gte")
    price_range = django_filters.RangeFilter(field_name="price")

    # Фільтр по категоріях - підтримуємо і старий формат (type) і новий (category)
    category = CharInFilter(field_name="category__slug", lookup_expr="in")  # по slug категорії
    type = CharInFilter(field_name="category__slug", lookup_expr="in")  # для зворотної сумісності
    category_id = CharInFilter(field_name="category__id", lookup_expr="in")  # по ID категорії
    
    # Множинні фільтри
    material = CharInFilter(field_name="material", lookup_expr="in")
    theme = CharInFilter(field_name="theme", lookup_expr="in")
    style = CharInFilter(field_name="style", lookup_expr="in")
    expression_method = CharInFilter(field_name="category__slug", lookup_expr="in")  # спосіб вираження
    size = CharInFilter(field_name="format", lookup_expr="in")  # розмір
    color = CharInFilter(field_name="dominant_color", lookup_expr="in")  # колір

    # Автор
    author = django_filters.CharFilter(field_name="author__fullname", lookup_expr="icontains")

    # Додаткові фільтри
    orientation = CharInFilter(field_name="orientation", lookup_expr="in")
    gamma = CharInFilter(field_name="gamma", lookup_expr="in")

    # Діапазони розмірів
    length_min = django_filters.NumberFilter(field_name="length_cm", lookup_expr="gte")
    length_max = django_filters.NumberFilter(field_name="length_cm", lookup_expr="lte")
    width_min = django_filters.NumberFilter(field_name="width_cm", lookup_expr="gte")
    width_max = django_filters.NumberFilter(field_name="width_cm", lookup_expr="lte")
    height_min = django_filters.NumberFilter(field_name="height_cm", lookup_expr="gte")
    height_max = django_filters.NumberFilter(field_name="height_cm", lookup_expr="lte")

    # Дата створення
    creating_date_start_min = django_filters.NumberFilter(field_name="creating_date_start", lookup_expr="gte")
    creating_date_start_max = django_filters.NumberFilter(field_name="creating_date_start", lookup_expr="lte")

    class Meta:
        model = ArtPiece
        fields = [
            'title', 'price_min', 'price_max', 'price_range',
            'category', 'type', 'material', 'theme', 'style',
            'expression_method', 'size', 'color', 'author',
            'orientation', 'gamma',
            'length_min', 'length_max', 'width_min', 'width_max', 'height_min', 'height_max',
            'creating_date_start_min', 'creating_date_start_max'
        ]