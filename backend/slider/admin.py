from django.contrib import admin
from django.utils.html import format_html
from .models import Slide


@admin.register(Slide)
class SlideAdmin(admin.ModelAdmin):
    """
    Адмінка для моделі Slide в Django Admin.
    Доповнює можливості Wagtail CMS для управління слайдами.
    """
    
    list_display = [
        'title',
        'subtitle_short',
        'image_preview',
        'order',
        'is_active',
        'link_info',
        'created_at'
    ]
    
    list_filter = [
        'is_active',
        'created_at',
        'updated_at'
    ]
    
    search_fields = [
        'title',
        'subtitle',
        'description'
    ]
    
    ordering = ['order', '-created_at']
    
    readonly_fields = [
        'created_at',
        'updated_at',
        'link_preview'
    ]
    
    fieldsets = (
        ('Основна інформація', {
            'fields': ('title', 'subtitle', 'description', 'image')
        }),
        ('Налаштування відображення', {
            'fields': ('order', 'is_active')
        }),
        ('Зв\'язки та посилання', {
            'fields': (
                'linked_artpiece',
                'linked_author', 
                'linked_event',
                'custom_link',
                'link_preview'
            ),
            'description': 'Укажіть або пов\'язаний об\'єкт, або довільну посилання'
        }),
        ('Інформація про створення', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    def subtitle_short(self, obj):
        """Короткий подзаголовок для списка"""
        if obj.subtitle:
            return obj.subtitle[:50] + '...' if len(obj.subtitle) > 50 else obj.subtitle
        return '-'
    subtitle_short.short_description = 'Подзаголовок'
    
    def image_preview(self, obj):
        """Превью зображення в списку"""
        if obj.image:
            return format_html(
                '<img src="{}" style="max-width: 100px; max-height: 60px; object-fit: cover;" />',
                obj.image.url
            )
        return '-'
    image_preview.short_description = 'Зображення'

    def link_info(self, obj):
        """Інформація про посилання в списку"""
        if obj.linked_artpiece:
            return format_html(
                '<span style="color: #007cba;">📖 {}</span>',
                obj.linked_artpiece.title
            )
        elif obj.linked_author:
            return format_html(
                '<span style="color: #e6522c;">👤 {}</span>',
                obj.linked_author.name
            )
        elif obj.linked_event:
            return format_html(
                '<span style="color: #417505;">📅 {}</span>',
                obj.linked_event.title
            )
        elif obj.custom_link:
            return format_html(
                '<span style="color: #8f5902;">🔗 {}</span>',
                obj.custom_link[:30] + '...' if len(obj.custom_link) > 30 else obj.custom_link
            )
        return format_html('<span style="color: #a40000;">❌ Немає посилання</span>')
    link_info.short_description = 'Посилання'

    def link_preview(self, obj):
        """Превью посилання в формі редагування"""
        url = obj.get_link_url()
        if url:
            return format_html(
                '<a href="{}" target="_blank" style="color: #007cba;">🔗 {}</a>',
                url, url
            )
        return 'Посилання не задана'
    link_preview.short_description = 'Попередній перегляд посилання'

    actions = ['activate_slides', 'deactivate_slides']
    
    def activate_slides(self, request, queryset):
        """Активувати вибрані слайди"""
        updated = queryset.update(is_active=True)
        self.message_user(
            request,
            f'Активовано {updated} слайдів.'
        )
    activate_slides.short_description = 'Активувати вибрані слайди'

    def deactivate_slides(self, request, queryset):
        """Деактивувати вибрані слайди"""
        updated = queryset.update(is_active=False)
        self.message_user(
            request,
            f'Деактивовано {updated} слайдів.'
        )
    deactivate_slides.short_description = 'Деактивувати вибрані слайди'
