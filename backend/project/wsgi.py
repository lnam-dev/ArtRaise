# """
# WSGI config for project project.

# It exposes the WSGI callable as a module-level variable named ``application``.

# For more information on this file, see
# https://docs.djangoproject.com/en/5.1/howto/deployment/wsgi/
# """

# import os

# from django.core.wsgi import get_wsgi_application

# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'project.settings.base')

# application = get_wsgi_application()

# backend/project/wsgi.py
"""
WSGI config for project project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/howto/deployment/wsgi/
"""

import os
import sys  # Додано для виводу помилок
import django # Потрібно для get_wsgi_application
import psycopg2 # Додано для прямої перевірки БД
from datetime import datetime # Додано для міток часу

def log_message(message):
    """Допоміжна функція для логування з міткою часу."""
    timestamp = datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S.%f')[:-3] + "Z"
    print(f"[{timestamp}] [wsgi.py] {message}", flush=True)

log_message("--- WSGI script starting ---")

# Визначаємо модуль налаштувань
# Якщо ви використовуєте змінну середовища DJANGO_SETTINGS_MODULE, встановлену
# в DigitalOcean, цей рядок може бути не потрібним, але зазвичай він не шкодить.
settings_module = os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'project.settings.base')
log_message(f"Using settings module: {settings_module}")

# === Явна перевірка підключення до БД ===
log_message("Attempting direct database connection check...")
db_name = os.environ.get('DB_NAME')
db_user = os.environ.get('DB_USER')
db_pass = os.environ.get('DB_PASS') # Будьте обережні з логуванням паролів!
db_host = os.environ.get('DB_HOST')
db_sslmode = os.environ.get('DB_SSLMODE', 'require') # Беремо з env або 'require' за замовчуванням

if not all([db_name, db_user, db_pass, db_host]):
     log_message("!!! ERROR: One or more DB environment variables are missing!")
     # Тут можна або продовжити (і побачити помилку Django), або зупинити:
     # sys.exit("FATAL: Missing DB credentials in environment")
else:
    log_message(f"Connecting with: host='{db_host}' dbname='{db_name}' user='{db_user}' sslmode='{db_sslmode}'")
    conn = None # Ініціалізуємо conn
    try:
        log_message("Calling psycopg2.connect...")
        # Додаємо таймаут з'єднання (наприклад, 15 секунд)
        conn = psycopg2.connect(
            dbname=db_name,
            user=db_user,
            password=db_pass, # Передаємо пароль
            host=db_host,
            sslmode=db_sslmode, # Використовуємо змінну sslmode
            connect_timeout=15
        )
        log_message(">>> Direct DB connection SUCCEEDED!")

    except psycopg2.OperationalError as e:
        # Обробляємо конкретну помилку OperationalError, яка часто виникає при проблемах з підключенням
        log_message(f"!!! DB connection FAILED (OperationalError): {e}")
        # Тут не зупиняємо процес, щоб побачити, чи зможе Django обробити це пізніше
    except Exception as e:
        # Обробляємо інші можливі винятки
        log_message(f"!!! DB connection FAILED (Other Exception): {type(e).__name__} - {e}")
    finally:
        # Завжди намагаємося закрити з'єднання, якщо воно було відкрито
        if conn is not None:
            conn.close()
            log_message("DB connection closed.")
# ========================================

log_message("Attempting to get WSGI application...")
try:
    application = django.core.wsgi.get_wsgi_application()
    log_message(">>> WSGI application obtained successfully.")
except Exception as e:
    log_message(f"!!! FAILED to get WSGI application: {type(e).__name__} - {e}")
    # Якщо тут помилка, Gunicorn, ймовірно, не зможе запустити воркера
    raise # Перевикидаємо помилку, щоб Gunicorn її побачив

log_message("--- WSGI script finished successfully (application ready) ---")
