from django.db import models
from wagtail.api import APIField


class Event(models.Model):
    title = models.CharField(max_length=255)
    location_name = models.CharField(max_length=100)
    location_details = models.CharField(null=True, blank=True)
    ticket_price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField(max_length=1000)
    start_date = models.DateField(null=True)
    end_date = models.DateField(null=True)

    api_fields = [
        APIField('title'),
        APIField('location_name'),
        APIField('location_details'),
        APIField('ticket_price'),
        APIField('description'),
        APIField('start_date'),
        APIField('end_date'),
    ]

    def __str__(self):
        return self.title
