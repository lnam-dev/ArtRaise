from rest_framework import serializers
from .models import Author


class AuthorDetailSerializer(serializers.ModelSerializer):
    artpieces = serializers.SerializerMethodField()
    events = serializers.SerializerMethodField()
    image_author = serializers.SerializerMethodField()

    class Meta:
        model = Author
        fields = '__all__'

    def get_artpieces(self, obj):
        return [
            {'id': artpiece.id,
             'title': artpiece.title,
             'price': artpiece.price,
             'length_cm': artpiece.length_cm,
             'width_cm': artpiece.width_cm,
             'image_artpiece': artpiece.image_artpiece.url,
             }
            for artpiece in obj.artpieces.all()
        ]

    def get_events(self, obj):
        return [
            {
                'id': event.id,
                'title': event.title,
                'ticket_price': event.ticket_price,
                'location_name': event.location_name,
                'start_date': event.start_date,
                'end_date': event.end_date
            }
            for event in obj.events.all()
        ]

    def get_image_author(self, obj):
        if obj.image_author:
            return obj.image_author.url
        return None


class AuthorSerializer(serializers.ModelSerializer):
    artpieces_count = serializers.SerializerMethodField()
    image_author = serializers.SerializerMethodField()


    class Meta:
        model = Author
        fields = ['id', 'fullname', 'artpieces_count', 'image_author']

    def get_artpieces_count(self, obj):
        return len(obj.artpieces.all())

    def get_image_author(self, obj):
        if obj.image_author:
            return obj.image_author.url
        return None
