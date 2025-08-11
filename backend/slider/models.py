from django.db import models
from django.core.validators import URLValidator
from wagtail.models import Page
from wagtail.fields import RichTextField
from wagtail.admin.panels import FieldPanel, MultiFieldPanel


class Slide(models.Model):
    """
    Модель слайда для головної сторінки.
    Підтримує зв'язки з артикулом, авторами та подіями,
    а також незалежні слайди з довільними посиланнями.
    """

    # Основна інформація
    title = models.CharField(
        max_length=200,
        verbose_name="Заголовок",
        help_text="Заголовок слайда (макс. 200 символів)"
    )
    
    subtitle = models.CharField(
        max_length=300,
        blank=True,
        verbose_name="Підзаголовок",
        help_text="Підзаголовок або опис слайда (макс. 300 символів)"
    )
    
    image = models.ImageField(
        upload_to='slider/',
        verbose_name="Зображення",
        help_text="Зображення для слайда. Рекомендуваний розмір: 1920x1080px"
    )

    # Налаштування відображення та порядку
    order = models.PositiveIntegerField(
        default=0,
        verbose_name="Порядок",
        help_text="Порядок відображення слайда (чим менше число, тим вище в списку)"
    )
    
    is_active = models.BooleanField(
        default=True,
        verbose_name="Активний",
        help_text="Показувати цей слайд на сайті"
    )

    # Зв'язки з іншими об'єктами (опціонально)
    linked_artpiece = models.ForeignKey(
        'artpiece.ArtPiece',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        verbose_name="Пов'язане мистецьке твір",
        help_text="Мистецьке твір, на яке веде слайд"
    )
    
    linked_author = models.ForeignKey(
        'authors.Author',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        verbose_name="Пов'язаний автор",
        help_text="Автор, на сторінку якого веде слайд"
    )
    
    linked_event = models.ForeignKey(
        'events.Event',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        verbose_name="Пов'язане подія",
        help_text="Подія, на сторінку якої веде слайд"
    )
    
    # Зовнішні посилання
    custom_link = models.URLField(
        blank=True,
        verbose_name="Довільне посилання",
        help_text="Довільне посилання для переходу (якщо не вказані пов'язані об'єкти)",
        validators=[URLValidator()]
    )

    # Додаткова інформація
    description = RichTextField(
        blank=True,
        verbose_name="Опис",
        help_text="Докладний опис слайда (відображається за необхідності)"
    )

    # Дати
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Дата створення"
    )
    
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name="Дата оновлення"
    )

    class Meta:
        verbose_name = "Слайд"
        verbose_name_plural = "Слайди"
        ordering = ['order', '-created_at']
        indexes = [
            models.Index(fields=['order']),
            models.Index(fields=['is_active']),
            models.Index(fields=['created_at']),
        ]
    
    panels = [
        MultiFieldPanel([
            FieldPanel('title'),
            FieldPanel('subtitle'),
            FieldPanel('description'),
        ], heading="Основна інформація"),
        
        FieldPanel('image'),
        
        MultiFieldPanel([
            FieldPanel('order'),
            FieldPanel('is_active'),
        ], heading="Налаштування відображення"),
        
        MultiFieldPanel([
            FieldPanel('linked_artpiece'),
            FieldPanel('linked_author'),
            FieldPanel('linked_event'),
            FieldPanel('custom_link'),
        ], heading="Зв'язки та посилання", 
           help_text="Укажіть або пов'язаний об'єкт, або довільну посилання"),
    ]

    def __str__(self):
        return self.title
    
    def get_link_url(self):
        """
        Повертає URL для переходу при кліку на слайд.
        Пріоритет: artpiece > author > event > custom_link
        """
        if self.linked_artpiece:
            return f"/artpiece/{self.linked_artpiece.id}/"
        elif self.linked_author:
            return f"/authors/{self.linked_author.id}/"
        elif self.linked_event:
            return f"/events/{self.linked_event.id}/"
        elif self.custom_link:
            return self.custom_link
        return None
    
    def get_link_type(self):
        """
        Повертає тип посилання для API.
        """
        if self.linked_artpiece:
            return 'artpiece'
        elif self.linked_author:
            return 'author'
        elif self.linked_event:
            return 'event'
        elif self.custom_link:
            return 'custom'
        return None
    
    def get_linked_object_id(self):
        """
        Повертає ID пов'язаного об'єкта для API.
        """
        if self.linked_artpiece:
            return self.linked_artpiece.id
        elif self.linked_author:
            return self.linked_author.id
        elif self.linked_event:
            return self.linked_event.id
        return None
    
    def clean(self):
        """
        Валідація моделі: повинна бути вказана хоча б одна посилання.
        """
        from django.core.exceptions import ValidationError
        
        links_count = sum([
            bool(self.linked_artpiece),
            bool(self.linked_author), 
            bool(self.linked_event),
            bool(self.custom_link)
        ])
        
        if links_count == 0:
            raise ValidationError(
                "Необхідно вказати хоча б одну посилання: "
                "пов'язаний об'єкт або довільну посилання"
            )
        
        if links_count > 1:
            raise ValidationError(
                "Можна вказати тільки одну посилання на слайд"
            )
