"""
Сигнали Django для автоматичної оптимізації зображень.
Застосовуються до всіх моделей з ImageField.
"""
from django.db.models.signals import pre_save
from django.dispatch import receiver
from django.apps import apps
import logging

from utils.image_optimizer import optimize_image_field

logger = logging.getLogger(__name__)

# Словник для відстеження оброблених моделей, щоб уникнути дублювання сигналів
PROCESSED_MODELS = set()


def register_image_optimization_signals():
    """
    Реєструє сигнали оптимізації зображень для всіх моделей з ImageField.
    Викликається при ініціалізації додатка.
    """
    from django.db import models
    
    # Отримуємо всі моделі додатка
    all_models = apps.get_models()
    
    for model in all_models:
        # Шукаємо ImageField в моделі
        image_fields = []
        for field in model._meta.fields:
            if isinstance(field, models.ImageField):
                image_fields.append(field.name)
        
        # Якщо в моделі є ImageField, реєструємо сигнал
        if image_fields and model not in PROCESSED_MODELS:
            register_model_signal(model, image_fields)
            PROCESSED_MODELS.add(model)
            logger.info(f"Зареєстровано сигнал оптимізації для моделі {model.__name__} з полями: {image_fields}")


def register_model_signal(model, image_fields):
    """
    Реєструє сигнал pre_save для конкретної моделі.
    
    Args:
        model: Клас моделі Django
        image_fields: Список імен полів із зображеннями
    """
    
    @receiver(pre_save, sender=model)
    def optimize_images_before_save(sender, instance, **kwargs):
        """
        Оптимізує зображення перед збереженням моделі.
        """
        try:
            # Перевіряємо, чи це новий об'єкт або оновлення
            is_new = instance.pk is None
            
            for field_name in image_fields:
                image_field = getattr(instance, field_name, None)
                
                if not image_field:
                    continue
                
                # Для нових об'єктів оптимізуємо завжди
                # Для існуючих об'єктів перевіряємо, чи змінилося зображення
                should_optimize = is_new
                
                if not is_new:
                    try:
                        # Отримуємо старе значення з бази даних
                        old_instance = sender.objects.get(pk=instance.pk)
                        old_image = getattr(old_instance, field_name, None)
                        
                        # Порівнюємо шляхи до файлів
                        old_path = old_image.name if old_image else None
                        new_path = image_field.name if image_field else None
                        
                        should_optimize = old_path != new_path
                        
                    except sender.DoesNotExist:
                        should_optimize = True
                
                if should_optimize:
                    # Налаштування оптимізації залежно від моделі
                    optimization_settings = get_optimization_settings(sender, field_name)
                    
                    optimized = optimize_image_field(
                        instance, 
                        field_name, 
                        **optimization_settings
                    )
                    
                    if optimized:
                        logger.info(
                            f"Зображення в полі {field_name} моделі {sender.__name__} "
                            f"(ID: {instance.pk or 'новий'}) було оптимізовано"
                        )
                        
        except Exception as e:
            logger.error(f"Помилка при оптимізації зображень для {sender.__name__}: {str(e)}")


def get_optimization_settings(model, field_name):
    """
    Повертає налаштування оптимізації для конкретної моделі та поля.
    
    Args:
        model: Клас моделі Django
        field_name: Ім'я поля з зображенням
        
    Returns:
        dict: Налаштування оптимізації
    """
    # Базові налаштування
    settings = {
        'quality': 90,
        'format_type': 'WebP',
        'max_dimension': 2048
    }
    
    # Специфічні налаштування для різних моделей
    model_name = model.__name__.lower()
    
    if model_name == 'artpiece':
        # Для зображень творів мистецтва - висока якість
        settings.update({
            'quality': 92,
            'max_dimension': 2048
        })
    elif model_name == 'category':
        # Для категорій - середня якість, менший розмір
        settings.update({
            'quality': 85,
            'max_dimension': 800
        })
    elif model_name == 'slide':
        # Для слайдерів - висока якість, великий розмір
        settings.update({
            'quality': 90,
            'max_dimension': 1920
        })
    elif 'page' in model_name:
        # Для Wagtail сторінок - середня якість
        settings.update({
            'quality': 88,
            'max_dimension': 1200
        })
    
    return settings


# Обробник для зображень Wagtail
def register_wagtail_image_signal():
    """
    Реєструє сигнал для зображень Wagtail.
    """
    try:
        from wagtail.images.models import Image as WagtailImage
        
        @receiver(pre_save, sender=WagtailImage)
        def optimize_wagtail_image(sender, instance, **kwargs):
            """
            Оптимізує зображення Wagtail перед збереженням.
            """
            try:
                if instance.file and hasattr(instance.file, 'file'):
                    # Перевіряємо, чи це нове зображення
                    is_new = instance.pk is None
                    
                    if is_new:
                        optimized = optimize_image_field(
                            instance, 
                            'file',
                            quality=88,
                            format_type='WebP',
                            max_dimension=2048
                        )
                        
                        if optimized:
                            logger.info(f"Wagtail зображення {instance.title} було оптимізовано")
                            
            except Exception as e:
                logger.error(f"Помилка при оптимізації Wagtail зображення: {str(e)}")
                
    except ImportError:
        logger.warning("Wagtail не встановлено, пропускаємо реєстрацію сигналів для Wagtail зображень")
