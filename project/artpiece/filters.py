import django_filters
from .models import ArtPiece


class ArtPieceFilter(django_filters.FilterSet):
    title = django_filters.CharFilter(field_name="title", lookup_expr="icontains")   # contain in title
    price_max = django_filters.NumberFilter(field_name="price", lookup_expr="lte")  # less than or equal
    price_min = django_filters.NumberFilter(field_name="price", lookup_expr="gte")  # greater than or equal

