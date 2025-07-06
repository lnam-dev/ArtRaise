from django.db.models import Q
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
    pagination_class = ArtPiecePagination

    def get(self, request):
        # Отримуємо параметри запиту
        query = request.GET.get("q", "").strip()

        # Параметри фільтрації (можуть бути множинними)
        categories = request.GET.getlist("category")  # type в моделі
        styles = request.GET.getlist("style")
        prices = request.GET.getlist("price")  # для діапазонів цін
        themes = request.GET.getlist("theme")
        materials = request.GET.getlist("material")
        expression_methods = request.GET.getlist("expression_method")  # type
        sizes = request.GET.getlist("size")  # format
        colors = request.GET.getlist("color")  # dominant_color

        # Параметри сортування
        sort_by = request.GET.get("sort_by", "title")  # title, price, created_date
        sort_direction = request.GET.get("sort_direction", "asc")  # asc, desc

        # Параметри пагінації
        page = request.GET.get("page", 1)
        page_size = request.GET.get("page_size", 20)

        # Починаємо з базового QuerySet
        queryset = ArtPiece.objects.select_related('author').all()

        # Текстовий пошук за назвою картини або ім'ям автора
        if query:
            queryset = queryset.filter(
                Q(title__icontains=query) |
                Q(author__fullname__icontains=query) |
                Q(description__icontains=query)
            )

        # Застосовуємо фільтри
        if categories:
            queryset = queryset.filter(type__in=categories)

        if styles:
            queryset = queryset.filter(style__in=styles)

        if themes:
            queryset = queryset.filter(theme__in=themes)

        if materials:
            queryset = queryset.filter(material__in=materials)

        # Для способу вираження використовуємо type (якщо це не те саме, що category)
        if expression_methods:
            queryset = queryset.filter(type__in=expression_methods)

        if sizes:
            queryset = queryset.filter(format__in=sizes)

        if colors:
            queryset = queryset.filter(dominant_color__in=colors)

        # Обробка ціни (можна передати діапазони)
        if prices:
            price_filters = Q()
            for price_param in prices:
                if '-' in price_param:  # Діапазон: "100-500"
                    try:
                        min_price, max_price = price_param.split('-')
                        price_filters |= Q(
                            price__gte=float(min_price),
                            price__lte=float(max_price)
                        )
                    except ValueError:
                        continue
                else:  # Точна ціна або "від X"
                    try:
                        if price_param.startswith('>'):
                            price_filters |= Q(price__gt=float(price_param[1:]))
                        elif price_param.startswith('<'):
                            price_filters |= Q(price__lt=float(price_param[1:]))
                        else:
                            price_filters |= Q(price=float(price_param))
                    except ValueError:
                        continue

            if price_filters:
                queryset = queryset.filter(price_filters)

        # Сортування
        sort_fields = {
            'title': 'title',
            'price': 'price',
            'date': 'id',  # якщо немає created_at, використовуємо id як наближення
            'author': 'author__fullname'
        }

        sort_field = sort_fields.get(sort_by, 'title')
        if sort_direction == 'desc':
            sort_field = f'-{sort_field}'

        queryset = queryset.order_by(sort_field)

        # Пагінація
        try:
            page = int(page)
            page_size = int(page_size)
            page_size = min(page_size, 100)  # Обмежуємо максимальний розмір сторінки
        except ValueError:
            page = 1
            page_size = 20

        paginator = Paginator(queryset, page_size)

        try:
            page_obj = paginator.page(page)
        except:
            page_obj = paginator.page(1)

        # Сериалізація результатів
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
            "filters_applied": {
                "query": query,
                "categories": categories,
                "styles": styles,
                "themes": themes,
                "materials": materials,
                "expression_methods": expression_methods,
                "sizes": sizes,
                "colors": colors,
                "prices": prices,
                "sort_by": sort_by,
                "sort_direction": sort_direction
            }
        }, status=status.HTTP_200_OK)

"""
# Альтернативна версія з використанням django-filter
class SearchView(APIView):
    renderer_classes = [JSONRenderer]

    def get(self, request):

        # Створюємо розширений фільтр для підтримки множинних значень
        queryset = ArtPiece.objects.select_related('author').all()

        # Текстовий пошук
        query = request.GET.get("q", "").strip()
        if query:
            queryset = queryset.filter(
                Q(title__icontains=query) |
                Q(author__fullname__icontains=query) |
                Q(description__icontains=query)
            )

        # Застосовуємо django-filter
        filter_set = ArtPieceFilter(request.GET, queryset=queryset)
        filtered_queryset = filter_set.qs

        # Сортування
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

        filtered_queryset = filtered_queryset.order_by(sort_field)

        # Пагінація
        page = int(request.GET.get("page", 1))
        page_size = int(request.GET.get("page_size", 20))
        page_size = min(page_size, 100)

        paginator = Paginator(filtered_queryset, page_size)

        try:
            page_obj = paginator.page(page)
        except:
            page_obj = paginator.page(1)

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
            }
        }, status=status.HTTP_200_OK)
"""