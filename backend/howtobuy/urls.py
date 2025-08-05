from .views import HowToBuyAPIView
from django.urls import path

urlpatterns = [
    path('', HowToBuyAPIView.as_view(), name='how-to-buy')
]
