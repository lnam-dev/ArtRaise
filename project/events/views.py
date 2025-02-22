from rest_framework.renderers import JSONRenderer
from rest_framework.viewsets import ModelViewSet
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter

from .models import Event
from .serializers import EventSerializer, EventDetailSerializer
from .filters import EventFilter


class EventViewSet(ModelViewSet):
    renderer_classes = [JSONRenderer]
    filter_backends = (DjangoFilterBackend, OrderingFilter)
    filterset_class = EventFilter
    ordering_fields = ['start_date', 'end_date', 'ticket_price']
    queryset = Event.objects.all().prefetch_related('authors')

    def get_serializer_class(self):
        if self.action == 'list':
            return EventSerializer
        return EventDetailSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        return queryset
    