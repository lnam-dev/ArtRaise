from django.urls import path
from .views import ArtPieceViewSet

urlpatterns = [
    path('', ArtPieceViewSet.as_view({'get': 'list'})),
    path('<int:pk>/', ArtPieceViewSet.as_view({'get': 'retrieve'}))
]
