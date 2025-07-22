"""
ASGI config for project project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/howto/deployment/asgi/
"""

import os
from django.core.asgi import get_asgi_application
from pathlib import Path

print("=== ASGI.PY START ===", flush=True)
print(f"ASGI file path: {__file__}", flush=True)
print(f"Current working directory: {os.getcwd()}", flush=True)

# завантажуємо перемінні середовища з файлу .env, якщо він існує
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

print("Loading ASGI application...", flush=True)
try:
    application = get_asgi_application()
    print("✓ ASGI application loaded successfully", flush=True)
except Exception as e:
    print(f"❌ Error loading ASGI application: {e}", flush=True)
    import traceback
    traceback.print_exc()
    raise

print("=== ASGI.PY COMPLETED ===", flush=True)
