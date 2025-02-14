import django_filters
from .models import ArtPiece


class ArtPieceFilter(django_filters.FilterSet):
    fullname = django_filters.CharFilter(field_name="fullname", lookup_expr="icontains")
    price_max = django_filters.NumberFilter(field_name="price", lookup_expr="lte")
    price_min = django_filters.NumberFilter(field_name="price", lookup_expr="gte")

