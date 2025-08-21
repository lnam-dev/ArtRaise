from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import FAQViewSet, CallToActionFormAPIView, HowToBuyAPIView

router = DefaultRouter()
router.register('questions', FAQViewSet, basename='faq')


urlpatterns = [
    path('call-to-action/', CallToActionFormAPIView.as_view(), name='call-to-action'),
]

urlpatterns += router.urls
