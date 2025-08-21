from django.db import models
from django.core.validators import MinValueValidator
from django.utils.text import slugify
from phonenumber_field.modelfields import PhoneNumberField

from authors.models import Author


class Category(models.Model):
    """
    Модель для категорій творів мистецтва.
    Містить локалізацію та додаткову інформацію.
    """
    name_en = models.CharField(
        max_length=100, 
        unique=True, 
        verbose_name="Назва англійською",
        help_text="Англійська назва категорії (для API)"
    )
    name_ua = models.CharField(
        max_length=100, 
        unique=True, 
        verbose_name="Назва українською",
        help_text="Українська назва категорії (для інтерфейсу)"
    )
    description = models.TextField(
        blank=True, 
        verbose_name="Опис",
        help_text="Опис категорії"
    )
    image_url = models.ImageField(
        upload_to='categories/', 
        blank=True, 
        null=True,
        verbose_name="Зображення категорії",
        help_text="Зображення для представлення категорії"
    )
    is_active = models.BooleanField(
        default=True, 
        verbose_name="Активна",
        help_text="Чи відображається категорія на сайті"
    )
    order = models.PositiveIntegerField(
        default=0, 
        verbose_name="Порядок",
        help_text="Порядок відображення (менше число = вище в списку)"
    )
    slug = models.SlugField(
        max_length=100, 
        unique=True, 
        blank=True,
        verbose_name="Slug",
        help_text="URL-дружня назва (автоматично генерується)"
    )
    
    # Метадані
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Дата створення")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Дата оновлення")

    class Meta:
        verbose_name = "Категорія"
        verbose_name_plural = "Категорії"
        ordering = ['order', 'name_ua']
        indexes = [
            models.Index(fields=['is_active']),
            models.Index(fields=['order']),
            models.Index(fields=['slug']),
        ]

    def __str__(self):
        return f"{self.name_ua} ({self.name_en})"
    
    def save(self, *args, **kwargs):
        # Автоматично генеруємо slug з англійської назви
        if not self.slug:
            from django.utils.text import slugify
            self.slug = slugify(self.name_en)
        super().save(*args, **kwargs)


class ArtPieceFormat(models.TextChoices):
    SMALL = "small", "малий"
    MEDIUM = "medium", "середній"
    BIG = "big", "великий"


class ArtPieceOrientation(models.TextChoices):
    SQUARE = "square", "квадратна"
    PORTRAIT = "portrait", "портретна"
    LANDSCAPE = "landscape", "пейзажна"


class ArtPiece(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=255)
    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(0)]
    )
    # Нове поле категорії (заміна для type)
    category = models.ForeignKey(
        Category,
        on_delete=models.PROTECT,
        related_name='artpieces',
        verbose_name="Категорія",
        help_text="Категорія твору мистецтва"
    )
    material = models.CharField(max_length=255)
    theme = models.CharField(max_length=255)
    style = models.CharField(max_length=255)
    length_cm = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(0)],
    )
    width_cm = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(0)]
    )
    height_cm = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        blank=True,
        null=True,
        validators=[MinValueValidator(0)]
    )
    format = models.CharField(
        max_length=10,
        choices=ArtPieceFormat.choices,
        blank=True
    )
    orientation = models.CharField(
        max_length=10,
        choices=ArtPieceOrientation.choices,
    )
    gamma = models.CharField(max_length=255, blank=True)
    dominant_color = models.CharField(max_length=255, blank=True)
    creating_date_start = models.PositiveIntegerField(null=True, blank=True)
    creating_date_end = models.PositiveIntegerField(null=True, blank=True)
    description = models.TextField(max_length=1000)
    certificate = models.FileField(
         upload_to="certificates/",
         null=True,
         blank=True
    )
    image_artpiece = models.ImageField(
        upload_to="images_artpiece/",
        blank=True,
        null=True
    )
    author = models.ForeignKey(
        Author,
        on_delete=models.CASCADE,
        related_name='artpieces'
    )
    tags = models.ManyToManyField(
        'Tag',
        blank=True,
        related_name='artpieces',
        verbose_name="Теги",
        help_text="Теги твору мистецтва (максимум 5 тегів)"
    )

    def __str__(self):
        return self.title

    def clean(self):
        """Валідація моделі"""
        super().clean()
        # Перевірка кількості тегів можлива тільки після збереження об'єкта
        if self.pk and self.tags.count() > 5:
            from django.core.exceptions import ValidationError
            raise ValidationError("Артп'єс може мати максимум 5 тегів.")



class ArtPieceBuyForm(models.Model):
    first_name = models.CharField(
        max_length=100,
    )
    last_name = models.CharField(
        max_length=100,
    )
    email = models.EmailField()
    phone_number = PhoneNumberField(
        region='UA',
    )
    description = models.TextField(
        max_length=1000,
        blank=True,
    )

    artpiece = models.ForeignKey(
        ArtPiece, 
        on_delete=models.CASCADE,
        related_name='buy_requests'
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )
    
    is_processed = models.BooleanField(
        default=False,  
    )


class Tag(models.Model):
    """
    Модель для тегів творів мистецтва.
    """
    name = models.CharField(
        max_length=30,
        unique=True,
        verbose_name="Назва тега",
        help_text="Англійська назва тега (максимум 30 символів)"
    )
    name_ua = models.CharField(
        max_length=30,
        unique=True,
        verbose_name="Назва українською",
        help_text="Українська назва тега (максимум 30 символів)"
    )
    slug = models.SlugField(
        max_length=50,
        unique=True,
        blank=True,
        verbose_name="Slug",
        help_text="URL-дружня назва (автоматично генерується)"
    )
    description = models.TextField(
        blank=True,
        verbose_name="Опис",
        help_text="Опціональний опис тега"
    )
    color = models.CharField(
        max_length=7,
        blank=True,
        default="#007bff",
        verbose_name="Колір",
        help_text="Колір тега у форматі HEX (наприклад, #007bff)"
    )
    priority = models.PositiveIntegerField(
        default=0,
        verbose_name="Пріоритет",
        help_text="Порядок відображення (менше число = вище в списку)"
    )
    is_active = models.BooleanField(
        default=True,
        verbose_name="Активний",
        help_text="Чи відображається тег на сайті"
    )
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Створено")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Оновлено")

    class Meta:
        verbose_name = "Тег"
        verbose_name_plural = "Теги"
        ordering = ['priority', 'name']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name_ua or self.name
