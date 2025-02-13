from rest_framework.renderers import JSONRenderer
from rest_framework.viewsets import ModelViewSet
import django_filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter
from .models import Author
from .serializers import AuthorSerializer


class AuthorFilter(django_filters.FilterSet):
    fullname = django_filters.CharFilter(lookup_expr='icontains')
    style = django_filters.CharFilter(lookup_expr='icontains')

    class Meta:
        model = Author
        fields = ['fullname', 'style']


class AuthorViewSet(ModelViewSet):
    serializer_class = AuthorSerializer
    renderer_classes = [JSONRenderer]
    filter_backends = (DjangoFilterBackend, OrderingFilter)
    filterset_class = AuthorFilter
    ordering_fields = ['fullname']
    queryset = Author.objects.all()

    def get_queryset(self):
        queryset = super().get_queryset()
        return queryset
