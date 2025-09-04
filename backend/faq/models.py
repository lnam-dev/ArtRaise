from django.db import models
from django.utils.translation import gettext_lazy as _
from django.db import models



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

