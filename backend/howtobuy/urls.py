from .views import HowToBuyAPIView
from django.urls import path

urlpatterns = [
    path('how-to-buy/', HowToBuyAPIView.as_view(), name='how-to-buy')
]
