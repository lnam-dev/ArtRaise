from rest_framework.renderers import JSONRenderer
from rest_framework.viewsets import ModelViewSet
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter

from .models import Author
from .serializers import AuthorDetailSerializer
from .filters import AuthorFilter


class AuthorViewSet(ModelViewSet):
    serializer_class = AuthorDetailSerializer
    renderer_classes = [JSONRenderer]
    filter_backends = (DjangoFilterBackend, OrderingFilter)
    filterset_class = AuthorFilter
    ordering_fields = ['fullname']
    queryset = Author.objects.all()

    def get_queryset(self):
        queryset = super().get_queryset()
        return queryset
