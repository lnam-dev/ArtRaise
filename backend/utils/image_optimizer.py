"""
Утиліта для автоматичної оптимізації і стиснення зображень.
Підтримує конвертацію в WebP формат з заданим якістю.
"""
import io
import os
from PIL import Image, ImageFile
from django.core.files.uploadedfile import InMemoryUploadedFile
from django.core.files.base import ContentFile
import logging

# Разрешаем загрузку обрезанных изображений
ImageFile.LOAD_TRUNCATED_IMAGES = True

logger = logging.getLogger(__name__)


class ImageOptimizer:
    """
    Класс для оптимізації зображень.
    Підтримує конвертацію в WebP формат з настраиваемим якістю.
    """
    
    DEFAULT_QUALITY = 90
    DEFAULT_FORMAT = 'WebP'
    MAX_DIMENSION = 2048  # Максимальный размер по любой стороне
    
    @classmethod
    def optimize_image(cls, image_field, quality=None, format_type=None, max_dimension=None):
        """
        Оптимізує зображення: конвертує в WebP, стискає і змінює розмір при необхідності.

        Args:
            image_field: Django ImageField або файл зображення
            quality: Якість стиснення (1-100), за замовчуванням 90
            format_type: Формат вихідного зображення, за замовчуванням 'WebP'
            max_dimension: Максимальний розмір по будь-якій стороні, за замовчуванням 2048px
            
        Returns:
            ContentFile з оптимізованим зображенням або None в разі помилки
        """
        if not image_field:
            return None
            
        quality = quality or cls.DEFAULT_QUALITY
        format_type = format_type or cls.DEFAULT_FORMAT
        max_dimension = max_dimension or cls.MAX_DIMENSION
        
        try:
            
            if hasattr(image_field, 'file'):
                
                image_field.file.seek(0)
                image = Image.open(image_field.file)
            else:
                
                image = Image.open(image_field)
            
            
            original_name = getattr(image_field, 'name', 'image')
            if hasattr(image_field, 'file') and hasattr(image_field.file, 'name'):
                original_name = image_field.file.name
            
            
            name_without_ext = os.path.splitext(os.path.basename(original_name))[0]
            new_filename = f"{name_without_ext}.webp"
            
            
            if image.mode in ('RGBA', 'LA', 'P'):
                
                background = Image.new('RGB', image.size, (255, 255, 255))
                if image.mode == 'P':
                    image = image.convert('RGBA')
                background.paste(image, mask=image.split()[-1] if image.mode in ('RGBA', 'LA') else None)
                image = background
            elif image.mode != 'RGB':
                image = image.convert('RGB')
            
            
            original_width, original_height = image.size
            if max(original_width, original_height) > max_dimension:
                
                if original_width > original_height:
                    new_width = max_dimension
                    new_height = int((original_height * max_dimension) / original_width)
                else:
                    new_height = max_dimension
                    new_width = int((original_width * max_dimension) / original_height)
                
                image = image.resize((new_width, new_height), Image.Resampling.LANCZOS)
                logger.info(f"Зображення змінено з {original_width}x{original_height} на {new_width}x{new_height}")

            
            output_buffer = io.BytesIO()
            
            
            save_kwargs = {
                'format': format_type,
                'quality': quality,
                'optimize': True,
            }
            
            
            if format_type.upper() == 'WEBP':
                save_kwargs.update({
                    'method': 6,  
                    'lossless': False,
                })
            
            image.save(output_buffer, **save_kwargs)
            output_buffer.seek(0)
            
            
            optimized_file = ContentFile(
                output_buffer.getvalue(),
                name=new_filename
            )
            
            
            original_size = len(output_buffer.getvalue()) if hasattr(image_field, 'size') else 0
            if hasattr(image_field, 'size'):
                original_size = image_field.size
                compression_ratio = (1 - len(output_buffer.getvalue()) / original_size) * 100
                logger.info(
                    f"Зображення {new_filename} оптимізовано: "
                    f"{original_size} -> {len(output_buffer.getvalue())} байт "
                    f"(стиснення: {compression_ratio:.1f}%)"
                )
            
            return optimized_file
            
        except Exception as e:
            logger.error(f"Помилка при оптимізації зображення: {str(e)}")
            return None
    
    @classmethod
    def should_optimize(cls, image_field):
        """
        Визначає, чи потрібно оптимізувати зображення.

        Args:
            image_field: Django ImageField
            
        Returns:
            bool: True якщо зображення потрібно оптимізувати
        """
        if not image_field:
            return False
            
        try:
            
            if hasattr(image_field, 'size') and image_field.size > 500 * 1024:
                return True
                
            
            if hasattr(image_field, 'name'):
                filename = image_field.name.lower()
            
                if not filename.endswith('.webp'):
                    return True
                    
            return False
            
        except Exception as e:
            logger.error(f"Помилка при перевірці необхідності оптимізації: {str(e)}")
            return False


def optimize_image_field(instance, field_name, **kwargs):
    """
    Додаткова функція для оптимізації ImageField в моделі Django.

    Args:
        instance: Екземпляр моделі Django
        field_name: Ім'я поля з зображенням
        **kwargs: Додаткові параметри для оптимізації

    Returns:
        bool: True якщо зображення було оптимізовано
    """
    image_field = getattr(instance, field_name, None)
    
    if not image_field or not ImageOptimizer.should_optimize(image_field):
        return False
    
    try:
        optimized_file = ImageOptimizer.optimize_image(image_field, **kwargs)
        
        if optimized_file:
            setattr(instance, field_name, optimized_file)
            logger.info(f"Поле {field_name} моделі {instance.__class__.__name__} було оптимізовано")
            return True
            
    except Exception as e:
        logger.error(f"Помилка при оптимізації поля {field_name}: {str(e)}")

    return False
