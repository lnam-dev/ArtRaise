"""
Кастомний S3 storage backend з детальним логуванням
"""
import logging
from storages.backends.s3boto3 import S3Boto3Storage
from django.core.files.base import ContentFile

logger = logging.getLogger('storage_debug')


class DebugS3Boto3Storage(S3Boto3Storage):
    """S3 Storage з детальним логуванням всіх операцій"""
    
    def __init__(self, *args, **kwargs):
        logger.info("=== DebugS3Boto3Storage initialization ===")
        logger.info(f"Args: {args}")
        logger.info(f"Kwargs: {kwargs}")
        
        super().__init__(*args, **kwargs)
        
        logger.info(f"Bucket name: {self.bucket_name}")
        logger.info(f"Access key: {self.access_key[:8]}..." if self.access_key else "No access key")
        logger.info(f"Endpoint URL: {getattr(self, 'endpoint_url', 'Not set')}")
        logger.info(f"Custom domain: {getattr(self, 'custom_domain', 'Not set')}")
        logger.info("=== Initialization completed ===")
    
    def _save(self, name, content):
        logger.info(f"=== Starting file save: {name} ===")
        logger.info(f"Content type: {type(content)}")
        logger.info(f"Content size: {getattr(content, 'size', 'unknown')}")
        
        try:
            # Отримуємо доступне ім'я файлу
            available_name = self.get_available_name(name)
            logger.info(f"Available file name: {available_name}")
            
            # Викликаємо батьківський метод
            result = super()._save(name, content)
            logger.info(f"✅ File saved successfully: {result}")
            
            # Перевіряємо що файл дійсно існує
            exists = self.exists(result)
            logger.info(f"File exists after save: {exists}")
            
            # Отримуємо URL файлу
            try:
                file_url = self.url(result)
                logger.info(f"File URL: {file_url}")
            except Exception as url_error:
                logger.error(f"Error getting URL: {url_error}")
            
            return result
            
        except Exception as e:
            logger.error(f"Error saving file {name}: {e}")
            logger.error(f"Exception type: {type(e)}")
            import traceback
            logger.error(f"Traceback: {traceback.format_exc()}")
            raise
    
    def _open(self, name, mode='rb'):
        logger.info(f"Opening file: {name}, mode: {mode}")
        try:
            result = super()._open(name, mode)
            logger.info(f"✅ File opened successfully: {name}")
            return result
        except Exception as e:
            logger.error(f"❌ Error opening file {name}: {e}")
            raise
    
    def delete(self, name):
        logger.info(f"Deleting file: {name}")
        try:
            result = super().delete(name)
            logger.info(f"✅ File deleted successfully: {name}")
            return result
        except Exception as e:
            logger.error(f"❌ Error deleting file {name}: {e}")
            raise
    
    def exists(self, name):
        logger.debug(f"Checking file existence: {name}")
        try:
            result = super().exists(name)
            logger.debug(f"File {name} exists: {result}")
            return result
        except Exception as e:
            logger.error(f"Error checking file existence {name}: {e}")
            return False
    
    def url(self, name):
        logger.debug(f"Getting URL for file: {name}")
        try:
            result = super().url(name)
            logger.debug(f"URL for {name}: {result}")
            return result
        except Exception as e:
            logger.error(f"❌ Error getting URL for file {name}: {e}")
            raise
