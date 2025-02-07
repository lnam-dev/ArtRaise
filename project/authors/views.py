from wagtail.api.v2.views import PagesAPIViewSet
from rest_framework.renderers import JSONRenderer
from .models import Author
from .serializers import AuthorSerializer


class AuthorViewSet(PagesAPIViewSet):
    serializer_class = AuthorSerializer
    renderer_classes = [JSONRenderer]
    queryset = Author.objects.all()

    def get_queryset(self):
        return self.queryset.order_by('-id')
