from rest_framework.renderers import JSONRenderer
from rest_framework.viewsets import ModelViewSet
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter

from .models import Author
from .serializers import AuthorDetailSerializer, AuthorSerializer
from .filters import AuthorFilter


class AuthorViewSet(ModelViewSet):
    renderer_classes = [JSONRenderer]
    filter_backends = (DjangoFilterBackend, OrderingFilter)
    filterset_class = AuthorFilter
    ordering_fields = ['fullname']
    queryset = Author.objects.all()

    def get_serializer_class(self):
        if self.action == 'list':
            return AuthorSerializer
        return AuthorDetailSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        return queryset
