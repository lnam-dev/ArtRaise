from rest_framework.renderers import JSONRenderer
from rest_framework.viewsets import ModelViewSet
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Author
from .serializers import AuthorDetailSerializer, AuthorSerializer
from artpiece.serializers import ArtPieceDetailSerializer
from .filters import AuthorFilter


class AuthorViewSet(ModelViewSet):
    renderer_classes = [JSONRenderer]
    filter_backends = (DjangoFilterBackend, OrderingFilter)
    filterset_class = AuthorFilter
    ordering_fields = ['fullname']
    queryset = Author.objects.all()

    @action(detail=True, methods=['get'])
    def artpieces(self, request, pk=None):
        author = self.get_object()
        artpieces = author.artpieces.select_related('category').all()
        serializer = ArtPieceDetailSerializer(artpieces, many=True)
        return Response(serializer.data)

    def get_serializer_class(self):
        if self.action == 'list':
            return AuthorSerializer
        return AuthorDetailSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        return queryset
