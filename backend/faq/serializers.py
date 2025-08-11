from rest_framework import serializers

from .models import FAQ, CallToAction


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
            "category",
            "order",
            "is_active",
            "show_in_call_to_action",
            "created_at"
        ]
        read_only_fields = ['id', 'created_at']


class CategoryQuestionSerializer(serializers.Serializer):
    category = serializers.CharField()
    questions = FAQSerializer(many=True)


class CallToActionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CallToAction
        fields = [
            "id",
            "name",
            "email",
            "question",
            "created_at"
        ]
        read_only_fields = [
            "id",
            "created_at"
        ]

    def validate_email(self, value):
        if not value:
            raise serializers.ValidationError("Email є обов'язковим полем")
        return value

    def validate(self, data):
        if not data.get('name') or not data.get('question') or not data.get('email'):
            raise serializers.ValidationError("Пропущені обов'язкові поля")
        return data
        