from django.urls import path
from .views import FAQViewSet

urlpatterns = [
    path('', FAQViewSet.as_view({'get': 'list', 'post': 'add_question'})),
]
