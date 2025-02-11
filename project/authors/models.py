from django.db import models
from wagtail.admin.panels import FieldPanel
from wagtail.api import APIField

from events.models import Event


class Author(models.Model):
    fullname = models.CharField(max_length=255)
    bio_text = models.TextField(max_length=1000)
    style = models.CharField(max_length=255)
    theme = models.CharField(max_length=255)
    expression_type = models.CharField(max_length=255)

    event = models.ForeignKey(Event, on_delete=models.SET_NULL, null=True, blank=True)

    panels = [
        FieldPanel('fullname'),
        FieldPanel('bio_text'),
        FieldPanel('style'),
        FieldPanel('theme'),
        FieldPanel('expression_type'),
        FieldPanel('event'),
    ]

    api_fields = [
        APIField('fullname'),
        APIField('bio_text'),
        APIField('style'),
        APIField('theme'),
        APIField('expression_type'),
        APIField('event'),
    ]

    def __str__(self):
        return self.fullname
