from django.urls import path

from .views import HowToBuyAPIView

urlpatterns = [
    path('how-to-buy/', HowToBuyAPIView.as_view(), name='how-to-buy'),
]