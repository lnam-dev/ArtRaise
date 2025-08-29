"""
Management команда для пакетної оптимізації вже завантажених зображень.
Обробляє всі моделі з ImageField і оптимізує зображення в сховищі.
"""
import os
import io
from django.core.management.base import BaseCommand, CommandError
from django.apps import apps
from django.db import models
from django.core.files.base import ContentFile
from django.conf import settings
from PIL import Image
import logging

from utils.image_optimizer import ImageOptimizer

logger = logging.getLogger(__name__)


class Command(BaseCommand):
    help = 'Оптимізує всі вже завантажені зображення в проекті'

    def add_arguments(self, parser):
        parser.add_argument(
            '--model',
            type=str,
            help='Назва моделі для оптимізації (наприклад, ArtPiece). Якщо не вказано, обробляються всі моделі.',
        )
        parser.add_argument(
            '--field',
            type=str,
            help='Назва поля зображення для оптимізації. Використовується разом з --model.',
        )
        parser.add_argument(
            '--dry-run',
            action='store_true',
            help='Показати, які зображення будуть оптимізовані, без фактичної обробки.',
        )
        parser.add_argument(
            '--force',
            action='store_true',
            help='Примусово оптимізувати всі зображення, включаючи вже оптимізовані WebP.',
        )
        parser.add_argument(
            '--quality',
            type=int,
            default=90,
            help='Якість стиснення (1-100). За замовчуванням: 90',
        )
        parser.add_argument(
            '--batch-size',
            type=int,
            default=50,
            help='Розмір пакета для обробки. За замовчуванням: 50',
        )

    def handle(self, *args, **options):
        self.dry_run = options['dry_run']
        self.force = options['force']
        self.quality = options['quality']
        self.batch_size = options['batch_size']
        
        if self.quality < 1 or self.quality > 100:
            raise CommandError('Якість повинна бути від 1 до 100')
        
        self.stdout.write(
            self.style.SUCCESS(
                f'Початок пакетної оптимізації зображень '
                f'(якість: {self.quality}%, пакет: {self.batch_size})'
            )
        )
        
        if self.dry_run:
            self.stdout.write(self.style.WARNING('Режим DRY RUN - зображення не будуть змінені'))
        
        # Статистика
        self.total_processed = 0
        self.total_optimized = 0
        self.total_errors = 0
        self.total_size_before = 0
        self.total_size_after = 0
        
        try:
            # Якщо вказана конкретна модель
            if options['model']:
                self.process_specific_model(options['model'], options['field'])
            else:
                self.process_all_models()
                
            self.print_summary()
            
        except Exception as e:
            raise CommandError(f'Помилка при виконанні команди: {str(e)}')

    def process_specific_model(self, model_name, field_name=None):
        """Обробляє конкретну модель."""
        try:
            # Шукаємо модель у всіх додатках
            model = None
            for app_config in apps.get_app_configs():
                try:
                    model = apps.get_model(app_config.label, model_name)
                    break
                except LookupError:
                    continue
            
            if not model:
                raise CommandError(f'Модель {model_name} не знайдена')
            
            # Шукаємо ImageField у моделі
            image_fields = []
            for field in model._meta.fields:
                if isinstance(field, models.ImageField):
                    if field_name and field.name != field_name:
                        continue
                    image_fields.append(field.name)
            
            if not image_fields:
                if field_name:
                    raise CommandError(f'Поле {field_name} не знайдено або не є ImageField')
                else:
                    raise CommandError(f'У моделі {model_name} немає ImageField')
            
            self.stdout.write(f'Обробка моделі {model.__name__} з полями: {image_fields}')
            self.process_model(model, image_fields)
            
        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f'Помилка при обробці моделі {model_name}: {str(e)}')
            )

    def process_all_models(self):
        """Обробляє всі моделі з ImageField."""
        all_models = apps.get_models()
        
        for model in all_models:
            # Шукаємо ImageField у моделі
            image_fields = []
            for field in model._meta.fields:
                if isinstance(field, models.ImageField):
                    image_fields.append(field.name)
            
            # Якщо в моделі є ImageField, обробляємо її
            if image_fields:
                self.stdout.write(f'Обробка моделі {model.__name__} з полями: {image_fields}')
                self.process_model(model, image_fields)

    def process_model(self, model, image_fields):
        """Обробляє всі об'єкти моделі з ImageField."""
        try:
            # Отримуємо загальну кількість об'єктів
            total_objects = model.objects.count()
            
            if total_objects == 0:
                self.stdout.write(f'  Немає об\'єктів у моделі {model.__name__}')
                return
            
            self.stdout.write(f'  Знайдено {total_objects} об\'єктів')
            
            # Обробляємо пакетами
            processed = 0
            for offset in range(0, total_objects, self.batch_size):
                batch = model.objects.all()[offset:offset + self.batch_size]
                
                for instance in batch:
                    self.process_instance(instance, image_fields)
                    processed += 1
                    
                    # Показуємо прогрес
                    if processed % 10 == 0 or processed == total_objects:
                        self.stdout.write(
                            f'    Оброблено: {processed}/{total_objects} '
                            f'({processed * 100 // total_objects}%)'
                        )
                        
        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f'Помилка при обробці моделі {model.__name__}: {str(e)}')
            )

    def process_instance(self, instance, image_fields):
        """Обробляє один об'єкт моделі."""
        for field_name in image_fields:
            try:
                image_field = getattr(instance, field_name, None)
                
                if not image_field:
                    continue
                
                self.total_processed += 1
                
                # Перевіряємо, чи потрібно оптимізувати
                should_optimize = self.should_optimize_image(image_field)
                
                if not should_optimize and not self.force:
                    continue
                
                # Отримуємо розмір вихідного файлу
                try:
                    original_size = image_field.size
                    self.total_size_before += original_size
                except:
                    original_size = 0
                
                if self.dry_run:
                    self.stdout.write(
                        f'    [DRY RUN] Буде оптимізовано: {instance.__class__.__name__} '
                        f'(ID: {instance.pk}) - поле {field_name} '
                        f'(розмір: {original_size // 1024}KB)'
                    )
                    continue
                
                # Оптимізуємо зображення
                optimized = self.optimize_image_field(instance, field_name, image_field)
                
                if optimized:
                    # Зберігаємо зміни
                    instance.save(update_fields=[field_name])
                    
                    # Отримуємо новий розмір
                    try:
                        new_size = getattr(instance, field_name).size
                        self.total_size_after += new_size
                        compression_ratio = (1 - new_size / original_size) * 100 if original_size > 0 else 0
                        
                        self.stdout.write(
                            f'    ✓ Оптимізовано: {instance.__class__.__name__} '
                            f'(ID: {instance.pk}) - поле {field_name} '
                            f'({original_size // 1024}KB -> {new_size // 1024}KB, '
                            f'стиснення: {compression_ratio:.1f}%)'
                        )
                    except:
                        self.total_size_after += original_size  # Якщо не вдалося отримати новий розмір
                    
                    self.total_optimized += 1
                else:
                    self.total_size_after += original_size
                    
            except Exception as e:
                self.total_errors += 1
                self.stdout.write(
                    self.style.ERROR(
                        f'    ✗ Помилка при обробці {instance.__class__.__name__} '
                        f'(ID: {instance.pk}) - поле {field_name}: {str(e)}'
                    )
                )

    def should_optimize_image(self, image_field):
        """Визначає, чи потрібно оптимізувати зображення."""
        if not image_field:
            return False
        
        try:
            # Перевіряємо розмір файлу (оптимізуємо якщо більше 200KB)
            if hasattr(image_field, 'size') and image_field.size > 200 * 1024:
                return True
            
            # Перевіряємо формат файлу
            if hasattr(image_field, 'name'):
                filename = image_field.name.lower()
                # Оптимізуємо всі формати крім вже існуючих WebP
                if not filename.endswith('.webp'):
                    return True
            
            return False
            
        except Exception:
            return False

    def optimize_image_field(self, instance, field_name, image_field):
        """Оптимізує поле зображення."""
        try:
            # Отримуємо налаштування оптимізації для моделі
            optimization_settings = self.get_optimization_settings(instance.__class__, field_name)
            optimization_settings['quality'] = self.quality  # Перевизначаємо якість з параметрів
            
            # Використовуємо наш ImageOptimizer
            optimized_file = ImageOptimizer.optimize_image(image_field, **optimization_settings)
            
            if optimized_file:
                # Присвоюємо оптимізований файл
                setattr(instance, field_name, optimized_file)
                return True
                
        except Exception as e:
            logger.error(f'Помилка при оптимізації поля {field_name}: {str(e)}')
        
        return False

    def get_optimization_settings(self, model, field_name):
        """Повертає налаштування оптимізації для моделі."""
        settings = {
            'format_type': 'WebP',
            'max_dimension': 2048
        }
        
        model_name = model.__name__.lower()
        
        if model_name == 'artpiece':
            settings['max_dimension'] = 2048
        elif model_name == 'category':
            settings['max_dimension'] = 800
        elif model_name == 'slide':
            settings['max_dimension'] = 1920
        elif 'page' in model_name:
            settings['max_dimension'] = 1200
        
        return settings

    def print_summary(self):
        """Виводить підсумкову статистику."""
        self.stdout.write('\n' + '=' * 60)
        self.stdout.write(self.style.SUCCESS('ПІДСУМКИ ПАКЕТНОЇ ОПТИМІЗАЦІЇ'))
        self.stdout.write('=' * 60)
        
        self.stdout.write(f'Всього оброблено зображень: {self.total_processed}')
        self.stdout.write(f'Успішно оптимізовано: {self.total_optimized}')
        self.stdout.write(f'Помилок: {self.total_errors}')
        
        if self.total_size_before > 0 and self.total_size_after > 0:
            total_compression = (1 - self.total_size_after / self.total_size_before) * 100
            
            self.stdout.write(f'Загальний розмір до: {self.total_size_before // (1024 * 1024)}MB')
            self.stdout.write(f'Загальний розмір після: {self.total_size_after // (1024 * 1024)}MB')
            self.stdout.write(
                self.style.SUCCESS(
                    f'Загальне стиснення: {total_compression:.1f}% '
                    f'(заощаджено {(self.total_size_before - self.total_size_after) // (1024 * 1024)}MB)'
                )
            )
        
        if self.dry_run:
            self.stdout.write(
                self.style.WARNING(
                    '\nЦе був режим DRY RUN. Для фактичної оптимізації запустіть команду без --dry-run'
                )
            )
