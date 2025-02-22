from rest_framework import serializers
from .models import ArtPiece


class ArtPieceDetailSerializer(serializers.ModelSerializer):
    creating_date = serializers.SerializerMethodField()

    # Використовуємо стандартний PrimaryKeyRelatedField для отримання всіх даних про автора
    author = serializers.SerializerMethodField()

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
            "certificate",
            "author",
        ]

    def get_creating_date(self, obj):
        if obj.creating_date_start and obj.creating_date_end:
            return f"{obj.creating_date_start}-{obj.creating_date_end}"
        elif obj.creating_date_start:
            return f"{obj.creating_date_start}"
        else:
            return "Unknown"

    def get_author(self, obj):
        # Тепер використовуємо об'єкт автора, завантаженого завдяки select_related
        return {
            'id': obj.author.id,
            'fullname': obj.author.fullname,
            'bio_text': obj.author.bio_text,
        }

class ArtPieceSerializer(serializers.ModelSerializer):
    author = serializers.SerializerMethodField()

    class Meta:
        model = ArtPiece
        fields = [
            "id",
            "title",
            "price",
            "length_cm",
            "width_cm",
            "author",
        ]

    def get_author(self, obj):
        return {
            'id': obj.author.id,
            'fullname': obj.author.fullname,
        }
class ArtPieceSerializer(serializers.ModelSerializer):
    author = serializers.PrimaryKeyRelatedField(queryset=Author.objects.all())  # Просто передаємо ID автора

    class Meta:
        model = ArtPiece
        fields = ["id", "title", "price", "length_cm", "width_cm", "author"]
