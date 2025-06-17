from rest_framework import serializers

from .models import FAQ


class FAQSerializer(serializers.ModelSerializer):
    question = serializers.CharField(
        required=True,
        min_length=5,
        max_length=255
    )

    class Meta:
        model = FAQ
        fields = [
            "id",
            "question",
            "answer",
            "created_at"
        ]
        read_only_fields = ['id', 'created_at']
        