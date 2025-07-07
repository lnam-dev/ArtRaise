from .base import *
from decouple import config

DEBUG = True
ALLOWED_HOSTS = ["*"]


DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": config('DEV_DB_NAME'),
        "USER": config('DEV_DB_USER'),
        "PASSWORD": config('DEV_DB_PASSWORD'),
        "HOST": config('DEV_DB_HOST'),
        "PORT": config('DEV_DB_PORT'),
        'OPTIONS': {
            'sslmode': 'require',
        },
    }
}


MIDDLEWARE += [
]

INTERNAL_IPS = ["127.0.0.1"]

CACHES = {
    "default": {
        "BACKEND": "django.core.cache.backends.dummy.DummyCache",
    }
}

MEDIA_URL = config('MEDIA_URL', default='https://artraise-media.fra1.cdn.digitaloceanspaces.com/')

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'mailhog'
EMAIL_PORT = 1025
DEFAULT_FROM_EMAIL = 'test@example.com'
