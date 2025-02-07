from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    createdOn = models.DateTimeField(auto_now_add=True)
    USERNAME_FIELD = 'email'  # Логін через email
    REQUIRED_FIELDS = ['username']  # Залишається username обов'язковим для реєстрації але використовується email для логіну

    def __str__(self):
        return self.email

