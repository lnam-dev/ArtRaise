#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys

# Завантужуємо змінні середовища з файлу .env, якщо він існує
try:
    from dotenv import load_dotenv
    load_dotenv()  # автоматично шукає файл .env в кореневій директорії проекту
except ImportError:
    pass  # В продакшн-середовищі dotenv може не бути встановлено

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "project.settings.base")

def main():
    """Run administrative tasks."""
    # os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'project.settings.dev')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()
