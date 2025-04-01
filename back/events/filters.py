import django_filters
from .models import Event


class EventFilter(django_filters.FilterSet):
    title = django_filters.CharFilter(lookup_expr='icontains')  # Пошук по частині назви
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
            'title',
            'ticket_price',
            'start_date',
            'end_date',
            'ticket_price_min',
            'ticket_price_max'
        ]
