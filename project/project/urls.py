from django.urls import path, include, re_path
from django.conf.urls.static import static
from django.conf import settings
from wagtail.admin import urls as wagtailadmin_urls
from wagtail import urls as wagtail_urls
from wagtail.documents import urls as wagtaildocs_urls
from .api import api_router

urlpatterns = [
    # Wagtail urls
    path('cms/', include(wagtailadmin_urls)),
    path('documents/', include(wagtaildocs_urls)),
    path('pages/', include(wagtail_urls)),
    path('api/v2/', api_router.urls),
    path('users/', include('users.urls')),
    re_path(r'^', include(wagtail_urls)),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


