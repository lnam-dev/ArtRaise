from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import FAQViewSet, CallToActionAPIView, HowToBuyAPIView

router = DefaultRouter()
router.register('', FAQViewSet, basename='faq')

urlpatterns = router.urls + [
    path('questions/', CallToActionAPIView.as_view(), name='call-to-action'),
    path('how-to-buy/', HowToBuyAPIView.as_view(), name='how-to-buy'),
]
