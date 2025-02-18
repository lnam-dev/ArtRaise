# settings/prod.py

from .base import *

# Вимикаємо DEBUG на продакшн
DEBUG = False

ALLOWED_HOSTS = ['artraise.com']  # Лише дозволені домени

# Використовуємо базу даних PostgreSQL або іншу
DATABASES['default'] = {
    'ENGINE': 'django.db.backends.postgresql',
    'NAME': 'artraise',
    'USER': 'postgres',
    'PASSWORD': 'postgres',
    'HOST': 'localhost',
    'PORT': '5432',
}

# Секретний ключ для підпису JWT
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=5),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
    'ALGORITHM': 'HS256',
    'SIGNING_KEY': os.getenv('DJANGO_SECRET_KEY'),  # Секретний ключ з змінної середовища
}

# Параметри кешування (можна використовувати Redis або Memcached)
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.redis.RedisCache',
        'LOCATION': 'redis://127.0.0.1:6379/1',
    }
}
