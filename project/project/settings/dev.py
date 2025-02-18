# settings/dev.py
from .base import *

DEBUG = True  # У розробці вмикаємо DEBUG

ALLOWED_HOSTS = ['*']  # Дозволяємо підключення з будь-яких хостів

INSTALLED_APPS += [
    'debug_toolbar',  # Django Debug Toolbar для аналізу запитів
]

MIDDLEWARE += [
    'debug_toolbar.middleware.DebugToolbarMiddleware',
]

# Статичні файли (для зручної розробки)
STATICFILES_DIRS = [
    BASE_DIR / "static",
]

# База даних (SQLite для розробки)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'artraise',
        'USER': 'postgres',
        'PASSWORD': 'postgres',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}

# Відключення кешування
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.dummy.DummyCache',
    }
}

# Django Debug Toolbar конфігурація
INTERNAL_IPS = [
    "127.0.0.1",
]

# Логування для розробки
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'level': 'DEBUG',
            'class': 'logging.StreamHandler',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['console'],
            'level': 'DEBUG',
            'propagate': True,
        },
    },
}
