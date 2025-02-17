from rest_framework import serializers
from .models import Author


class AuthorDetailSerializer(serializers.ModelSerializer):
    artpieces = serializers.SerializerMethodField()

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
             }
            for artpiece in obj.artpieces.all()
        ]


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ['id', 'fullname', 'style']
