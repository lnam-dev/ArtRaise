from rest_framework.renderers import JSONRenderer
from rest_framework.viewsets import ModelViewSet
import django_filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter
from .models import Event
from .serializers import EventSerializer


class EventFilter(django_filters.FilterSet):
    name = django_filters.CharFilter(lookup_expr='icontains')  # Пошук по частині назви
    start_date = django_filters.DateFilter(lookup_expr='gte')  # (>=)
    end_date = django_filters.DateFilter(lookup_expr='lte')  # (<=)
    ticket_price_min = django_filters.NumberFilter(
        field_name='ticket_price',
        lookup_expr='gte',
        label='Min Ticket Price')
    ticket_price_max = django_filters.NumberFilter(
        field_name='ticket_price',
        lookup_expr='lte',
        label='Max Ticket Price')

    class Meta:
        model = Event
        fields = [
            'name',
            'ticket_price',
            'start_date',
            'end_date',
            'ticket_price_min',
            'ticket_price_max'
        ]


class EventViewSet(ModelViewSet):
    serializer_class = EventSerializer
    renderer_classes = [JSONRenderer]
    filter_backends = (DjangoFilterBackend, OrderingFilter)
    filterset_class = EventFilter
    ordering_fields = ['start_date', 'end_date', 'ticket_price']
    queryset = Event.objects.all()

    def get_queryset(self):
        queryset = super().get_queryset()
        return queryset
    