import django_filters
from .models import Author


class AuthorFilter(django_filters.FilterSet):
    fullname = django_filters.CharFilter(lookup_expr='icontains')
    style = django_filters.CharFilter(lookup_expr='icontains')

    class Meta:
        model = Author
        fields = ['fullname', 'style']
        