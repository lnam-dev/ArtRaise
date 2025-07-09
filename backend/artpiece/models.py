from django.db import models
from django.core.validators import MinValueValidator
from phonenumber_field.modelfields import PhoneNumberField

from authors.models import Author


class ArtPieceType(models.TextChoices):
    PAINTING = "painting", "живопис"
    SCULPTURE = "sculpture", "скульптура"
    GRAPHICS = "graphics", "графіка"
    ARCHITECTURE = "architecture", "архітектура"
    APLIED_ART = "aplied_art", "прикладне_мистецтво"
    DESIGN = "design", "дизайн"


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
    type = models.CharField(
        max_length=20,
        choices=ArtPieceType.choices)
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
