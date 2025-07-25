from django.urls import path
from .views import ArtPieceViewSet, ArtPieceStatsView, ArtPieceCategoriesView

urlpatterns = [
    path('', ArtPieceViewSet.as_view({'get': 'list'})),
    path('<int:pk>/', ArtPieceViewSet.as_view({'get': 'retrieve'})),
    path('<int:pk>/send-buy-form/', ArtPieceViewSet.as_view({'post': 'send_buy_form'})),
    path('<int:pk>/buy-requests/', ArtPieceViewSet.as_view({'get': 'buy_requests'})),
    path('categories/', ArtPieceCategoriesView.as_view(), name='artpiece-categories'),
    path('stats/', ArtPieceStatsView.as_view(), name='artpiece-stats'),
]
