from rest_framework.viewsets import ModelViewSet
from rest_framework.renderers import JSONRenderer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter
from .models import ArtPiece
from .serializers import ArtPieceDetailSerializer, ArtPieceSerializer
from .filters import ArtPieceFilter

class ArtPieceViewSet(ModelViewSet):
    renderer_classes = [JSONRenderer]
    queryset = ArtPiece.objects.all()
    filter_backends = (DjangoFilterBackend, OrderingFilter)  # Додаємо фільтрацію та сортування
    filterset_class = ArtPieceFilter  # Ваш фільтр для ArtPiece
    ordering_fields = ['price', 'creating_date_start', 'title']  # Поля, за якими можна сортувати
    ordering = ['title']  # За замовчуванням сортуємо за title

    def get_serializer_class(self):
        if self.action == 'list':
            return ArtPieceSerializer
        return ArtPieceDetailSerializer
