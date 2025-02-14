from rest_framework import serializers

from .models import ArtPiece
from authors.serializers import AuthorSerializer


class ArtPieceDetailSerializer(serializers.ModelSerializer):
    creating_date = serializers.SerializerMethodField()
    author = AuthorSerializer()

    class Meta:
        model = ArtPiece
        fields = [
            "title",
            "price",
            "type",
            "material",
            "theme",
            "style",
            "length_cm",
            "width_cm",
            "creating_date",
            "description",
            "author",
        ]

    def get_creating_date(self, obj):
        return obj.get_display_date()


class ArtPieceSerializer(serializers.ModelSerializer):
    author = serializers.CharField(source="author.fullname")

    class Meta:
        model = ArtPiece
        fields = [
            "title",
            "price",
            "length_cm",
            "width_cm",
            "author",
        ]
