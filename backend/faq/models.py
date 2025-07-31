from django.db import models
from django.utils.translation import gettext_lazy as _


class FAQ(models.Model):
    class TypeOfQuestion(models.TextChoices):
        ABOUT_PLATFORM = "AP"
        PAYMENT_AND_DELIVERY = "PAD"
        TECHNICAL_SUPPORT = "TS"
        COLLECTORS = "C"
    question = models.CharField(max_length=255)
    answer = models.TextField(null=True,  blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.question


class CallToAction(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    question = models.CharField(max_length=2000)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.question

