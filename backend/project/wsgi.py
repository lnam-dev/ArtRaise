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
from django.core.wsgi import get_wsgi_application
from pathlib import Path

print("=== WSGI.PY START ===", flush=True)
print(f"WSGI file path: {__file__}", flush=True)
print(f"Current working directory: {os.getcwd()}", flush=True)

# Завантажуємо змінні середовища з файла .env, якщо він існує
print("Loading environment variables from .env...", flush=True)
try:
    from dotenv import load_dotenv
    env_path = Path(__file__).resolve().parent.parent / '.env'
    print(f"Looking for .env at: {env_path}", flush=True)
    print(f".env exists: {env_path.exists()}", flush=True)
    
    if env_path.exists():
        with open(env_path, 'r') as f:
            content = f.read()
            print(f".env content length: {len(content)} characters", flush=True)
    
    load_dotenv(env_path, override=True)  # Принудительно перезаписываем
    print("✓ dotenv loaded successfully", flush=True)
    
    # Проверяем ключевые переменные
    key_vars = ['DB_NAME', 'AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY']
    for key in key_vars:
        value = os.environ.get(key)
        if value:
            if 'SECRET' in key or 'PASS' in key:
                print(f"  {key}: {value[:8]}***", flush=True)
            else:
                print(f"  {key}: {value}", flush=True)
        else:
            print(f"  {key}: NOT SET", flush=True)
            
except ImportError as e:
    print(f"❌ dotenv import failed: {e}", flush=True)
    print("In production environment, dotenv may not be installed", flush=True)
except Exception as e:
    print(f"❌ Error loading .env: {e}", flush=True)
    import traceback
    traceback.print_exc()

print("Setting DJANGO_SETTINGS_MODULE...", flush=True)
print(f"DJANGO_SETTINGS_MODULE before: {os.environ.get('DJANGO_SETTINGS_MODULE')}", flush=True)
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'project.settings.base')
print(f"DJANGO_SETTINGS_MODULE after: {os.environ.get('DJANGO_SETTINGS_MODULE')}", flush=True)

print("Loading WSGI application...", flush=True)
try:
    application = get_wsgi_application()
    print("✓ WSGI application loaded successfully", flush=True)
except Exception as e:
    print(f"❌ Error loading WSGI application: {e}", flush=True)
    import traceback
    traceback.print_exc()
    raise

print("=== WSGI.PY COMPLETED ===", flush=True)

