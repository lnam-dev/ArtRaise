from rest_framework import serializers
from .models import Event


class EventSerializer(serializers.ModelSerializer):

    class Meta:
        model = Event
        fields = [
            'title',
            'place',
            'ticket_price',
            'description',
            'start_date',
            'end_date',
        ]
