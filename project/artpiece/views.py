from rest_framework.viewsets import ModelViewSet
from rest_framework.renderers import JSONRenderer
from .models import ArtPiece
from .serializers import ArtPieceSerializer


class ArtPieceViewSet(ModelViewSet):
    serializer_class = ArtPieceSerializer
    renderer_classes = [JSONRenderer]
    queryset = ArtPiece.objects.all()

    def get_queryset(self):
        queryset = super().get_queryset()
        return queryset
