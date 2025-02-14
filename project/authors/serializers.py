from rest_framework import serializers
from .models import Author


class AuthorDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = Author
        fields = '__all__'


class AuthorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Author
        fields = ['id', 'fullname', 'bio_text']
