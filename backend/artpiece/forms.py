from django import forms
from django.core.exceptions import ValidationError
from wagtail.admin.forms import WagtailAdminModelForm
from .models import ArtPiece, Tag


class ArtPieceForm(WagtailAdminModelForm):
    tags = forms.ModelMultipleChoiceField(
        queryset=Tag.objects.filter(is_active=True),
        widget=forms.CheckboxSelectMultiple,
        required=False,
        help_text="Оберіть теги для твору мистецтва (максимум 5 тегів)"
    )
    
    class Meta:
        model = ArtPiece
        # Включаємо поле tags
        fields = [
            'title', 'price', 'category', 'material', 'theme', 'style',
            'length_cm', 'width_cm', 'height_cm', 'format', 'orientation',
            'gamma', 'dominant_color', 'creating_date_start', 'description',
            'certificate', 'image_artpiece', 'author', 'tags'
        ]

    def clean_creating_date_start(self):
        """
        Валідація для поля creating_date_start
        """
        creating_date_start = self.cleaned_data.get('creating_date_start')
        
        if creating_date_start is not None:
            # Перевіряємо, що це дійсно число
            if not isinstance(creating_date_start, int):
                raise ValidationError('Дата створення має бути цілим числом (роком)')
            
            # Перевіряємо діапазон
            if creating_date_start < 1000:
                raise ValidationError('Рік створення не може бути менше 1000')
            
            if creating_date_start > 2100:
                raise ValidationError('Рік створення не може бути більше 2100')
        
        return creating_date_start

    def clean_tags(self):
        """
        Валідація для тегів - максимум 5 тегів
        """
        tags = self.cleaned_data.get('tags')
        if tags and len(tags) > 5:
            raise ValidationError('Артпіс може мати максимум 5 тегів')
        return tags

    def save(self, commit=True):
        instance = super().save(commit=False)
        
        # Автоматично копіюємо creating_date_start в creating_date_end
        if instance.creating_date_start:
            instance.creating_date_end = instance.creating_date_start
            
        if commit:
            instance.save()
            # Зберігаємо теги після збереження об'єкта
            self.save_m2m()
            
        return instance
