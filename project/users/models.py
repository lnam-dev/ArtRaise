from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    createdOn = models.DateTimeField(auto_now_add=True)
    USERNAME_FIELD = 'email'  # Логін через email
    REQUIRED_FIELDS = ['username']  # Залишається username обов'язковим для реєстрації але використовується email для логіну

    def __str__(self):
        return self.email
# """
# Database models
# """
# from django.conf import settings
# from django.db import models
# from django.contrib.auth.models import (
#     AbstractBaseUser,
#     BaseUserManager,
#     PermissionsMixin,
# )
# from wagtail.api import APIField
#
# class UserManager(BaseUserManager):
#     """Manager for users"""
#
#     def create_user(self, email, password=None, **extra_fields):
#         """Create, save and return new user"""
#         if not email:
#             raise ValueError('User must have an email')
#         user = self.model(email=self.normalize_email(email), **extra_fields)
#         user.set_password(password)
#         user.save(using=self._db)
#
#         return user
#
#     def create_superuser(self, email, password, **extra_fields):
#         """Create and return a new superuser"""
#         user = self.create_user(email, password)
#         user.is_staff = True
#         user.is_superuser = True
#         user.save(using=self._db)
#
#         return user
#
#
# class User(AbstractBaseUser, PermissionsMixin):
#     """User in the system"""
#     email = models.EmailField(max_length=255, unique=True)
#     name = models.CharField(max_length=255)
#     is_active = models.BooleanField(default=True)
#     is_staff = models.BooleanField(default=False)
#
#     objects = UserManager()
#
#     USERNAME_FIELD = 'email'
#
#     api_fields = [
#         APIField('email'),
#         APIField('name'),
#     ]
