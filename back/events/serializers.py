from rest_framework import serializers
from .models import Event


class EventDetailSerializer(serializers.ModelSerializer):
    authors = serializers.SerializerMethodField()

    class Meta:
        model = Event
        fields = '__all__'

    def get_authors(self, obj):
        return [
            {
                'id': author.id,
                'fullname': author.fullname,
                'artpieces_count': len(author.artpieces.all())
            }
            for author in obj.authors.all()
        ]


class EventSerializer(serializers.ModelSerializer):

    class Meta:
        model = Event
        fields = [
            'id',
            'title',
            'ticket_price',
            'location_name',
            'start_date',
            'end_date'
        ]
