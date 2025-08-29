"""
Конфігурація приложения utils для автоматичної оптимізації зображень.
"""
from django.apps import AppConfig
import logging

logger = logging.getLogger(__name__)


class UtilsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'utils'
    verbose_name = 'Утилиты'

    def ready(self):
        """
        Ініціалізація приложения - реєстрація сигналів оптимізації зображень.
        """
        try:
            from .image_signals import register_image_optimization_signals, register_wagtail_image_signal
            
            # Регистрируем сигналы для всех моделей с ImageField
            register_image_optimization_signals()
            
            # Регистрируем сигналы для Wagtail изображений
            register_wagtail_image_signal()

            logger.info("Сигнали оптимізації зображень успішно зареєстровані")

        except Exception as e:
            logger.error(f"Помилка при реєстрації сигналів оптимізації зображень: {str(e)}")
