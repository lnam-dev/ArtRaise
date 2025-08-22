from django.db.models import Q, Min, Max
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from rest_framework import status
from rest_framework.pagination import PageNumberPagination
from django.core.paginator import Paginator

from artpiece.filters import ArtPieceFilter
from artpiece.models import ArtPiece
from artpiece.serializers import ArtPieceSerializer
from authors.models import Author


class ArtPiecePagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 100

class SearchView(APIView):
    renderer_classes = [JSONRenderer]

    def get(self, request):
        # Створюємо розширений фільтр для підтримки множинних значень
        queryset = ArtPiece.objects.select_related('author', 'category').all()

        # Текстовий пошук
        query = request.GET.get("q", "").strip()
        if query:
            queryset = queryset.filter(
                Q(title__icontains=query) |
                Q(author__fullname__icontains=query) |
                Q(description__icontains=query)
            )

        # Обробляємо множинні параметри вручну для більшого контролю
        # Отримуємо всі значення для кожного параметра
        categories = request.GET.getlist("category")
        category_ids = request.GET.getlist("category_id")
        types = request.GET.getlist("type")  # зворотна сумісність
        materials = request.GET.getlist("material")
        themes = request.GET.getlist("theme")
        styles = request.GET.getlist("style")
        expression_methods = request.GET.getlist("expression_method")
        sizes = request.GET.getlist("size")
        colors = request.GET.getlist("color")
        orientations = request.GET.getlist("orientation")
        gammas = request.GET.getlist("gamma")

        # Застосовуємо фільтри якщо є значення
        if categories:
            queryset = queryset.filter(category__slug__in=categories)
        
        if category_ids:
            try:
                category_ids_int = [int(id) for id in category_ids]
                queryset = queryset.filter(category__id__in=category_ids_int)
            except ValueError:
                pass
        
        if types:  # зворотна сумісність - працює як category
            queryset = queryset.filter(category__slug__in=types)
            
        if materials:
            queryset = queryset.filter(material__in=materials)
            
        if themes:
            queryset = queryset.filter(theme__in=themes)
            
        if styles:
            queryset = queryset.filter(style__in=styles)
            
        if expression_methods:
            queryset = queryset.filter(category__slug__in=expression_methods)
            
        if sizes:
            queryset = queryset.filter(format__in=sizes)
            
        if colors:
            queryset = queryset.filter(dominant_color__in=colors)
            
        if orientations:
            queryset = queryset.filter(orientation__in=orientations)
            
        if gammas:
            queryset = queryset.filter(gamma__in=gammas)

        # Обробляємо фільтр за автором
        author = request.GET.get("author")
        if author:
            queryset = queryset.filter(author__fullname__icontains=author)

        # Отримуємо ценові фільтри, але поки не застосовуємо
        price_min = request.GET.get("price_min")
        price_max = request.GET.get("price_max")

        # Вычисляем минимальную и максимальную цену ПЕРЕД применением ценовых фильтров
        # Это даст нам доступный диапазон цен для текущих не-ценовых фильтров
        price_stats = queryset.aggregate(
            min_price=Min('price'),
            max_price=Max('price')
        )
        
        # Обробляємо null значення при відсутності результатів
        if price_stats['min_price'] is None:
            price_stats['min_price'] = 0
        if price_stats['max_price'] is None:
            price_stats['max_price'] = 0

        # Тепер застосовуємо ценові фільтри
        if price_min:
            try:
                queryset = queryset.filter(price__gte=float(price_min))
            except ValueError:
                pass
                
        if price_max:
            try:
                queryset = queryset.filter(price__lte=float(price_max))
            except ValueError:
                pass

        # Сортування після всіх фільтрів
        sort_by = request.GET.get("sort_by", "title")
        sort_direction = request.GET.get("sort_direction", "asc")

        sort_fields = {
            'title': 'title',
            'price': 'price',
            'date': 'id',
            'author': 'author__fullname'
        }

        sort_field = sort_fields.get(sort_by, 'title')
        if sort_direction == 'desc':
            sort_field = f'-{sort_field}'

        queryset = queryset.order_by(sort_field)

        # Пагінація
        try:
            page = int(request.GET.get("page", 1))
            page_size = int(request.GET.get("page_size", 20))
            page_size = min(page_size, 100)
        except ValueError:
            page = 1
            page_size = 20

        paginator = Paginator(queryset, page_size)

        try:
            page_obj = paginator.page(page)
        except:
            page_obj = paginator.page(1)

        # Сериализация без передачи request контекста
        serializer = ArtPieceSerializer(page_obj.object_list, many=True)

        return Response({
            "results": serializer.data,
            "pagination": {
                "current_page": page_obj.number,
                "total_pages": paginator.num_pages,
                "total_items": paginator.count,
                "has_next": page_obj.has_next(),
                "has_previous": page_obj.has_previous(),
                "page_size": page_size
            },
            "price_range": {
                "min_price": price_stats['min_price'],
                "max_price": price_stats['max_price']
            },
            "filters_applied": {
                "query": query,
                "categories": categories,
                "category_ids": category_ids,
                "types": types,  # зворотна сумісність
                "materials": materials,
                "themes": themes,
                "styles": styles,
                "expression_methods": expression_methods,
                "sizes": sizes,
                "colors": colors,
                "orientations": orientations,
                "gammas": gammas,
                "price_min": price_min,
                "price_max": price_max,
                "author": author,
                "sort_by": sort_by,
                "sort_direction": sort_direction
            }
        }, status=status.HTTP_200_OK)