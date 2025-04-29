import django_filters
from .models import ArtPiece, ArtPieceType
from authors.models import Author


class ArtPieceFilter(django_filters.FilterSet):
    title = django_filters.CharFilter(field_name="title", lookup_expr="icontains")  # Пошук по частині назви
    price_max = django_filters.NumberFilter(field_name="price", lookup_expr="lte")  # Максимальна ціна
    price_min = django_filters.NumberFilter(field_name="price", lookup_expr="gte")  # Мінімальна ціна
    price_range = django_filters.RangeFilter(field_name="price")
    type = django_filters.ChoiceFilter(field_name="type", choices=ArtPieceType.choices)  # Тип твору мистецтва
    material = django_filters.CharFilter(field_name="material", lookup_expr="icontains")  # Пошук по матеріалу
    theme = django_filters.CharFilter(field_name="theme", lookup_expr="icontains")  # Пошук по темі
    style = django_filters.CharFilter(field_name="style", lookup_expr="icontains")  # Пошук по стилю
    author = django_filters.CharFilter(field_name="author__fullname", lookup_expr="icontains")  # Пошук по імені автора

    class Meta:
        model = ArtPiece
        fields = ['title', 'price_min', 'price_max', 'type', 'material', 'theme', 'style', 'author']
