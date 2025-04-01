from rest_framework.viewsets import ModelViewSet
from rest_framework.renderers import JSONRenderer

from .models import FAQ
from .serializers import FAQSerializer


class FAQViewSet(ModelViewSet):
    renderer_classes = [JSONRenderer]
    serializer_class = FAQSerializer
    queryset = FAQ.objects.all()

    def get_queryset(self):
        return self.queryset
