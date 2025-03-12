from django.urls import path, include, re_path
from django.conf.urls.static import static
from django.conf import settings
from wagtail.admin import urls as wagtailadmin_urls
from wagtail import urls as wagtail_urls
from wagtail.documents import urls as wagtaildocs_urls

urlpatterns = []

if settings.DEBUG:
    import debug_toolbar
    urlpatterns += [path("__debug__/", include(debug_toolbar.urls))] # Для дебагу та додаткової інфи, працює тільки з дев налаштуваннями

# Wagtail urls
urlpatterns += [
    path('cms/', include(wagtailadmin_urls)),
    path('documents/', include(wagtaildocs_urls)),
    path('pages/', include(wagtail_urls)),
    path('api/users/', include('users.urls')),
    path('search/', include('search.urls')),  # Підключаємо маршрути пошуку
    path('api/authors/', include('authors.urls')),
    path('api/events/', include('events.urls')),
    path('api/artpieces/', include('artpiece.urls')),
    path('api/faq/', include('faq.urls')),
    re_path(r'^', include(wagtail_urls)),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
