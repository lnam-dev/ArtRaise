from rest_framework import serializers

from .models import FAQ, CallToAction, HowToBuyBlock


class HowToBuyBlockSerializer(serializers.ModelSerializer):
    """
    Серіалізатор для блоків розділу "Як купити".
    Підтримує локалізацію через параметр ?lang=en або заголовки запиту.
    
    Приклади використання:
    - /api/faq/how-to-buy/ - українська (за замовчуванням)
    - /api/faq/how-to-buy/?lang=en - англійська
    - Headers: Accept-Language: en - англійська
    """
    title = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()

    class Meta:
        model = HowToBuyBlock
        fields = [
            "id",
            "title",
            "description", 
            "order",
            "created_at",
            "updated_at"
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

    def get_title(self, obj):
        """Повертає заголовок відповідно до мови запиту"""
        language = self._get_language_from_request()
        
        if language == 'en':
            return obj.title_en
        return obj.title_ua

    def get_description(self, obj):
        """Повертає опис відповідно до мови запиту"""
        language = self._get_language_from_request()
        
        if language == 'en':
            return obj.description_en
        return obj.description_ua

    def _get_language_from_request(self):
        """Визначає мову з запиту користувача"""
        from django.utils import translation
        
        request = self.context.get('request')
        if not request:
            return 'uk'
        
        # Пріоритет 1: Параметр query ?lang=en
        query_lang = request.GET.get('lang')
        if query_lang:
            return query_lang.lower()[:2]
        
        # Пріоритет 2: Заголовок Accept-Language
        accept_lang = request.META.get('HTTP_ACCEPT_LANGUAGE', '')
        if accept_lang:
            language = accept_lang.split(',')[0].split('-')[0].lower()
            return language[:2]
        
        # Пріоритет 3: Заголовок Content-Language  
        content_lang = request.META.get('HTTP_CONTENT_LANGUAGE', '')
        if content_lang:
            return content_lang.lower()[:2]
        
        # Пріоритет 4: Поточна активна мова Django
        django_lang = translation.get_language()
        if django_lang:
            return django_lang.lower()[:2]
        
        # За замовчуванням українська
        return 'uk'


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
        