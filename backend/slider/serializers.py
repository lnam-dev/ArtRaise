from rest_framework import serializers
from django.conf import settings
from .models import Slide


class SlideSerializer(serializers.ModelSerializer):
    """
    Серіалізатор для моделі Slide.
    Повертає всі необхідні дані для відображення слайдера.
    """
    link_url = serializers.SerializerMethodField()
    link_type = serializers.SerializerMethodField()
    linked_object_id = serializers.SerializerMethodField()
    linked_object_info = serializers.SerializerMethodField()
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Slide
        fields = [
            'id',
            'title',
            'subtitle',
            'description',
            'image_url',
            'order',
            'is_active',
            'link_url',
            'link_type',
            'linked_object_id',
            'linked_object_info',
            'created_at',
            'updated_at'
        ]
    
    def get_link_url(self, obj):
        """Отримати URL для переходу"""
        return obj.get_link_url()
    
    def get_link_type(self, obj):
        """Отримати тип посилання"""
        return obj.get_link_type()
    
    def get_linked_object_id(self, obj):
        """Отримати ID пов'язаного об'єкта"""
        return obj.get_linked_object_id()
    
    def get_linked_object_info(self, obj):
        """
        Отримати додаткову інформацію про пов'язаний об'єкт
        для удобства фронтенда
        """
        if obj.linked_artpiece:
            return {
                'type': 'artpiece',
                'id': obj.linked_artpiece.id,
                'title': obj.linked_artpiece.title,
                'price': obj.linked_artpiece.price,
                'author_name': obj.linked_artpiece.author.fullname if obj.linked_artpiece.author else None
            }
        elif obj.linked_author:
            return {
                'type': 'author',
                'id': obj.linked_author.id,
                'name': obj.linked_author.fullname,
                'bio': obj.linked_author.bio_text[:100] + '...' if len(obj.linked_author.bio_text) > 100 else obj.linked_author.bio_text
            }
        elif obj.linked_event:
            return {
                'type': 'event',
                'id': obj.linked_event.id,
                'title': obj.linked_event.title,
                'start_date': obj.linked_event.start_date,
                'end_date': obj.linked_event.end_date
            }
        elif obj.custom_link:
            return {
                'type': 'custom',
                'url': obj.custom_link
            }
        return None
    
    def get_image_url(self, obj):
        """Повертає повний URL зображення слайда"""
        if obj.image and obj.image.name:
            return f"{settings.MEDIA_URL}{obj.image.name}"
        return None


class SlideListSerializer(serializers.ModelSerializer):
    """
    Спрощений серіалізатор для списку слайдів (для адмінки)
    """
    link_info = serializers.SerializerMethodField()
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Slide
        fields = [
            'id',
            'title',
            'subtitle',
            'image_url',
            'order',
            'is_active',
            'link_info',
            'created_at',
            'updated_at'
        ]
    
    def get_link_info(self, obj):
        """Коротка інформація про посилання"""
        if obj.linked_artpiece:
            return f"Твір: {obj.linked_artpiece.title}"
        elif obj.linked_author:
            return f"Автор: {obj.linked_author.fullname}"
        elif obj.linked_event:
            return f"Подія: {obj.linked_event.title}"
        elif obj.custom_link:
            return f"Посилання: {obj.custom_link}"
        return "Немає посилання"

    def get_image_url(self, obj):
        """Повертає повний URL зображення слайда"""
        if obj.image and obj.image.name:
            return f"{settings.MEDIA_URL}{obj.image.name}"
        return None
