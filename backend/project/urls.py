from django.urls import path, include, re_path
from django.conf.urls.static import static
from django.conf import settings
from wagtail.admin import urls as wagtailadmin_urls
from wagtail import urls as wagtail_urls
from wagtail.documents import urls as wagtaildocs_urls

# Основні маршрути вашого додатку та Wagtail
# Змінені маршути з приставкою API для правильної маршутизації
urlpatterns = [
    path('cms/', include(wagtailadmin_urls)),
    path('documents/', include(wagtaildocs_urls)),
    # Можливо, 'pages/' краще залишити для catch-all нижче, якщо він обробляє сторінки
    # path('pages/', include(wagtail_urls)),
    path('users/', include('users.urls')),
    path('search/', include('search.urls')),
    path('authors/', include('authors.urls')),
    path('events/', include('events.urls')),
    path('artpieces/', include('artpiece.urls')),
    path('faq/', include('faq.urls')),

    # Wagtail catch-all для сторінок - зазвичай має бути останнім серед основних маршрутів
    re_path(r'^', include(wagtail_urls)),
]
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
