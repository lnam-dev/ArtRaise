from rest_framework.renderers import JSONRenderer
from rest_framework.viewsets import ModelViewSet
from .models import Author
from .serializers import AuthorSerializer


class AuthorViewSet(ModelViewSet):
    serializer_class = AuthorSerializer
    renderer_classes = [JSONRenderer]
    queryset = Author.objects.all()

    def get_queryset(self):
        return self.queryset.order_by('-id')
