from django.urls import path
from . import views

app_name = 'slider'

urlpatterns = [
    # Основні API endpoints для слайдера
    path('', views.SliderListView.as_view(), name='slider-list'),
    path('<int:pk>/', views.SliderDetailView.as_view(), name='slider-detail'),

    # Додаткові endpoints
    path('management/', views.SliderManagementListView.as_view(), name='slider-management'),
    path('stats/', views.slider_stats, name='slider-stats'),
    path('info/', views.slider_info, name='slider-info'),
]
