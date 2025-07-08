from django.urls import path
from .views import FAQViewSet, CallToActionAPIView

urlpatterns = [
    path('', FAQViewSet.as_view({'get': 'list', 'post': 'add_question'})),
    path('questions/', CallToActionAPIView.as_view(), name='call-to-action'),
]
