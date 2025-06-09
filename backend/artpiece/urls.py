from django.urls import path
from .views import ArtPieceViewSet, ArtPieceStatsView

urlpatterns = [
    path('', ArtPieceViewSet.as_view({'get': 'list'})),
    path('<int:pk>/', ArtPieceViewSet.as_view({'get': 'retrieve'})),
    path('stats/', ArtPieceStatsView.as_view(), name='artpiece-stats'),

]
