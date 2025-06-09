from rest_framework.viewsets import ModelViewSet
from rest_framework.renderers import JSONRenderer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter
from .serializers import ArtPieceDetailSerializer, ArtPieceSerializer
from .filters import ArtPieceFilter
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import ArtPiece
from django.db.models import Count


class ArtPieceViewSet(ModelViewSet):
    renderer_classes = [JSONRenderer]
    queryset = ArtPiece.objects.all().select_related('author')  # Оптимізація запитів через select_related
    filter_backends = (DjangoFilterBackend, OrderingFilter)
    filterset_class = ArtPieceFilter
    ordering_fields = ['price', 'creating_date_start', 'title']
    ordering = ['title']

    def get_serializer_class(self):
        if self.action == 'list':
            return ArtPieceSerializer
        return ArtPieceDetailSerializer



class ArtPieceStatsView(APIView):
    def get(self, request):
        def to_array(queryset, field_name):
            return [{"name": item[field_name], "count": item["count"]} for item in queryset]

        type_counts = ArtPiece.objects.values('type').annotate(count=Count('id')).order_by()
        style_counts = ArtPiece.objects.values('style').annotate(count=Count('id')).order_by()
        theme_counts = ArtPiece.objects.values('theme').annotate(count=Count('id')).order_by()
        material_counts = ArtPiece.objects.values('material').annotate(count=Count('id')).order_by()
        dominant_color_counts = ArtPiece.objects.values('dominant_color').annotate(count=Count('id')).order_by()

        data = {
            "type": to_array(type_counts, 'type'),
            "style": to_array(style_counts, 'style'),
            "theme": to_array(theme_counts, 'theme'),
            "material": to_array(material_counts, 'material'),
            "dominant_color": to_array(dominant_color_counts, 'dominant_color'),
        }
        return Response(data)