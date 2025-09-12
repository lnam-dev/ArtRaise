from django.db import models
from django.utils.translation import gettext_lazy as _
from django.db import models


class HowToBuyBlock(models.Model):
    """
    Модель для блоків розділу "Як купити".
    Підтримує локалізацію та динамічне управління через адмінку.
    """
    title_en = models.CharField(
        max_length=200,
        verbose_name="Заголовок англійською",
        help_text="Заголовок блоку англійською мовою (може містити HTML)"
    )
    title_ua = models.CharField(
        max_length=200,
        verbose_name="Заголовок українською",
        help_text="Заголовок блоку українською мовою (може містити HTML)"
    )
    description_en = models.TextField(
        verbose_name="Опис англійською",
        help_text="Детальний опис блоку англійською мовою"
    )
    description_ua = models.TextField(
        verbose_name="Опис українською",
        help_text="Детальний опис блоку українською мовою"
    )
    order = models.PositiveIntegerField(
        default=0,
        verbose_name="Порядок",
        help_text="Порядок відображення (менше число = вище в списку)"
    )
    is_active = models.BooleanField(
        default=True,
        verbose_name="Активний",
        help_text="Чи відображається блок на сайті"
    )
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Створено")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Оновлено")

    class Meta:
        verbose_name = "Блок 'Як купити'"
        verbose_name_plural = "Блоки 'Як купити'"
        ordering = ['order', 'id']
        indexes = [
            models.Index(fields=['is_active']),
            models.Index(fields=['order']),
        ]

    def __str__(self):
        return f"{self.order}. {self.title_ua}"


class FAQCategory(models.Model):
    name = models.CharField(max_length=100)  
    # code = models.CharField(max_length=10, null=True, blank=True) 

    def __str__(self):
        return self.name

class FAQ(models.Model):
    category = models.ForeignKey(
        FAQCategory, 
        null=True, 
        blank=True, 
        on_delete=models.SET_NULL,
        related_name="faqs"
    )
    question = models.CharField(max_length=255)
    answer = models.TextField(null=True, blank=True)
    order = models.IntegerField(default=0)
    is_active = models.BooleanField("Активний", default=True)
    show_in_call_to_action = models.BooleanField("Показувати в Call-to-Action", default=False)
    show_in_question_answer = models.BooleanField("Показувати в Q&A", default=False)
    show_in_how_to_buy = models.BooleanField("Показувати в How to Buy", default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.question


class CallToAction(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    question = models.CharField(max_length=2000)
    show_in_call_to_action = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.question

