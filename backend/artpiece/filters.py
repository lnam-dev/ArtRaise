import django_filters
from .models import ArtPiece, ArtPieceType
from authors.models import Author

# Заготовка під множинне значення через кому
class CharInFilter(django_filters.BaseInFilter, django_filters.CharFilter):
    pass

class ArtPieceFilter(django_filters.FilterSet):
    title = django_filters.CharFilter(field_name="title", lookup_expr="icontains")
    price_max = django_filters.NumberFilter(field_name="price", lookup_expr="lte")
    price_min = django_filters.NumberFilter(field_name="price", lookup_expr="gte")
    price_range = django_filters.RangeFilter(field_name="price")

    # Поля з множинною фільтрацією
    type = CharInFilter(field_name="type", lookup_expr="in")
    material = CharInFilter(field_name="material", lookup_expr="in")
    theme = CharInFilter(field_name="theme", lookup_expr="in")
    style = CharInFilter(field_name="style", lookup_expr="in")
    author = django_filters.CharFilter(field_name="author__fullname", lookup_expr="icontains")  # тут можна залишити як є

    class Meta:
        model = ArtPiece
        fields = ['title', 'price_min', 'price_max', 'type', 'material', 'theme', 'style', 'author']
