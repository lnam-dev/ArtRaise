from django.urls import path
from .views import AuthorViewSet


urlpatterns = [
    path('', AuthorViewSet.as_view({'get': 'list'})),
    path('<int:pk>/', AuthorViewSet.as_view({'get': 'retrieve'})),
    path('<int:pk>/artpieces', AuthorViewSet.as_view({'get': 'artpieces'}))
]
