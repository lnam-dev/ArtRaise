from rest_framework import serializers
from .models import ArtPiece
from rest_framework import serializers


class ArtPieceSerializer(serializers.ModelSerializer):
    creating_date = serializers.SerializerMethodField()

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
