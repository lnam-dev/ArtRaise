from rest_framework import serializers
from django.conf import settings
from phonenumber_field.serializerfields import PhoneNumberField
from .models import ArtPiece, ArtPieceBuyForm


class ArtPieceSerializer(serializers.ModelSerializer):
    author = serializers.SerializerMethodField()
    image_artpiece = serializers.SerializerMethodField()
    creating_date = serializers.SerializerMethodField()

    class Meta:
        model = ArtPiece
        fields = [
            "id",
            "title",
            "price",
            "length_cm",
            "width_cm",
            "height_cm",
            "creating_date",
            "style",
            "author",
            "image_artpiece",
            "creating_date",
        ]

    def get_author(self, obj):
        return {
            'id': obj.author.id,
            'fullname': obj.author.fullname,
        }

    def get_creating_date(self, obj):
        if obj.creating_date_start and obj.creating_date_end:
            return f"{obj.creating_date_start}-{obj.creating_date_end}"
        elif obj.creating_date_start:
            return f"{obj.creating_date_start}"
        else:
            return f"Unknown"

    def get_image_artpiece(self, obj):
        # Перевіряємо наявність зображення
        if not obj.image_artpiece or not obj.image_artpiece.name:
            return None
        # Повертаємо URL зображення
        return f"{settings.MEDIA_URL}{obj.image_artpiece.name}"

    def get_creating_date(self, obj):
        if obj.creating_date_start and obj.creating_date_end:
            return f"{obj.creating_date_start}-{obj.creating_date_end}"
        elif obj.creating_date_start:
            return f"{obj.creating_date_start}"
        else:
            return f"Unknown"


class ArtPieceDetailSerializer(ArtPieceSerializer):
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

    def get_author(self, obj):
        return {
            'id': obj.author.id,
            'fullname': obj.author.fullname,
            'bio_text': obj.author.bio_text,
            'image_author': obj.author.image_author.url,
        }


class ArtPieceBuyFormSerializer(serializers.ModelSerializer):
    artpiece_title = serializers.CharField(source='artpiece.title', read_only=True)
    artpiece_author = serializers.CharField(source='artpiece.author.fullname', read_only=True)
    phone_number = PhoneNumberField()

    class Meta:
        model = ArtPieceBuyForm
        fields = [
            "id",
            "first_name",
            "last_name",
            "email",
            "phone_number",
            "description",
            "artpiece",
            "artpiece_title",
            "artpiece_author",
            "created_at",
            "is_processed"
        ]
        read_only_fields = ['id', 'created_at', 'is_processed', 'artpiece_title', 'artpiece_author']

    def validate_email(self, value):
        if not value:
            raise serializers.ValidationError("Email є обов'язковим полем")
        return value

    def validate(self, data):
        if not data.get('first_name') or not data.get('last_name') or not data.get('email') or not data.get('phone_number'):
            raise serializers.ValidationError("Пропущені обов'язкові поля")
        return data
