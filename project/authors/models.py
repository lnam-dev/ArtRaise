from django.db import models
from wagtail.models import Page
from wagtail.fields import RichTextField
from wagtail.admin.panels import FieldPanel
from wagtail.api import APIField


class Author(Page):
    fullname = models.CharField(max_length=255)
    bio_text = RichTextField()
    style = models.CharField(max_length=255)
    theme = models.CharField(max_length=255)
    expression_type = models.CharField(max_length=255)
    category = models.CharField(max_length=255)

    content_panels = Page.content_panels + [
        FieldPanel('fullname'),
        FieldPanel('bio_text'),
        FieldPanel('style'),
        FieldPanel('theme'),
        FieldPanel('expression_type'),
        FieldPanel('category'),
    ]

    api_fields = [
        APIField('fullname'),
        APIField('bio_text'),
        APIField('style'),
        APIField('theme'),
        APIField('expression_type'),
        APIField('category'),
    ]

