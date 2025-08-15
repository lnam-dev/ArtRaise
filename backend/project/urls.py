from django.urls import path, include, re_path
from django.conf.urls.static import static
from django.conf import settings
from django.http import HttpResponse
from wagtail.admin import urls as wagtailadmin_urls
from wagtail import urls as wagtail_urls
from wagtail.documents import urls as wagtaildocs_urls
from wagtail.api.v2.router import WagtailAPIRouter
from wagtail.api.v2.views import PagesAPIViewSet
from wagtail.images.api.v2.views import ImagesAPIViewSet
from wagtail.documents.api.v2.views import DocumentsAPIViewSet

# Налаштування Wagtail API
api_router = WagtailAPIRouter('wagtailapi')
api_router.register_endpoint('pages', PagesAPIViewSet)
api_router.register_endpoint('images', ImagesAPIViewSet)
api_router.register_endpoint('documents', DocumentsAPIViewSet)

# Основні маршрути вашого додатку та Wagtail
# Змінені маршути з приставкою API для правильної маршутизації
urlpatterns = [
    path('health/', lambda request: HttpResponse("OK", status=200)),
    path('cms/', include(wagtailadmin_urls)),
    path('documents/', include(wagtaildocs_urls)),
    
    # Wagtail API - надає доступ до сторінок, зображень та документів
    path('api/v2/', api_router.urls),
    
    # Кастомні API маршрути
    path('api/users/', include('users.urls')),
    path('api/search/', include('search.urls')),
    path('api/authors/', include('authors.urls')),
    path('api/events/', include('events.urls')),
    path('api/artpieces/', include('artpiece.urls')),
    path('api/faq/', include('faq.urls')),
    path('api/main-page/', include('pages.urls')),

    # Wagtail catch-all для сторінок - зазвичай має бути останнім серед основних маршрутів
    re_path(r'^', include(wagtail_urls)),
]
if settings.MEDIA_URL and settings.MEDIA_ROOT:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
# # Додавання маршрутів для DEBUG режиму
# if settings.DEBUG:
#     try:
#         import debug_toolbar
#         # Додаємо маршрут для Django Debug Toolbar
#         urlpatterns.append(path("__debug__/", include(debug_toolbar.urls)))
#     except ImportError:
#         pass # Якщо debug_toolbar не встановлено, ігноруємо

    # Додаємо маршрути для роздачі медіафайлів
