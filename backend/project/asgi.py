"""
ASGI config for project project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/howto/deployment/asgi/
"""

import os
from django.core.asgi import get_asgi_application

# завантажуємо перемінні середовища з файлу .env, якщо він існує
try:
    from dotenv import load_dotenv
    load_dotenv()  # Автоматично шукає файл .env в кореневій директорії проекту
except ImportError:
    pass  # В продакшн-середовищі dotenv може не бути встановлено

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'project.settings.base')

application = get_asgi_application()
