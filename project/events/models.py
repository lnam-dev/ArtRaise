from django.db import models
from authors.models import Author


class Event(models.Model):
    title = models.CharField(max_length=255)
    location_name = models.CharField(max_length=100)
    location_details = models.CharField(null=True, blank=True)
    ticket_price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField(max_length=1000)
    start_date = models.DateField(null=True)
    end_date = models.DateField(null=True)
    authors = models.ManyToManyField(
        Author,
        related_name='events'
    )

    def __str__(self):
        return self.title
