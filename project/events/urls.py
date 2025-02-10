from django.urls import path
from .views import EventViewSet


urlpatterns = [
    path('', EventViewSet.as_view({'get': 'list'})),
    path('<int>:pk/', EventViewSet.as_view({'get': 'retrieve'}))
]
