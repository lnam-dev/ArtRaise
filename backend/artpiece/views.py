from rest_framework.viewsets import ModelViewSet
from rest_framework.renderers import JSONRenderer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import action
from rest_framework.filters import OrderingFilter
from rest_framework import status
from .serializers import ArtPieceDetailSerializer, ArtPieceSerializer, ArtPieceBuyFormSerializer
from .filters import ArtPieceFilter
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import ArtPiece, Category
from django.db.models import Count
from django.core.cache import cache
from django.utils import timezone
from django.utils import timezone


class ArtPieceViewSet(ModelViewSet):
    renderer_classes = [JSONRenderer]
    queryset = ArtPiece.objects.all().select_related('author', 'category')  # Оптимізація запитів через select_related
    filter_backends = (DjangoFilterBackend, OrderingFilter)
    filterset_class = ArtPieceFilter
    ordering_fields = ['price', 'creating_date_start', 'title']
    ordering = ['title']

    def get_serializer_class(self):
        if self.action == 'list':
            return ArtPieceSerializer
        return ArtPieceDetailSerializer
    

    @action(detail=True, methods=['POST'])
    def send_buy_form(self, request, pk):
        artpiece = self.get_object()  
        data = request.data.copy()
        data['artpiece'] = artpiece.id
        
        serializer = ArtPieceBuyFormSerializer(data=data)
        
        if serializer.is_valid():
            buy_form = serializer.save()
            return Response(
                {
                    "message": "Запит на покупку успішно створено",
                    "buy_form": ArtPieceBuyFormSerializer(buy_form).data
                },
                status=status.HTTP_201_CREATED
            )
        else:
            return Response(
                {
                    "error": "Помилки валідації",
                    "details": serializer.errors
                },
                status=status.HTTP_400_BAD_REQUEST
            )

    @action(detail=True, methods=['GET'])
    def buy_requests(self, request, pk):
        artpiece = self.get_object()
        
        buy_requests = artpiece.buy_requests.all().order_by('-created_at')
        serializer = ArtPieceBuyFormSerializer(buy_requests, many=True)
        
        return Response(
            {
                "artpiece_id": artpiece.id,
                "artpiece_title": artpiece.title,
                "total_requests": buy_requests.count(),
                "buy_requests": serializer.data
            },
            status=status.HTTP_200_OK
        )


class ArtPieceStatsView(APIView):
    def get(self, request):
        def to_array(queryset, field_name):
            return [{"name": item[field_name], "count": item["count"]} for item in queryset]

        # Заміняємо type на category
        category_counts = ArtPiece.objects.values('category__name_ua').annotate(count=Count('id')).order_by()
        style_counts = ArtPiece.objects.values('style').annotate(count=Count('id')).order_by()
        theme_counts = ArtPiece.objects.values('theme').annotate(count=Count('id')).order_by()
        material_counts = ArtPiece.objects.values('material').annotate(count=Count('id')).order_by()
        dominant_color_counts = ArtPiece.objects.values('dominant_color').annotate(count=Count('id')).order_by()

        data = {
            "category": to_array(category_counts, 'category__name_ua'),
            "style": to_array(style_counts, 'style'),
            "theme": to_array(theme_counts, 'theme'),
            "material": to_array(material_counts, 'material'),
            "dominant_color": to_array(dominant_color_counts, 'dominant_color'),
        }
        return Response(data)


class ArtPieceCategoriesView(APIView):
    """
    Endpoint для отримання всіх категорій artpieces
    з українською та англійською локалізацією, включаючи лічильники використання.
    """
    
    def get(self, request):
        # Перевіряємо кэш
        cache_key = 'artpiece_categories'
        cached_data = cache.get(cache_key)
        
        if cached_data:
            return Response(cached_data)

        # Отримуємо активні категорії з лічильниками artpieces
        categories = Category.objects.filter(is_active=True).annotate(
            count=Count('artpieces')
        ).order_by('order')

        # Формуємо відповідь
        categories_data = []
        
        for category in categories:
            category_data = {
                'id': category.id,
                'slug': category.slug,
                'name_en': category.name_en,        # Англійська назва
                'name_ua': category.name_ua,        # Українська назва
                'description': category.description,
                'image_url': category.image_url.url if category.image_url else None,
                'count': category.count,            # Кількість artpieces в категорії
                'is_available': category.count > 0  # Є artpieces в категорії
            }
            categories_data.append(category_data)
        
        # Статистика
        total_artpieces = ArtPiece.objects.count()
        available_categories = len([cat for cat in categories_data if cat['is_available']])
        
        response_data = {
            'categories': categories_data,
            'meta': {
                'total_categories': len(categories_data),
                'available_categories': available_categories,
                'total_artpieces': total_artpieces,
                'cache_generated_at': timezone.now().isoformat()
            }
        }

        # Кешуємо на 1 годину (3600 секунд)
        cache.set(cache_key, response_data, 3600)
        
        return Response(response_data)