from django.db import models
from wagtail.api import APIField
from authors.models import Author


class ArtPieceType(models.TextChoices):
    PAINTING = "painting", "живопис"
    SCULPTURE = "sculpture", "скульптура"
    GRAPHICS = "graphics", "графіка"
    ARCHITECTURE = "architecture", "архітектура"
    APLIED_ART = "aplied_art", "прикладне_мистецтво"
    DESIGN = "design", "дизайн"


class ArtPiece(models.Model):
    title = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    type = models.CharField(
        max_length=20,
        choices=ArtPieceType.choices)
    material = models.CharField(max_length=255)
    theme = models.CharField(max_length=255)
    style = models.CharField(max_length=255)
    length_cm = models.DecimalField(max_digits=10, decimal_places=2)
    width_cm = models.DecimalField(max_digits=10, decimal_places=2)
    creating_date_start = models.IntegerField(null=True, blank=True)
    creating_date_end = models.IntegerField(null=True, blank=True)
    description = models.TextField(max_length=1000)
    # certificate = models.FileField(
    #     upload_to="certificates/",
    #     null=True,
    #     blank=True
    # )
    author = models.ForeignKey(
        Author,
        on_delete=models.CASCADE,
        related_name='artpieces'
    )
    # fond = models.ForeignKey(
    #     Fond,
    #     on_delete=models.SET_NULL,
    #     null=True,
    #     blank=True,
    #     related_name='artpieces'
    # )

    def get_display_date(self):
        if self.creating_date_start and self.creating_date_end:
            return f"{self.creating_date_start}-{self.creating_date_end}"
        elif self.creating_date_start:
            return f"{self.creating_date_start}"
        else:
            return f"Unknown"

    @property
    def creating_date(self):
        return self.creating_date_start

    api_fields = [
        APIField('title'),
        APIField('price'),
        APIField('type'),
        APIField('material'),
        APIField('theme'),
        APIField('style'),
        APIField('length_cm'),
        APIField('width_cm'),
        APIField('creating_date'),
        APIField('description'),
        APIField('author'),
    ]

