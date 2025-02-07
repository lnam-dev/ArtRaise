from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from wagtail.admin import urls as wagtailadmin_urls
from wagtail import urls as wagtail_urls
from wagtail.documents import urls as wagtaildocs_urls

urlpatterns = [
    # Wagtail urls
    path('cms/', include(wagtailadmin_urls)),
    path('documents/', include(wagtaildocs_urls)),
    path('pages/', include(wagtail_urls)),

    # Project urls
    path('users/', include('users.urls')),  # Додаємо всі URL з додатку 'users
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

