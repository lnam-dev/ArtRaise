#!/usr/bin/env python
"""
Тестовий скрипт для перевірки сериалайзера ArtPieceBuyFormSerializer
"""
import os
import sys
import django

# Додаємо шлях до Django проекту
sys.path.append('/home/david/artraise_project/ArtRaise/backend')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'project.settings.dev')

django.setup()

from artpiece.serializers import ArtPieceBuyFormSerializer
from artpiece.models import ArtPiece, ArtPieceBuyForm
from authors.models import Author

def test_serializer():
    print("=== Тестування ArtPieceBuyFormSerializer ===\n")
    
    # Тестові дані для створення запиту
    test_data = {
        'first_name': 'Іван',
        'last_name': 'Петренко',
        'email': 'ivan@example.com',
        'phone_number': '+380501234567',
        'description': 'Хочу купити цю картину',
        'artpiece': 1  # ID існуючого твору
    }
    
    print("1. Тестування валідних даних:")
    print(f"Вхідні дані: {test_data}")
    
    serializer = ArtPieceBuyFormSerializer(data=test_data)
    if serializer.is_valid():
        print("✅ Валідація пройшла успішно")
        print(f"Валідовані дані: {serializer.validated_data}")
    else:
        print("❌ Помилки валідації:")
        for field, errors in serializer.errors.items():
            print(f"  {field}: {errors}")
    
    print("\n" + "="*50 + "\n")
    
    # Тестування невалідних даних
    invalid_data = {
        'first_name': '',  # Пусте ім'я
        'last_name': 'Петренко',
        'email': 'invalid-email',  # Невалідний email
        'phone_number': '123',  # Невалідний телефон
        'description': 'Тест',
        'artpiece': 1
    }
    
    print("2. Тестування невалідних даних:")
    print(f"Вхідні дані: {invalid_data}")
    
    serializer = ArtPieceBuyFormSerializer(data=invalid_data)
    if serializer.is_valid():
        print("✅ Валідація пройшла (неочікувано)")
    else:
        print("❌ Очікувані помилки валідації:")
        for field, errors in serializer.errors.items():
            print(f"  {field}: {errors}")
    
    print("\n" + "="*50 + "\n")
    
    # Тестування серіалізації існуючого об'єкта
    print("3. Тестування серіалізації існуючого об'єкта:")
    try:
        # Спробуємо знайти перший твір мистецтва
        artpiece = ArtPiece.objects.first()
        if artpiece:
            # Створимо тестовий запит
            buy_form = ArtPieceBuyForm.objects.create(
                first_name='Тест',
                last_name='Користувач',
                email='test@example.com',
                phone_number='+380671234567',
                description='Тестовий запит',
                artpiece=artpiece
            )
            
            serializer = ArtPieceBuyFormSerializer(buy_form)
            print("✅ Серіалізація успішна:")
            print(f"Серіалізовані дані: {serializer.data}")
            
            # Видаляємо тестовий об'єкт
            buy_form.delete()
        else:
            print("❌ Не знайдено жодного твору мистецтва для тесту")
    except Exception as e:
        print(f"❌ Помилка при тестуванні серіалізації: {e}")

if __name__ == '__main__':
    test_serializer() 