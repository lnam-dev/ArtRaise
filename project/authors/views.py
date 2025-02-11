from rest_framework.renderers import JSONRenderer
from rest_framework.viewsets import ModelViewSet
import django_filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter
from .models import Author
from .serializers import AuthorSerializer


class AuthorViewSet(ModelViewSet):
    serializer_class = AuthorSerializer
    renderer_classes = [JSONRenderer]
    filter_backends = (DjangoFilterBackend, OrderingFilter)
    ordering_fields = ['fullname']
    queryset = Author.objects.all()


    def get_queryset(self):
        return self.queryset.order_by('-id')
