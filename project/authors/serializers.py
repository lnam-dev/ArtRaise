from rest_framework import serializers
from .models import Author


class AuthorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Author
        fields = [
            'fullname',
            'bio_text',
            'style',
            'theme',
            'expression_type',
            'event',
        ]
