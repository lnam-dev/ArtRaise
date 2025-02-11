from rest_framework import serializers
from .models import Event


class EventSerializer(serializers.ModelSerializer):

    class Meta:
        model = Event
        fields = [
            'title',
            'location_name',
            'location_details',
            'ticket_price',
            'description',
            'start_date',
            'end_date',
        ]
