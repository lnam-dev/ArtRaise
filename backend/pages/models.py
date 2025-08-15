from django.db import models
from wagtail.models import Page
from wagtail.fields import RichTextField
from wagtail.admin.panels import FieldPanel, MultiFieldPanel
from wagtail.api import APIField


class HomePage(Page):
    """
    Головна сторінка сайту ArtRaise
    Служить контейнером для всіх інших сторінок
    """
    
    # Налаштування сторінки
    max_count = 1  # Тільки одна головна сторінка
    
    # Дозволяємо створювати будь-які дочірні сторінки
    # (за винятком обмежень самих дочірніх сторінок)
    subpage_types = [
        'pages.AboutFondPage', 
        'pages.HomeAuthenticityCertsPage',
        'wagtailcore.Page',
    ]

    class Meta:
        verbose_name = "Головна сторінка"
        verbose_name_plural = "Головні сторінки"
    
    def __str__(self):
        return self.title


class AboutFondPage(Page):
    """
    Сторінка 'Про фонд' для головної сторінки сайту
    Доступна як дочірня сторінка HomePage: /about-fond/
    """
    
    # Зображення фонду
    image = models.ImageField(
        upload_to='about_fond/',
        blank=False,
        null=False,
        verbose_name="Зображення фонду",
        help_text="Головне зображення для сторінки 'Про фонд'"
    )
    
    # Локація (м. Львів, Україна)
    location = models.CharField(
        max_length=100,
        default="м. Львів, Україна",
        verbose_name="Локація",
        help_text="Місцезнаходження фонду (наприклад: м. Львів, Україна)"
    )
    
    # Назва фонду (заголовок)
    fond_name = models.CharField(
        max_length=200,
        default="ArtRaise",
        verbose_name="Назва фонду",
        help_text="Офіційна назва фонду"
    )
    
    # Детальний опис фонду
    description = RichTextField(
        verbose_name="Опис фонду",
        help_text="Детальна інформація про фонд з можливістю форматування"
    )
    
    # Налаштування відображення в CMS
    content_panels = Page.content_panels + [
        MultiFieldPanel([
            FieldPanel('fond_name'),
            FieldPanel('location'),
        ], heading="Основна інформація"),
        
        FieldPanel('image'),
        FieldPanel('description'),
    ]
    
    # API поля для Wagtail API
    api_fields = [
        APIField('image'),
        APIField('location'),
        APIField('fond_name'),
        APIField('description'),
    ]
    
    # Налаштування сторінки
    max_count = 1  # Дозволяємо створити тільки одну сторінку цього типу
    
    # Дозволяємо створювати цю сторінку тільки під HomePage
    parent_page_types = ['pages.HomePage']
    
    
    class Meta:
        verbose_name = "Сторінка 'Про фонд'"
        verbose_name_plural = "Сторінки 'Про фонд'"
    
    def __str__(self):
        return f"Про фонд: {self.fond_name}"


class HomeAuthenticityCertsPage(Page):
    """
    Сторінка 'Home Authenticity Certs' для головної сторінки сайту
    Доступна як дочірня сторінка HomePage: /home-authenticity-certs/
    """
    
    # Заголовок секції
    title_text = models.CharField(
        max_length=200,
        verbose_name="Заголовок",
        help_text="Заголовок секції (макс. 200 символів)"
    )
    
    # Зображення
    image = models.ImageField(
        upload_to='authenticity_certs/',
        blank=False,
        null=False,
        verbose_name="Зображення",
        help_text="Зображення для секції автентичності сертифікатів"
    )
    
    # Текст кнопки
    button_text = models.CharField(
        max_length=100,
        default="Переглянути сертифікати",
        verbose_name="Текст кнопки",
        help_text="Текст на кнопці (макс. 100 символів)"
    )
    
    # Ссылка кнопки
    button_url = models.URLField(
        blank=True,
        verbose_name="Посилання кнопки",
        help_text="URL, куди веде кнопка (необов'язково)"
    )
    
    # Налаштування відображення в CMS
    content_panels = Page.content_panels + [
        FieldPanel('title_text'),
        FieldPanel('image'),
        
        MultiFieldPanel([
            FieldPanel('button_text'),
            FieldPanel('button_url'),
        ], heading="Налаштування кнопки"),
    ]
    
    # API поля для Wagtail API
    api_fields = [
        APIField('title_text'),
        APIField('image'),
        APIField('button_text'),
        APIField('button_url'),
    ]
    
    # Налаштування сторінки
    max_count = 1  # Дозволяємо створити тільки одну сторінку цього типу
    
    # Дозволяємо створювати цю сторінку тільки під HomePage
    parent_page_types = ['pages.HomePage']
    
    class Meta:
        verbose_name = "Сторінка 'Home Authenticity Certs'"
        verbose_name_plural = "Сторінки 'Home Authenticity Certs'"
    
    def __str__(self):
        return f"Authenticity Certs: {self.title_text}"
