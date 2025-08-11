from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Slide
from .serializers import SlideSerializer, SlideListSerializer


class SliderListView(generics.ListAPIView):
    """
    API endpoint для отримання списку активних слайдів для відображення на сайті.
    Повертає тільки активні слайди, відсортовані за порядком.

    GET /api/slider/
    """
    serializer_class = SlideSerializer
    
    def get_queryset(self):
        return Slide.objects.filter(is_active=True).order_by('order', '-created_at')


class SliderDetailView(generics.RetrieveAPIView):
    """
    API endpoint для отримання детальної інформації про конкретний слайд.

    GET /api/slider/{id}/
    """
    queryset = Slide.objects.all()
    serializer_class = SlideSerializer


class SliderManagementListView(generics.ListAPIView):
    """
    API endpoint для отримання всіх слайдів (включаючи неактивні) для адмінки.

    GET /api/slider/management/
    """
    queryset = Slide.objects.all().order_by('order', '-created_at')
    serializer_class = SlideListSerializer


@api_view(['GET'])
def slider_stats(request):
    """
    API endpoint для отримання статистики слайдера.

    GET /api/slider/stats/
    
    Returns:
        {
            "total_slides": 5,
            "active_slides": 3,
            "inactive_slides": 2,
            "slides_with_artpiece": 2,
            "slides_with_author": 1,
            "slides_with_event": 0,
            "slides_with_custom_link": 0
        }
    """
    total_slides = Slide.objects.count()
    active_slides = Slide.objects.filter(is_active=True).count()
    inactive_slides = total_slides - active_slides
    
    # Статистика за типами посиланнь
    slides_with_artpiece = Slide.objects.filter(linked_artpiece__isnull=False).count()
    slides_with_author = Slide.objects.filter(linked_author__isnull=False).count()
    slides_with_event = Slide.objects.filter(linked_event__isnull=False).count()
    slides_with_custom_link = Slide.objects.exclude(custom_link='').count()
    
    stats = {
        'total_slides': total_slides,
        'active_slides': active_slides,
        'inactive_slides': inactive_slides,
        'slides_with_artpiece': slides_with_artpiece,
        'slides_with_author': slides_with_author,
        'slides_with_event': slides_with_event,
        'slides_with_custom_link': slides_with_custom_link,
    }
    
    return Response(stats, status=status.HTTP_200_OK)


@api_view(['GET'])
def slider_info(request):
    """
    API endpoint для отримання загальної інформації про слайдер.

    GET /api/slider/info/
    
    Returns:
        {
            "description": "API для керування слайдером головної сторінки",
            "version": "1.0",
            "endpoints": [...]
        }
    """
    info = {
        'description': 'API для керування слайдером головної сторінки ArtRaise',
        'version': '1.0',
        'endpoints': [
            {
                'url': '/api/slider/',
                'method': 'GET',
                'description': 'Отримати список активних слайдів для відображення'
            },
            {
                'url': '/api/slider/{id}/',
                'method': 'GET', 
                'description': 'Отримати детальну інформацію про слайд'
            },
            {
                'url': '/api/slider/management/',
                'method': 'GET',
                'description': 'Отримати всі слайди для адмінки'
            },
            {
                'url': '/api/slider/stats/',
                'method': 'GET',
                'description': 'Отримати статистику слайдера'
            },
            {
                'url': '/api/slider/info/',
                'method': 'GET',
                'description': 'Отримати інформацію про API слайдера'
            }
        ],
        'features': [
            'Підтримка зв\'язків з творами, авторами та подіями',
            'Можливість додавання довільних посилань',
            'Управління порядком відображення слайдів',
            'Активація/деактивація слайдів',
            'Завантаження зображень',
            'Wagtail CMS інтеграція для зручного управління'
        ]
    }
    
    return Response(info, status=status.HTTP_200_OK)
