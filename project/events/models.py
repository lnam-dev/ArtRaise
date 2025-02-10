from django.db import models
from wagtail.fields import RichTextField
from wagtail.admin.panels import FieldPanel
from wagtail.api import APIField


class Event(models.Model):
    title = models.CharField(max_length=255)
    place = models.CharField(max_length=255)
    ticket_price = models.DecimalField(max_digits=10, decimal_places=2)
    description = RichTextField()
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)

    panels = [
        FieldPanel('title'),
        FieldPanel('place'),
        FieldPanel('ticket_price'),
        FieldPanel('description'),
        FieldPanel('start_date'),
        FieldPanel('end_date'),
    ]

    api_fields = [
        APIField('title'),
        APIField('place'),
        APIField('ticket_price'),
        APIField('description'),
        APIField('start_date'),
        APIField('end_date'),
    ]

    def __str__(self):
        return self.title



