#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys

print("=== MANAGE.PY START ===")
print(f"Python version: {sys.version}")
print(f"Python path: {sys.executable}")
print(f"Current working directory: {os.getcwd()}")
print(f"Python sys.path: {sys.path[:3]}...")  # Первые 3 элемента пути

# Завантужуємо змінні середовища з файлу .env, якщо він існує
print("Loading environment variables from .env file...")
try:
    from dotenv import load_dotenv
    env_file_path = os.path.join(os.getcwd(), '.env')
    print(f"Looking for .env file at: {env_file_path}")
    print(f".env file exists: {os.path.exists(env_file_path)}")
    
    if os.path.exists(env_file_path):
        with open(env_file_path, 'r') as f:
            content = f.read()
            print(f".env file content length: {len(content)} characters")
            print(f".env file first 100 chars: {content[:100]}")
    
    load_dotenv(override=True)  # Принудительно перезаписываем существующие переменные
    print("✓ dotenv loaded successfully")
    
    # Проверяем ключевые переменные после загрузки
    print("Environment variables after .env loading:")
    for key in ['DB_NAME', 'AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY', 'MEDIA_URL']:
        value = os.environ.get(key)
        if value:
            if 'SECRET' in key or 'PASS' in key:
                print(f"  {key}: {value[:8]}***")
            else:
                print(f"  {key}: {value}")
        else:
            print(f"  {key}: NOT SET")
            
except ImportError as e:
    print(f"❌ dotenv import failed: {e}")
    print("In production environment, dotenv may not be installed")
except Exception as e:
    print(f"❌ Error loading .env: {e}")

print(f"DJANGO_SETTINGS_MODULE before setdefault: {os.environ.get('DJANGO_SETTINGS_MODULE')}")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "project.settings.base")
print(f"DJANGO_SETTINGS_MODULE after setdefault: {os.environ.get('DJANGO_SETTINGS_MODULE')}")

def main():
    """Run administrative tasks."""
    print("=== MAIN FUNCTION START ===")
    print(f"Command line arguments: {sys.argv}")
    
    try:
        print("Importing Django management...")
        from django.core.management import execute_from_command_line
        print("✓ Django management imported successfully")
    except ImportError as exc:
        print(f"❌ Django import failed: {exc}")
        print("Current sys.path:")
        for i, path in enumerate(sys.path):
            print(f"  {i}: {path}")
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    
    print("Executing command line...")
    try:
        execute_from_command_line(sys.argv)
        print("✓ Command executed successfully")
    except Exception as e:
        print(f"❌ Command execution failed: {e}")
        raise


if __name__ == '__main__':
    print("=== SCRIPT ENTRY POINT ===")
    try:
        main()
    except Exception as e:
        print(f"❌ Fatal error in main(): {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
    print("=== SCRIPT COMPLETED ===")
