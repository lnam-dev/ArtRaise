from rest_framework import serializers
from django.conf import settings
from .models import ArtPiece


class ArtPieceSerializer(serializers.ModelSerializer):
    author = serializers.SerializerMethodField()
    image_artpiece = serializers.SerializerMethodField()

    class Meta:
        model = ArtPiece
        fields = [
            "id",
            "title",
            "price",
            "length_cm",
            "width_cm",
            "height_cm",
            "style",
            "author",
            "image_artpiece",
        ]

    def get_author(self, obj):
        return {
            'id': obj.author.id,
            'fullname': obj.author.fullname,
        }

    def get_image_artpiece(self, obj):
        if not obj.image_artpiece and not hasattr(obj.image_artpiece, "url"):
            return None

        request = self.context.get("request")
        if request:
            return request.build_absolute_uri(obj.image_artpiece.url)

        return f"{settings.MEDIA_URL}{obj.image_artpiece.url}"


class ArtPieceDetailSerializer(ArtPieceSerializer):
    creating_date = serializers.SerializerMethodField()
    author = serializers.SerializerMethodField()

    class Meta:
        model = ArtPiece
        fields = ArtPieceSerializer.Meta.fields + [
            "type",
            "material",
            "theme",
            "format",
            "orientation",
            "gamma",
            "dominant_color",
            "creating_date",
            "description",
            "certificate",
            "author",
        ]

    def get_creating_date(self, obj):
        if obj.creating_date_start and obj.creating_date_end:
            return f"{obj.creating_date_start}-{obj.creating_date_end}"
        elif obj.creating_date_start:
            return f"{obj.creating_date_start}"
        else:
            return f"Unknown"

    def get_author(self, obj):
        return {
            'id': obj.author.id,
            'fullname': obj.author.fullname,
            'bio_text': obj.author.bio_text,
            'image_author': obj.author.image_author.url,
        }
