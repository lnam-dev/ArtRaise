from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AuthorViewSet


urlpatterns = [
    path('', AuthorViewSet.as_view({'get': 'list'})),
    path('<int:pk>/', AuthorViewSet.as_view({'get': 'retrieve'})),
]
