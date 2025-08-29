"""
Management команда для аналізу зображень у проекті.
Показує статистику за розмірами, форматами та можливостями оптимізації.
"""
from django.core.management.base import BaseCommand
from django.apps import apps
from django.db import models
from collections import defaultdict
import os


class Command(BaseCommand):
    help = 'Аналізує зображення у проекті та показує статистику'

    def add_arguments(self, parser):
        parser.add_argument(
            '--model',
            type=str,
            help='Назва моделі для аналізу (наприклад, ArtPiece). Якщо не вказано, аналізуються всі моделі.',
        )
        parser.add_argument(
            '--details',
            action='store_true',
            help='Показати детальну інформацію по кожному зображенню.',
        )

    def handle(self, *args, **options):
        self.details = options['details']
        
        self.stdout.write(self.style.SUCCESS('Аналіз зображень у проекті'))
        self.stdout.write('=' * 60)
        
        # Статистика
        self.total_images = 0
        self.total_size = 0
        self.format_stats = defaultdict(int)
        self.size_stats = defaultdict(int)
        self.models_stats = defaultdict(int)
        self.optimization_candidates = 0
        self.optimization_savings = 0
        
        try:
            if options['model']:
                self.analyze_specific_model(options['model'])
            else:
                self.analyze_all_models()
                
            self.print_summary()
            
        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f'Помилка при виконанні аналізу: {str(e)}')
            )

    def analyze_specific_model(self, model_name):
        """Аналізує конкретну модель."""
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
                self.stdout.write(
                    self.style.ERROR(f'Модель {model_name} не знайдена')
                )
                return
            
            # Шукаємо ImageField у моделі
            image_fields = []
            for field in model._meta.fields:
                if isinstance(field, models.ImageField):
                    image_fields.append(field.name)
            
            if not image_fields:
                self.stdout.write(
                    self.style.WARNING(f'У моделі {model_name} немає ImageField')
                )
                return
            
            self.stdout.write(f'Аналіз моделі {model.__name__} з полями: {image_fields}')
            self.analyze_model(model, image_fields)
            
        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f'Помилка при аналізі моделі {model_name}: {str(e)}')
            )

    def analyze_all_models(self):
        """Аналізує всі моделі з ImageField."""
        all_models = apps.get_models()
        models_with_images = []
        
        for model in all_models:
            # Шукаємо ImageField у моделі
            image_fields = []
            for field in model._meta.fields:
                if isinstance(field, models.ImageField):
                    image_fields.append(field.name)
            
            # Якщо в моделі є ImageField, додаємо до списку
            if image_fields:
                models_with_images.append((model, image_fields))
        
        if not models_with_images:
            self.stdout.write(
                self.style.WARNING('У проекті не знайдено моделей з ImageField')
            )
            return
        
        self.stdout.write(f'Знайдено {len(models_with_images)} моделей з зображеннями:')
        for model, fields in models_with_images:
            self.stdout.write(f'  - {model.__name__}: {fields}')
        
        self.stdout.write('')
        
        for model, image_fields in models_with_images:
            self.stdout.write(f'Аналіз моделі {model.__name__}:')
            self.analyze_model(model, image_fields)
            self.stdout.write('')

    def analyze_model(self, model, image_fields):
        """Аналізує всі об'єкти моделі з ImageField."""
        try:
            total_objects = model.objects.count()
            
            if total_objects == 0:
                self.stdout.write('  Немає об\'єктів у моделі')
                return
            
            model_images = 0
            model_size = 0
            model_candidates = 0
            
            for instance in model.objects.all():
                for field_name in image_fields:
                    image_field = getattr(instance, field_name, None)
                    
                    if not image_field:
                        continue
                    
                    try:
                        # Отримуємо інформацію про файл
                        file_size = image_field.size
                        file_name = image_field.name
                        file_extension = os.path.splitext(file_name)[1].lower()
                        
                        model_images += 1
                        model_size += file_size
                        self.total_images += 1
                        self.total_size += file_size
                        self.models_stats[model.__name__] += 1
                        
                        # Статистика за форматами
                        if file_extension:
                            self.format_stats[file_extension] += 1
                        else:
                            self.format_stats['без розширення'] += 1
                        
                        # Статистика за розмірами
                        size_mb = file_size / (1024 * 1024)
                        if size_mb < 0.5:
                            self.size_stats['< 0.5MB'] += 1
                        elif size_mb < 1:
                            self.size_stats['0.5-1MB'] += 1
                        elif size_mb < 2:
                            self.size_stats['1-2MB'] += 1
                        elif size_mb < 5:
                            self.size_stats['2-5MB'] += 1
                        else:
                            self.size_stats['> 5MB'] += 1
                        
                        # Перевіряємо кандидатів на оптимізацію
                        if self.is_optimization_candidate(image_field):
                            model_candidates += 1
                            self.optimization_candidates += 1
                            # Приблизно оцінюємо можливу економію (30-50%)
                            estimated_savings = file_size * 0.4
                            self.optimization_savings += estimated_savings
                        
                        # Детальна інформація
                        if self.details:
                            self.stdout.write(
                                f'    {instance.__class__.__name__} (ID: {instance.pk}) - '
                                f'{field_name}: {os.path.basename(file_name)} '
                                f'({file_size // 1024}KB, {file_extension or "немає розширення"})'
                            )
                            
                    except Exception as e:
                        if self.details:
                            self.stdout.write(
                                f'    Помилка при аналізі {instance.__class__.__name__} '
                                f'(ID: {instance.pk}) - {field_name}: {str(e)}'
                            )
            
            # Статистика за моделлю
            self.stdout.write(f'  Об\'єктів: {total_objects}')
            self.stdout.write(f'  Зображень: {model_images}')
            self.stdout.write(f'  Загальний розмір: {model_size // (1024 * 1024)}MB')
            self.stdout.write(f'  Кандидатів на оптимізацію: {model_candidates}')
            
        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f'Помилка при аналізі моделі {model.__name__}: {str(e)}')
            )

    def is_optimization_candidate(self, image_field):
        """Визначає, чи є зображення кандидатом на оптимізацію."""
        if not image_field:
            return False
        
        try:
            # Розмір більше 200KB
            if hasattr(image_field, 'size') and image_field.size > 200 * 1024:
                return True
            
            # Не WebP формат
            if hasattr(image_field, 'name'):
                filename = image_field.name.lower()
                if not filename.endswith('.webp'):
                    return True
            
            return False
            
        except Exception:
            return False

    def print_summary(self):
        """Виводить підсумкову статистику."""
        self.stdout.write('=' * 60)
        self.stdout.write(self.style.SUCCESS('ПІДСУМКИ АНАЛІЗУ ЗОБРАЖЕНЬ'))
        self.stdout.write('=' * 60)
        
        self.stdout.write(f'Всього зображень: {self.total_images}')
        self.stdout.write(f'Загальний розмір: {self.total_size // (1024 * 1024)}MB')
        self.stdout.write(f'Кандидатів на оптимізацію: {self.optimization_candidates}')
        
        if self.optimization_savings > 0:
            self.stdout.write(
                f'Потенційна економія: ~{self.optimization_savings // (1024 * 1024)}MB'
            )
        
        # Статистика за моделями
        if self.models_stats:
            self.stdout.write('\nЗображення за моделями:')
            for model_name, count in self.models_stats.items():
                self.stdout.write(f'  {model_name}: {count}')
        
        # Статистика за форматами
        if self.format_stats:
            self.stdout.write('\nФормати файлів:')
            for format_name, count in self.format_stats.items():
                percentage = (count / self.total_images) * 100 if self.total_images > 0 else 0
                self.stdout.write(f'  {format_name}: {count} ({percentage:.1f}%)')
        
        # Статистика за розмірами
        if self.size_stats:
            self.stdout.write('\nРозподіл за розмірами:')
            for size_range, count in self.size_stats.items():
                percentage = (count / self.total_images) * 100 if self.total_images > 0 else 0
                self.stdout.write(f'  {size_range}: {count} ({percentage:.1f}%)')
        
        if self.optimization_candidates > 0:
            optimization_percentage = (self.optimization_candidates / self.total_images) * 100
            self.stdout.write('')
            self.stdout.write(
                self.style.WARNING(
                    f'Рекомендується оптимізувати {self.optimization_candidates} зображень '
                    f'({optimization_percentage:.1f}% від загальної кількості)'
                )
            )
            self.stdout.write(
                'Для оптимізації запустіть: python manage.py optimize_images'
            )
